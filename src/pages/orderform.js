import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import "../styles/orderForm.scss"
import CartContext from "../context/CartContext"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import "../styles/orderForm.scss"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

const handleItemsInputChange = e => {
  //I think this is an event handler is necessary as 'value' is set on the input element
}

//copy and pasted - I guess this is necessary for Netlify to receive the form data
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const useStyles = makeStyles(theme => ({
  form: {
    width: "80%",
    margin: "4rem auto 0 auto",
  },
  title: {
    marginTop: "2rem",
  },
}))

const OrderForm = props => {
  const { cartItems, clearCart } = useContext(CartContext)
  const [cartItemsString, setCartItemsString] = useState("")
  const classes = useStyles()

  const formLabels = {
    name: {
      es: "Nombre",
      en: "Name",
    },
    company: {
      es: "Empresa",
      en: "Company",
    },
    email: {
      es: "Email",
      en: "Email",
    },
    phone: {
      es: "Teléfono",
      en: "Phone",
    },
    note: {
      es: "Nota",
      en: "Note",
    },
  }

  //cartItems is an array of objects so I think I need to convert it to a string before sending
  useEffect(() => {
    let items = ""
    for (let i = 0; i < cartItems.length; i++) {
      items +=
        "Item: " +
        cartItems[i].name +
        ", " +
        "Item ID: " +
        cartItems[i].id +
        ", " +
        "Quantity: " +
        cartItems[i].quantity +
        "; "
    }
    setCartItemsString(items)
  }, [cartItems])

  return (
    <Layout hideQuoteButton={"hide"} page="orderform">
      <Container>
        {props.pageContext.locale === "es" ? (
          <Typography
            variant="h5"
            color="inherit"
            noWrap
            className={classes.title}
            align="center"
          >
            Sus Detalles
          </Typography>
        ) : (
          <Typography
            variant="h5"
            color="inherit"
            noWrap
            className={classes.title}
            align="center"
          >
            Your Details
          </Typography>
        )}
        <form
          className="orderForm__form"
          action="/success"
          data-netlify="true"
          name="order-form"
        >
          <input type="hidden" name="form-name" value="order-form" />

          <div className="orderForm__field">
            <TextField
              label={formLabels["name"][props.pageContext.locale]}
              id="name"
              name="name"
              required
              fullWidth
            />
          </div>
          <div className="orderForm__field">
            <TextField
              label={formLabels["company"][props.pageContext.locale]}
              id="company"
              name="company"
              required
              fullWidth
            />
          </div>

          <div className="orderForm__field">
            <TextField
              label={formLabels["email"][props.pageContext.locale]}
              id="email"
              name="email"
              required
              fullWidth
              type="email"
            />
          </div>

          <div className="orderForm__field">
            <TextField
              label={formLabels["phone"][props.pageContext.locale]}
              id="phone"
              name="phone"
              required
              fullWidth
            />
          </div>

          <div className="orderForm__field">
            <TextField
              label={formLabels["note"][props.pageContext.locale]}
              id="note"
              name="note"
              fullWidth
              multiline
              rows={3}
            />
          </div>

          <textarea
            id="items"
            name="items"
            style={{ display: "none" }}
            type="text"
            value={cartItemsString}
            onChange={handleItemsInputChange}
          ></textarea>

          <div className="orderForm__button-wrapper">
            <Button
              className="orderForm__submit"
              type="submit"
              variant="contained"
              color="secondary"
            >
              {props.pageContext.locale === "es" ? "Enviar" : "Send"}
            </Button>
          </div>
        </form>
      </Container>
    </Layout>
  )
}

export default OrderForm
