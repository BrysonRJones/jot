"use client";

import { useId } from "react";

export default function LoginForm() {
	const emailID = useId();
	const passwordID = useId();
	return (
		<form className="flex flex-col gap-3">
			<div className="flex flex-col">
			<label htmlFor={emailID}>Email</label>
			<input className="border-solid border-2 border-indigo-600" id={emailID} type="email"/>
			<label htmlFor={passwordID}>Password</label>
			<input className="border-solid border-2 border-indigo-600" id={passwordID} />
			</div>
			<button className="bg-indigo-700 flex-none h-12 text-white" type="submit">Submit</button>
		</form>
	)
}