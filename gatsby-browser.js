import React from "react"

import { CartProvider } from "./src/context/CartContext"
import { LanguageProvider } from "./src/context/LanguageContext"

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>
    <CartProvider>{element}</CartProvider>
  </LanguageProvider>
)
