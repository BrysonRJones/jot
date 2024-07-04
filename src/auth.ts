import { sql } from "@vercel/postgres";
import NextAuth, { AuthError } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config";
import { z } from "zod";

type User = {
	email: string;
	password: string;
}

async function getUser(email: string): Promise<User | undefined> {
	try {
	  const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
	  return user.rows[0];
	} catch (error) {
	  return undefined;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			async authorize (credentials) {

					const parsedCredentials = z
					.object({email: z.string().email(), password: z.string().min(8)})
					.safeParse(credentials);

					if (parsedCredentials.success) {
						const { email, password } = parsedCredentials.data;
						const user = await getUser(email);
						if (!user) { return null; }
						const match = password === user.password;
						if (match) { return user; }
					}
					return null;
				}
		})
		, github, google
	]
})