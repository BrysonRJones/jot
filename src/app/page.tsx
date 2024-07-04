import Link from "next/link";
import Blurb from "./ui/Blurb";
import AccountLogo from "./ui/logo/AccountLogo";

export default function Home() {
  const linkClass =
    "h-[40px] w-40 shadow-lg bg-violet-500 text-gray-100 hover:bg-violet-400 active:bg-violet-600 flex justify-center items-center";
  return (
    <main className="flex items-center justify-center md:h-screen flex-col gap-8 items-around">
      <div className="flex shrink-0 flex-1 justify-center items-center">
        <AccountLogo />
      </div>
      <div className="flex shrink-0 flex-col flex-1 gap-2 items-center">
        <h2>Quick notes and thoughts</h2>
        <Link href="/login" className={linkClass}>
          Log in
        </Link>
        <Link href="/create-account" className={linkClass}>
          Create account
        </Link>
        <Blurb />
      </div>
    </main>
  );
}
