import React, { useContext, useState } from "react"
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
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"

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
  const { cartItems, handleRemoveFromCart, infoMessages } = useContext(
    CartContext
  )
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const { language, changeLanguage } = useContext(LanguageContext)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <Paper className={`cart__wrapper cart__wrapper--normal`}>
        <List>
          {page === "orderform" && (
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {multiLingualText.your_order[language]}
            </Typography>
          )}
          {cartItems.map((item, index) => (
            <ListItem className={classes.item} key={index}>
              <ListItemText
                primary={item.name}
                secondary={`${item.quantity} ${multiLingualText.pieces[language]}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveFromCart(item.id)}
                  title={multiLingualText.remove_item[language]}
                >
                  <ClearIcon className="cart__bin" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {cartItems.length === 0 && (
            <Typography>
              {multiLingualText.your_cart_is_empty[language]}
            </Typography>
          )}
        </List>
        {!hideQuoteButton && (
          <Button
            variant="contained"
            color="primary"
            href="/orderform"
            fullWidth
          >
            {multiLingualText.get_quote[language]}
          </Button>
        )}
      </Paper>

      <div className={`cart__wrapper cart__wrapper--mobile`}>
        <Button
          onClick={() => changeLanguage(language === "en" ? "es" : "en")}
          className="header__lang"
        >
          {language === "en" ? "ES" : "EN"}
        </Button>
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
            <List>
              {cartItems.map((item, index) => (
                <ListItem className={classes.item} key={index}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.quantity} ${multiLingualText.pieces[language]}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveFromCart(item.id)}
                      title={multiLingualText.remove_item[language]}
                    >
                      <ClearIcon className="cart__bin" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <Container>
                {cartItems.length === 0 && (
                  <Typography align="center">
                    {multiLingualText.your_cart_is_empty[language]}
                  </Typography>
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
                {multiLingualText.get_quote[language]}
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
