import React, { useState, useEffect, useContext } from "react"
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"

const CartContext = React.createContext()

const CartProvider = props => {
  const [cartItems, setCartItems] = useState([])
  const [infoMessages, setInfoMessages] = useState([])
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setInfoMessages([])
    }, 2500)
    return () => {
      clearTimeout(alertTimer)
    }
  }, [infoMessages])

  useEffect(() => {
    retrieveSavedItems()
  }, [])

  const retrieveSavedItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"))
    if (cartItems && cartItems.length > 0) {
      setCartItems(cartItems)
    }
  }

  const handleAddToCart = (name, id, quantity) => {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === id) {
        setInfoMessages([
          { type: "warning", text: multiLingualText.already_in_cart[language] },
        ])
        return
      }
    }
    const cartObj = { name, id, quantity }
    setCartItems([...cartItems, cartObj])
    saveToLocalStorage(cartObj)
    setInfoMessages([
      { type: "success", text: multiLingualText.added[language] },
    ])
  }

  const saveToLocalStorage = productObj => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify([...cartItems, productObj])
    )
  }

  const handleRemoveFromCart = id => {
    const updatedArray = cartItems.filter(item => item.id !== id)
    setCartItems([...updatedArray])
    localStorage.setItem("cartItems", JSON.stringify([...updatedArray]))
    setInfoMessages([
      { type: "success", text: multiLingualText.removed[language] },
    ])
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cartItems")
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        setCartItems,
        infoMessages,
        setInfoMessages,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContext

export { CartProvider }
