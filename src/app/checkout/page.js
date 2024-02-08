'use client'

import Button from '@/components/Atoms/Button'
import Back from '@/components/Back'
import Layout from '@/components/Layout'
import { ProductContext } from '@/components/ProductContext'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const checkout = () => {

  const {selectedProducts, setSelectedProducts} = useContext(ProductContext)
  const [productsInfos, setProductsInfos] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')

  useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)]
    fetch('/api/products?ids='+uniqueIds.join(','))
      .then(response => response.json())
      .then(json => setProductsInfos(json))
  }, [selectedProducts])

  const addProduct = (id) => {
    setSelectedProducts(prev => [...prev, id])
  }

  const substractProduct = (id) => {
    const qty = selectedProducts.indexOf(id)
    if (qty !== -1) {
      setSelectedProducts(prev => {
        return prev.filter((value, index) => index !== qty)
      })
    }
  }

  const deleteProduct = (id) => {
    setSelectedProducts(prev => prev.filter(productId => productId !== id))
  }

  const deliveryPrice = 5
  let subtotal = 0
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find(p => p._id === id)?.price || 0
      subtotal += price
    }
  }
  const total = subtotal + deliveryPrice

  return (
    <div className='w-full lg:max-w-[1280px] h-full min-h-[500px] flex flex-col items-center pb-[36px] bg-white'>
      <Link href={'/'} className='self-start'>
        <Back />
      </Link>

      {!selectedProducts.length && (
        <div>no products in your shopping cart</div>
      )}

      {productsInfos.length && productsInfos.map(productInfo => {
        const amount = selectedProducts.filter(id => id === productInfo._id).length
        if (amount === 0) return
        return (
          <div className='flex flex-col self-start space-y-6 px-[24px] md:px-[72px] xl:w-fit w-full'>
            <div key={productInfo._id} className='flex flex-col sm:flex-row p-4 rounded-[16px] shadow xl:w-fit w-full justify-between'>
              <div className='flex gap-4'>
                <div className="p-[10px] bg-[#F6F6F6] rounded-[8px] w-[180px] h-fit">
                  <img src={productInfo.image} className="w-[150px]"/>
                </div>
                <div className="flex flex-col justify-between w-fit">
                  <div className='flex flex-col gap-[4px] w-fit'>
                    <h3 className="font-semibold text-[16px]">{productInfo.name}</h3>
                    <p className="text-[12px] max-w-[450px] text-[#828282]">{productInfo.description}</p>
                  </div>
                  <div className="flex w-[92px] items-center justify-between">
                      <div onClick={() => substractProduct(productInfo._id)} className="cursor-pointer justify-center items-center rounded-lg border p-1">
                          <i className="ri-subtract-fill"></i>
                      </div>
                      <div className="w-[24px] flex justify-center">
                          <p className="text-[14px]">
                            {selectedProducts.filter(id => id == productInfo._id).length}
                          </p>
                      </div>
                      <div onClick={() => addProduct(productInfo._id)} className="cursor-pointer justify-center items-center rounded-lg border p-1">
                          <i className="ri-add-line"></i>
                      </div>
                  </div>
                </div>
              </div>
              <div className='flex sm:flex-col items-end justify-between'>
                <div onClick={() => deleteProduct(productInfo._id)}>
                  <i className="ri-delete-bin-line text-[16px] cursor-pointer p-2 rounded-full hover:text-red-500 bg-white hover:bg-red-50 transition delay-100 hover:delay-100"></i>
                </div>
                <p className='font-semibold text-[20px]'>${productInfo.price}</p>
              </div>
            </div>
          </div>
        )
      })}

      {selectedProducts.length && (
        <div className='flex flex-col bg-white bottom-6 right-6 xl:fixed z-1 p-6 mt-6 xl:mt-0 w-full xl:w-fit md:px-[72px] px-[24px] xl:px-0'>
          <form action='/api/checkout' method='POST' className='flex flex-col xl:w-[364px] gap-2 w-full'>
            <input value={name} onChange={e => setName(e.target.value)} type='text' required placeholder='Full name' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
            <input value={address} onChange={e => setAddress(e.target.value)} type='text' required placeholder='Street address' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
            <div className='flex gap-2'>
              <input value={city} onChange={e => setCity(e.target.value)} type='text' required placeholder='City' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
              <input value={zipCode} onChange={e => setZipCode(e.target.value)} type='text' required placeholder='Postal code' className='text-[14px] font-medium outline-none p-[12px] w-full border rounded-[8px] focus:ring focus:ring-purple-200 focus:border-purple-500'/>
            </div>
            <div className="w-full h-[1px] bg-[#D9D9D9] my-4"/>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <p className='text-[14px]'>Subtotal</p>
                <p className='text-[14px]'>${subtotal}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-[14px]'>Delivery fee</p>
                <p className='text-[14px]'>${deliveryPrice}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-[14px] font-semibold'>Total</p>
                <p className='text-[14px] font-semibold'>${total}</p>
              </div>
            </div>
            <Button text={`Pay $${total}`}/>
          </form>
        </div>
      )}
    </div>
  )
}

export default checkout