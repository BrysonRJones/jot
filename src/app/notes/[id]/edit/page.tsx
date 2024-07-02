'use client'

import { getNote } from "@/app/lib/data";

export default function EditNote(params: {id: string}) {
	const id = params.id;
	const noteData = getNote(id);
	return (
		<form >
			<label>Title</label>
			<input type="text" name="title"/>
			<input type="text" name="content"/>
		</form>
	)
}