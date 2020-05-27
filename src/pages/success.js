import React, { useEffect, useContext } from "react"
import Layout from "../components/layout"
import Container from "@material-ui/core/Container"
import CartContext from "../context/CartContext"
import Typography from "@material-ui/core/Typography"
import "../styles/success.scss"
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"

const Success = props => {
  const { clearCart } = useContext(CartContext)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <Layout>
      <Container className="success__wrapper">
        <Typography align="center" variant="h5">
          {multiLingualText.success_message[language]}
        </Typography>
      </Container>
    </Layout>
  )
}

export default Success
