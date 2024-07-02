'use server';
import { Note } from "@/defs/note";
import { sql } from "@vercel/postgres";

export async function getNotes(userID: string) {
	const notes = await sql`
		FROM notes
		SELECT *
		WHERERE id=${userID}
	`;
	return notes;
}

export async function getNote(noteID: string) {
	try {
		const response = await sql`
			FROM notes
			SELECT *
			WHERE note_id=${noteID}
		`
		return {...response.rows[0]} as Note;
	}
	catch (error) {
		console.error("Couldn't retrieve note");
		throw Error("Failed to fetch note");
	}
}