import React, { useEffect, useContext } from "react"
import Layout from "../components/layout"
import Container from "@material-ui/core/Container"
import CartContext from "../context/CartContext"
import Typography from "@material-ui/core/Typography"
import "../styles/success.scss"

const Success = props => {
  const { clearCart } = useContext(CartContext)

  useEffect(() => {
    clearCart()
  }, [])
  return (
    <Layout>
      <Container className="success__wrapper">
        {props.pageContext.locale === "es" ? (
          <Typography align="center" variant="h5">
            Gracias por su orden. nos pondremos en contacto en breve.
          </Typography>
        ) : (
          <Typography align="center" variant="h5">
            Thank you for your order. We will be in touch shortly.
          </Typography>
        )}
      </Container>
    </Layout>
  )
}

export default Success
