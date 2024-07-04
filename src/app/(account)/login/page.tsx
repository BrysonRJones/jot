import LoginForm from "@/app/ui/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center flex-col gap-8">
      <div className="flex flex-col justify-start items-center">
        <div>Log In</div>
        <LoginForm />
      </div>
    </main>
  );
}
