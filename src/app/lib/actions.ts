'use server';
import { sql } from "@vercel/postgres";
import {signIn} from "@/auth";
import { AuthError} from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try{
		await signIn('credentials', formData);
	}
	catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return 'Invalid credentials';
				default:
					return 'Something went wrong';
			}
		}
		throw error;
	}
}

const CreateAccountSchema = z.object({
	userID: z.string({invalid_type_error: "Please use a valid email"}).email(),
	password: z.string({invalid_type_error: "Please provide a password"}),
	confirmPassword: z.string({invalid_type_error: "Please confirm the chosen password"}),
});

export type CreateAccountState = {
	errors?: {
		userID?: string[];
		password?: string[];
		confirmPasword?: string[];
	};
	message?: string | null;
}

async function verifyUnique(userID: string) {
	const users = await sql`
		FROM users
		SELECT user_id
		WHERE user_id=${userID}
	`
	if (!(users?.rowCount ?? 0 > 0)) {
		return {
			errors: {userID: ["This email is currently in use."]},
			message: "Failed to create account"
		}
	}
}



export async function createAccount(
	prevState: CreateAccountState,
	formData: FormData
) {
	try {
		const validatedData = CreateAccountSchema.safeParse({
			userID: formData.get('userID'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword')
		});
		const dateCreated = Date.now();

		if (!validatedData.success) {
			return {
				errors: validatedData.error.flatten().fieldErrors,
				message: "Missing fields. Failed to create account"
			}
		}

		const state: CreateAccountState | undefined | null = await verifyUnique(validatedData.data.userID)
		if (state?.errors) {
			return state;
		}
		if (validatedData.data.password !== validatedData.data.confirmPassword) {
			return {
				errors: {confirmPassword: [`Provided passwords differ`]},
				message: "Account not created: passwords don't match"
			}
		}
		const hashPass = await bcrypt.hash(validatedData.data.password, 10);

		await sql`
			INSERT INTO users (user_id, password, date_created)
			VALUES(${validatedData.data.userID}, ${hashPass}, ${dateCreated})
		`

		redirect("/home");
	}
	catch (error) {
		console.log(error);
		throw Error("Account couldn't be created at this time")
	}
}

export async function createNote(userID: string) {
	const noteID = randomUUID();
	try {
		await sql`
			INSERT into notes
				(user_id, note_id, date, title, content)
			VALUES(${userID}, ${noteID}, ${Date.now()}, "Untitled", "")
		`
	}
	catch (error) {
		return "A note could not be created at this time";
	}
	
	revalidatePath('/home');
	redirect(`@/app/notes/${noteID}/edit`)
}