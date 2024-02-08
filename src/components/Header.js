import Button from "./Atoms/Button"

const Header = () => {
  return (
    <header className="w-full md:px-[72px] py-[48px] lg:max-w-[1280px] bg-white px-[24px]">
        <div className="bg-black rounded-[16px] lg:px-[76px] py-[62px] relative px-[48px] h-[220px] lg:h-[300px] xl:h-[425px] flex items-center overflow-hidden">
            <img src="/products/background.png" alt="background" className="absolute z-1 right-0 bottom-0 rounded-[16px]"/>
            <img src="/products/iphone-bg.png" alt="iphone-bg" className="absolute z-2 right-0 h-auto w-[300px] lg:w-[380px]" />
            <div className="flex flex-col z-2 relative justify-center"> 
                <h3 className="font-semibold text-[24px] text-white">
                    Iphone 15 Pro
                </h3>
                <h1 className="xl:text-[64px] lg:text-[48px] font-bold text-white text-[32px]">
                    Battery Life <br /> Up To 29 Hours
                </h1>
            </div>
        </div>
    </header>
  )
}

export default Header