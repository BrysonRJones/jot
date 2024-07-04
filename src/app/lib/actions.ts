"use server";
import { sql } from "@vercel/postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    } else {
      return undefined;
    }
  }
  redirect("/home");
}

const CreateAccountSchema = z.object({
  email: z.string({ invalid_type_error: "Please use a valid email" }).email(),
  password: z.string({ invalid_type_error: "Please provide a password" }),
  confirmPassword: z.string({
    invalid_type_error: "Please confirm the chosen password",
  }),
});

export type CreateAccountState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

async function verifyUnique(email: string) {
  const users = await sql`
		SELECT email
		FROM users
		WHERE email=${email}
	`;
  if (users?.rowCount ?? 0 > 0) {
    return {
      errors: { email: ["This email is currently in use."] },
      message: "Failed to create account",
    };
  } else {
    return { errors: undefined, message: null };
  }
}

export async function createAccount(
  prevState: CreateAccountState,
  formData: FormData
) {
  try {
    const validatedData = CreateAccountSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    const dateCreated = Date.now();

    if (!validatedData.success) {
      return {
        errors: validatedData.error.flatten().fieldErrors,
        message: "Missing fields. Failed to create account",
      };
    }

    const state: CreateAccountState | undefined | null = await verifyUnique(
      validatedData.data.email
    );
    if (state?.errors) {
      return state;
    }
    if (validatedData.data.password !== validatedData.data.confirmPassword) {
      return {
        errors: { confirmPassword: [`Provided passwords differ`] },
        message: "Account not created: passwords don't match",
      };
    }
    const hashPass = await bcrypt.hash(validatedData.data.password, 10);
    const add = await sql`
			INSERT INTO users (email, name, password, date_created)
			VALUES(${validatedData.data.email}, ${""}, ${hashPass}, ${dateCreated})
		`;
  } catch (error) {
    throw Error("Account couldn't be created at this time");
  }
  redirect("/login");
}

export async function createNote(userID: string) {
  const noteID = randomUUID();
  try {
    await sql`
			INSERT into notes
				(user_id, note_id, date, title, content)
			VALUES(${userID}, ${noteID}, ${Date.now()}, "Untitled", "")
		`;
  } catch (error) {
    return "A note could not be created at this time";
  }

  revalidatePath("/home");
  redirect(`@/app/notes/${noteID}/edit`);
}
