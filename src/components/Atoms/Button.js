

const Button = ({text, width="full", margin='24px'}) => {
  return (
    <button className={`bg-[#5C44F2] font-semibold text-[14px] text-white px-[24px] py-[12px] rounded-[8px] border border-1 border-transparent mt-${margin} w-${width} focus:ring-[#5C44F2] hover:bg-white hover:text-[#5C44F2] hover:border-1 hover:border-[#5C44F2] focus:outline-none focus:text-[#5C44F2] focus:ring-1 focus:bg-purple-100`}>
        {text}
    </button>
  )
}

export default Button