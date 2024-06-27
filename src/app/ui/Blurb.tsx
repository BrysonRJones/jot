'use client'

import { useState } from "react"

export default function Blurb() {
	const [showBlurb, setShowBlurb] = useState(false);
	return (
		<div className="h-[150px] flex items-center flex-col gap-3">
			<button onClick={()=> { setShowBlurb(!showBlurb)}} className='flex-none h-[40px] w-40 shadow-lg bg-violet-500 text-gray-100 hover:bg-violet-400 active:bg-violet-600 flex items-center'>
				<div className="flex-auto">
				About
				</div>
				{showBlurb ? 
					<svg className='flex-none w-[30px]' viewBox='0 0 30 30' height='30px' width='30px'>
						<path
						fill="white"
							d="M 5,5
								L 15,25
								L 25,5
							"
						/>
					</svg> :
					<svg height='30px' width='30px'>
						<path
						fill="white"
							d="M 5,25
								L 15,5
								L 25,25
							"
						/>
					</svg>
				}
			</button>
			
			<div className='h-40 flex justify-center'>
				{showBlurb ? <p className='w-1/2 border-slate-300 border-4 p-4'>Jot is a minimalist note-taking app focused on enabling the user to focus on the content that they're learning instead of on the software they're using.</p> : null}
			</div>
		</div>
	)
}