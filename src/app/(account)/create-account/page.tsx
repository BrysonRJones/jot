'use server';
import CreateAccountForm from "../../ui/create-account/CreateAccountForm";


export default async function CreateAccount() {
	return (
		<main className="flex items-center justify-start flex-col justify-center">
			<h2>Create account</h2>
			<CreateAccountForm />
		</main>
	)
}