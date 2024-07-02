const { db } = require('@vercel/postgres');

async function seedUsers(client) {
	try {
		await client.sql`
			CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
		`;
		const createTable = await client.sql`
			CREATE TABLE IF NOT EXISTS 
			users (
				user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
				name VARCHAR(225) NOT NULL,
				email TEXT NOT NULL UNIQUE,
				password TEXT NOT NULL,
				
			)
		`
	}
	catch(error) {
		console.log("Could not generate users");
	}
}

async function seedNotes(client) {
	try {
		await client.sql`
			CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
		`;

		const createNotesTable = await client.sql`
			note_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			user_id TEXT NOT NULL,
			title TEXT NOT NULL,
			password TEXT NOT NULL,
			date_created TEXT NOT NULL,
			date_last_edited TEXT NOT NULL
		`
	}
	catch(error) {
		console.log("Could not seed notes");
	}
}

export async function  main() {
	const client = await db.connect();

	await seedUsers(client);
	await seedNotes(client);

	await client.end();
}

main().catch((err) => {
	console.error(
		"An error occurred while attempting to seed the database"
	)
})