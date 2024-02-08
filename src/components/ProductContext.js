"use client"

import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductContext = createContext({selectedProducts: []})

export function ProductContextProvider({children}) {
    const [selectedProducts, setSelectedProducts] = useLocalStorageState('checkout', {defaultValue:[]})

    return (
        <ProductContext.Provider value={{selectedProducts, setSelectedProducts}}>{children}</ProductContext.Provider>
    )
}
