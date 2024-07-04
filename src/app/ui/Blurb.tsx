"use client";

import { useState } from "react";

export default function Blurb() {
  const [showBlurb, setShowBlurb] = useState(false);
  return (
    <div className="flex flex-col h-[175px]">
      <button
        onClick={() => {
          setShowBlurb(!showBlurb);
        }}
        className="mx-auto mb-5 h-[40px] w-40 shadow-lg bg-violet-500 text-gray-100 hover:bg-violet-400 active:bg-violet-600 relative"
      >
        <div className="relative mx-auto">About</div>
        <div className="absolute top-1 right-1">
          {showBlurb ? (
            <svg
              className="absolute right-1 w-[30px]"
              viewBox="0 0 30 30"
              height="25px"
              width="25px"
            >
              <path
                fill="white"
                d="M 5,5
								L 15,25
								L 25,5
							"
              />
            </svg>
          ) : (
            <svg
              className="w-[30px]"
              viewBox="0 0 30 30"
              height="25px"
              width="25px"
            >
              <path
                fill="white"
                d="M 5,25
								L 15,5
								L 25,25
							"
              />
            </svg>
          )}
        </div>
      </button>

      <div className="h-[120px] flex justify-center">
        {showBlurb ? (
          <p className="w-1/2 border-slate-300 border-4 p-4">
            {
              "Jot is a minimalist note-taking app focused on enabling the user to focus on the content that they're learning instead of on the software they're using."
            }
          </p>
        ) : null}
      </div>
    </div>
  );
}
