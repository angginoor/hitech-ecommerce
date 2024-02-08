'use client'

import { useContext, useEffect, useState } from "react"
import Products from "./Atoms/Products"
import { ProductContext } from "./ProductContext"
import Link from "next/link"

const Shop = () => {
  const [productsInfo, setProductsInfo] = useState([])
  const [userInput, setUserInput] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const {selectedProducts} = useContext(ProductContext)

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(json => setProductsInfo(json))
  }, [])

  const categoriesName = [...new Set(productsInfo.map(p => p.category))]

  let filteredProducts = productsInfo
  if (userInput) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(userInput))
  }

  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(({ category }) => category === selectedCategory);
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <main className="w-full md:px-[72px] py-[48px] lg:max-w-[1280px] bg-white px-[24px]">
        <div className="flex w-full justify-between items-center sticky bg-white top-0 mb-[42px] py-[8px] z-10">
            <h1 className="font-semibold text-[24px] ">Shop</h1>
            <div className="flex gap-[8px] sm:gap-[16px]">
                <div className="flex gap-[4px] border border-[#D9D9D9] rounded-[8px]">
                  <i className="ri-search-line text-[20px] text-[#828282] px-[12px] py-[8px]"></i>
                  <input value={userInput} onChange={e => setUserInput(e.target.value)} type="text" placeholder="Search" className="outline-none border-none text-[14px]"/>
                </div>
                <div className="hidden md:block px-[12px] py-[11px] border border-[#D9D9D9] rounded-[8px] self-center justify-center">
                  <select onChange={handleCategoryChange} value={selectedCategory} className="w-full outline-none border-none self-center">
                    <option>All</option>
                    {categoriesName.map((categoryName, index) => (
                      <option key={index} value={categoryName} className="text-[14px] gap-[8px] px-[12px] py-[4px]">{categoryName}</option>
                    ))}
                  </select>
                </div>
                <Link href={'/checkout'} className="flex items-center cursor-pointer border border-[#D9D9D9] relative rounded-[8px]">
                  <i class="ri-shopping-bag-2-line text-[20px] px-[12px] py-[4px]"></i>
                  {selectedProducts && selectedProducts.length >= 0 && (
                    <div className="flex justify-center items-center w-4 h-4 rounded-full bg-purple-300 absolute top-[1px] right-1">
                      <p className="text-[10px]">{selectedProducts.length}</p>
                    </div>
                  )}
                </Link>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center place-items-center justify-center gap-[32px]">
          {filteredProducts.map(productInfo =>(
            <Products {...productInfo} />
          ))}
        </div>
    </main>
  )
}

export default Shop