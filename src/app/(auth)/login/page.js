import LoginForm from "@/components/LoginForm"

const Login = () => {
  return (
    <div className='w-full h-full items-center flex justify-center my-10'>
      <div className='flex flex-col p-6 gap-6 w-[412px] shadow rounded-[16px]'>
          <h2 className="text-[24px] font-bold">Sign In</h2>
          <LoginForm />
      </div>
    </div>
  )
}

export default Login