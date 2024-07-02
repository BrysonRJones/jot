'use client'

import { getNote } from "@/app/lib/data";
import { Note } from "@/defs/note";
import { useLayoutEffect, useState } from "react";

interface EditNoteArgs {
	id: string
}

export default async function EditNote(params: EditNoteArgs) {
	const id = params.id;
	const [noteData, setNoteData] = useState<Note | undefined>(undefined);
	useLayoutEffect(()=> {
		const asyncPortion = async () =>  {
			const note = await getNote(id);
			setNoteData(note);
		}
		asyncPortion();
	}) 
	return (
		<form >
			<label>Title</label>
			<input type="text" name="title" value={noteData?.title ?? ""}/>
			<input type="text" name="content" value={noteData?.content ?? ""}/>
		</form>
	)
}