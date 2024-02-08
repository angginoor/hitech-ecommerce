import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const Register = () => {
  return (
    <div className='w-full h-screen flex justify-center my-6'>
      <div className='flex flex-col p-6 gap-6 w-[412px] shadow rounded-[16px] h-fit'>
          <h2 className="text-[24px] font-bold">Register</h2>
          <RegisterForm />
      </div>
    </div>
  )
}

export default Register