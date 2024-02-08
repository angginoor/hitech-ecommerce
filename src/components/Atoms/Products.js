import { useState, useEffect, useContext } from "react"
import Button from "./Button";
import { ProductContext } from "../ProductContext";

const Products = ({name, price, description, image, _id}) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isShown, setIsShown] = useState(false)
  const {setSelectedProducts} = useContext(ProductContext)

  const changeBackground = () => {
    setIsHovered(true);
    setIsShown(true)
  };

  const resetBackground = () => {
    setIsHovered(false);
    setIsShown(false)
  };

  const addProducts = () => {
    setSelectedProducts(prev => [...prev, _id])
  }

  return (
    <>
      <div 
        onMouseEnter={changeBackground}
        onMouseLeave={resetBackground} 
        className={`flex flex-col gap-[16px] relative cursor-pointer w-fit z-0`} key={_id}>
        <div className={`p-[24px] ${isHovered ? 'bg-[#EAEAEA]' : 'bg-[#F6F6F6]'} rounded-[8px] w-fit`} id="product-container">
            <img src={image} alt="product" className="w-[200px] h-[200px]"/>
        </div>
        {isShown && (
          <div className="absolute right-[25px] bottom-[120px]" onClick={addProducts}>
            <Button text="Add to cart" width="[200px]"/>
          </div>
        )}
        <div className="flex flex-col gap-[16px] max-w-[248px]">
            <div className="w-full">
                <h4 className="font-semibold text-[14px]">{name}</h4>
                <p className="text-[12px] text-[#828282] w-full truncate">{description}</p>
            </div>
            <h3 className="font-medium text-[20px]">${price}</h3>
        </div>
      </div>
    </>
  )
}

export default Products