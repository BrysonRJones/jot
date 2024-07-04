"use client";

import { useId } from "react";
import { useActionState } from "react";
import { useFormState } from "react-dom";
import { authenticate } from "../lib/actions";

export default function LoginForm() {
  const emailID = useId();
  const passwordID = useId();
  const initialState: string = "";
  const [state, dispatch] = useFormState(authenticate, initialState);

  return (
    <form action={dispatch} className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor={emailID}>Email</label>
        <input
          className="border-solid border-2 border-violet-600"
          id={emailID}
          type="email"
          name="email"
        />
        <label htmlFor={passwordID}>Password</label>
        <input
          className="border-solid border-2 border-violet-600"
          id={passwordID}
          type="password"
          name="password"
        />
      </div>
      <button className="bg-violet-700 flex-none h-12 text-white" type="submit">
        Submit
      </button>
      {state ? <p className="text-red-500">{state}</p> : null}
    </form>
  );
}
