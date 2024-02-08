import Link from "next/link"
import Button from "./Atoms/Button"
import { auth } from "@/lib/auth"
import { handleLogout } from "@/lib/action"


const Navbar = async () => {

  const session = await auth()

  return (
    <nav className="w-full md:px-[72px] lg:py-[48px] lg:max-w-[1280px] bg-white px-[24px] py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-[24px] font-bold">
            hiTech
          </Link>
          <div className="flex justify-center gap-[16px] items-center">
            {session?.user ? (
              <>
                <form action={handleLogout}>
                  <Button text={"LogOut"} />
                </form>
              </>
            ) : (
              <>
                <Link href='/login' className="text-[14px] font-bold w-full">Sign In</Link>
                <div className="w-[1px] h-[12px] bg-black"/>
                <Link href='/register'>
                  <Button text={'Register'} margin="0"/>
                </Link>
                
              </>
            )}
          </div>
        </div>
    </nav>
  )
}

export default Navbar