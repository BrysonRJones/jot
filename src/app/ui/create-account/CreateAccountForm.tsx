'use client'
import { CreateAccountState, createAccount } from "@/app/lib/actions";
import { useActionState, useId } from "react"
import { useFormState } from "react-dom";

export default function CreateAccountForm() {
	const emailID = useId();
	const passwordID = useId();
	const confirmPasswordID = useId();
	const initialState: CreateAccountState = {
		message: null,
		errors: {}
	}
	const [state, dispatch] = useFormState(createAccount, initialState);

	return (
		<form action={dispatch} className="flex flex-col gap-3">
			<div className="flex flex-col">
				<label htmlFor={emailID}>Email</label>
				<input className="border-solid border-2 border-violet-600" id={emailID} type="email" name='email'/>
				<label htmlFor={passwordID}>Password</label>
				<input className="border-solid border-2 border-violet-600" id={passwordID} name='password'/>
				<label htmlFor={confirmPasswordID}>Confirm password</label>
				<input className="border-solid border-2 border-violet-600" id={confirmPasswordID} name='confirmPassword'/>
			</div>
			<button className="bg-violet-700 flex-none h-12 text-white" type="submit">Submit</button>
		</form>
	)
}