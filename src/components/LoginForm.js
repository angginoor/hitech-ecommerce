"use client"

import { login } from "@/lib/action";
import { useFormState } from "react-dom";
import Button from "./Atoms/Button";
import Link from "next/link";

const LoginForm = () => {
    const [state, formAction] = useFormState(login, undefined)

  return (
    <form action={formAction} className='space-y-4 flex flex-col justify-center items-center'>
        <input type='text' placeholder='username' name='username' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
        <input type='password' placeholder='password' name='password' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
        <Button text={'Sign In'} />
        <p>{state?.error}</p>
        <Link href="/register">
          {"Don't have an account?"} <b>Register</b>
        </Link>
    </form>
  )
}

export default LoginForm