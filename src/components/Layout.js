import React, { useContext, useState } from 'react'
import { ProductContext } from './ProductContext'

const Layout = ({children}) => {
    const {setSelectedProducts} = useContext(ProductContext)
    const [success, setSuccess] = useState(false)

  return (
    <div className='w-full h-screen flex flex-col items-center bg-white'>
        <div>
            {success && (
                <div> Thank you for your order!</div>
            )}
            {children}
        </div>
    </div>
  )
}

export default Layout