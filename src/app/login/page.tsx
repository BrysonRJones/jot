import LoginForm from "../ui/LoginForm";

export default function LoginPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div>Log In</div>
			<h1 className="text-3xl bg-white rounded w-24 text-center text-slate-500">Jot</h1>
	  		<LoginForm />
		</main>
	)
}