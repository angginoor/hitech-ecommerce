import React from 'react'

const Newsletter = () => {
  return (
    <section className='w-full py-[24px] bg-black flex justify-center mb-6'>
        <div className='flex justify-between w-full lg:max-w-[1280px] items-center px-[72px] gap-[24px] md:flex-row flex-col'>
            <h3 className='md:text-[24px] text-white font-bold text-center md:text-start text-[20px]'>
                Subscribe to Our Newsletter
            </h3>
            <div className='flex'>
                <input type='email' name='email' placeholder='Enter your email' className='pl-[8px] outline-none border-none placeholder:text-[#D9D9D9] text-[14px] w-[250px] lg:w-[374px] rounded-l-[8px]'/>
                <button className='text-[14px] font-semibold px-[24px] py-[12px] bg-[#D9D9D9] rounded-r-[8px]'>Send</button>
            </div>
        </div>
    </section>
  )
}

export default Newsletter