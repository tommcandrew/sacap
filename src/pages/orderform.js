import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import CartContext from "../context/CartContext"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"
import Head from "../components/head.js"

const useStyles = makeStyles(theme => ({
  form: {
    width: "80%",
    margin: "2rem auto 0 auto",
  },
  title: {
    marginTop: "2rem",
  },
  submit: {
    marginTop: "2rem",
    fontSize: "1rem",
  },
  buttonWrapper: {
    textAlign: "center",
  },
  field: {
    margin: "0.7rem 0",
  },
}))

const OrderForm = props => {
  const { cartItems, clearCart } = useContext(CartContext)
  const [cartItemsString, setCartItemsString] = useState("")
  const { language } = useContext(LanguageContext)

  const classes = useStyles()

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
      <Head title="Order Form" />

      <Container>
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          className={classes.title}
          align="center"
        >
          {multiLingualText.your_details[language]}
        </Typography>

        <form
          action="/success"
          data-netlify="true"
          name="order-form"
          className={classes.form}
        >
          <input type="hidden" name="form-name" value="order-form" />

          <div className={classes.field}>
            <TextField
              label={multiLingualText.name[language]}
              id="name"
              name="name"
              required
              fullWidth
            />
          </div>
          <div className={classes.field}>
            <TextField
              label={multiLingualText.company[language]}
              id="company"
              name="company"
              required
              fullWidth
            />
          </div>

          <div className={classes.field}>
            <TextField
              label={multiLingualText.email[language]}
              id="email"
              name="email"
              required
              fullWidth
              type="email"
            />
          </div>

          <div className={classes.field}>
            <TextField
              label={multiLingualText.phone[language]}
              id="phone"
              name="phone"
              required
              fullWidth
            />
          </div>

          <div className={classes.field}>
            <TextField
              label={multiLingualText.note[language]}
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
          ></textarea>

          <div className={classes.buttonWrapper}>
            <Button
              className={classes.submit}
              type="submit"
              variant="contained"
              color="secondary"
            >
              {multiLingualText.send[language]}
            </Button>
          </div>
        </form>
      </Container>
    </Layout>
  )
}

export default OrderForm
