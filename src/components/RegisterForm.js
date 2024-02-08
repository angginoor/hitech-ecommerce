"use client"

import { register } from "@/lib/action";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Button from "./Atoms/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [state, formAction] = useFormState(register, undefined)
    
    const router = useRouter()

    useEffect(() => {
      state?.success && router.push("/login");
    }, [state?.success, router]);

  return (
    <form action={formAction} className='space-y-4 flex flex-col justify-center items-center'>
        <input type='text' placeholder='username' name='username' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
        <input type='email' placeholder='email' name='email' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
        <input type='password' placeholder='password' name='password' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
        <input type='password' placeholder='password again' name='passwordRepeat' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
        <Button text={'Register'} />
        <p>{state?.error}</p>
        <Link href="/login">
          {"Already have an account?"} <b>Sign In</b>
        </Link>
    </form>
  )
}

export default RegisterForm