import Blurb from "./ui/Blurb";
import LoginForm from "./ui/LoginForm";

export default function Home() {
	
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-3">
		<div id='titleSection' className='items-center'>
			<h1 className="text-3xl text-center">Jot</h1>
			<h2 >Quick notes and thoughts</h2>
		</div>
		<div className='flex flex-col gap-2'>
			<button className='h-[40px] w-40 shadow-lg bg-violet-500 text-gray-100 hover:bg-violet-400 active:bg-violet-600'>Log in</button>
			<button className='h-[40px] w-40 shadow-lg bg-violet-500 text-gray-100 hover:bg-violet-400 active:bg-violet-600'>Create account</button>
		</div>
		<Blurb />
    </main>
  );
}
