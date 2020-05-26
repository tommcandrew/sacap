import React from "react"
import Header from "./header.js"
import Cart from "./cart"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../styles/theme"
import "../styles/layout.scss"
import Footer from "../components/footer"

const Layout = ({ children, hideQuoteButton, page }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="layout__wrapper">
        <Header />
        <div className="layout__content">
          <div className="layout__left">
            <Cart hideQuoteButton={hideQuoteButton} page={page} />
          </div>
          <div className="layout__right">{children}</div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
