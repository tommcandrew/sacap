import React, { useContext, useState, useEffect } from "react"
import CartContext from "../context/CartContext"
import Alert from "./alert.js"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import "../styles/cart.scss"
import Drawer from "@material-ui/core/Drawer"
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"
import ClearIcon from "@material-ui/icons/Clear"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles(theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    paddingBottom: "1rem",
  },
  item: {
    borderTop: "1px solid #ccc",
  },
  drawer: {
    marginTop: "2rem",
  },
  cartIcon: {
    padding: "0.5rem",
  },
}))

const Cart = ({ hideQuoteButton, page }) => {
  const {
    cartItems,
    handleRemoveFromCart,
    setInfoMessages,
    infoMessages,
  } = useContext(CartContext)
  const classes = useStyles()
  const [dense, setDense] = React.useState(false)
  const [secondary, setSecondary] = React.useState(false)
  const [open, setOpen] = useState(false)
  const [showNormalCart, setShowNormalCart] = useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <Paper className={`cart__wrapper cart__wrapper--normal`}>
        <List dense={dense}>
          {page === "orderform" && (
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Your Order
            </Typography>
          )}
          {cartItems.map((item, index) => (
            <ListItem className={classes.item} key={index}>
              <ListItemText
                primary={item.name}
                secondary={`${item.quantity} pieces`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveFromCart(item.id)}
                  title="Remove item"
                >
                  <ClearIcon className="cart__bin" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {cartItems.length === 0 && (
            <Typography>Your cart is empty.</Typography>
          )}
        </List>
        {!hideQuoteButton && (
          <Button
            variant="contained"
            color="primary"
            href="/orderform"
            fullWidth
          >
            Get Quote
          </Button>
        )}
      </Paper>

      <div className={`cart__wrapper cart__wrapper--mobile`}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartOutlinedIcon
            fontSize="large"
            color="secondary"
            onClick={toggleDrawer}
          />
        </Badge>

        <Drawer
          open={open}
          anchor="right"
          onClose={toggleDrawer}
          className={classes.drawer}
          PaperProps={{ style: { width: "80vw" } }}
        >
          <div className="cart__content--mobile">
            <List dense={dense}>
              {cartItems.map((item, index) => (
                <ListItem className={classes.item} key={index}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.quantity} pieces`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveFromCart(item.id)}
                      title="Remove item"
                    >
                      <ClearIcon className="cart__bin" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <Container>
                {cartItems.length === 0 && (
                  <Typography align="center">Your cart is empty.</Typography>
                )}
              </Container>
            </List>
            {!hideQuoteButton && (
              <Button
                variant="contained"
                color="primary"
                href="/orderform"
                fullWidth
                size="large"
              >
                Get Quote
              </Button>
            )}
          </div>
        </Drawer>
      </div>

      {infoMessages && infoMessages.length > 0 && (
        <Alert messages={infoMessages} />
      )}
    </>
  )
}

export default Cart
