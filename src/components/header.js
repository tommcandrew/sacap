import Link from "@material-ui/core/Link"
import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import capitaliseFirst from "../utils/capitaliseFirst"
import "../styles/header.scss"

const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  item: {
    textAlign: "center",
  },
  itemText: {
    borderBottom: "0.5px solid rgba(0,0,0,0.5)",
  },
  menuLink: {
    color: "black",
  },
  menuItem: {
    borderBottom: "0.5px solid rgba(0,0,0,0.5)",
    paddingBottom: "0.5rem",
  },
  title: {
    color: "white",
    fontSize: "2rem",
  },
}))

const Header = () => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <div>
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Link
            href="/"
            className={classes.title}
            style={{ textDecoration: "none" }}
          >
            SACAP
          </Link>

          <div className="header__nav--normal">
            <List component="nav" className={classes.list}>
              <ListItem component="div">
                <ListItemText inset>
                  <Link
                    href="/"
                    className={classes.link}
                    style={{ textDecoration: "none" }}
                  >
                    Products
                  </Link>
                </ListItemText>

                <ListItemText inset>
                  <Link
                    href="/services"
                    className={classes.link}
                    style={{ textDecoration: "none" }}
                  >
                    Services
                  </Link>
                </ListItemText>

                <ListItemText inset>
                  <Link
                    href="/contact"
                    className={classes.link}
                    style={{ textDecoration: "none" }}
                  >
                    Contact
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </div>

          <div className="header__nav--mobile">
            <IconButton onClick={toggleDrawer}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer}>
              <div role="presentation" onClick={toggleDrawer}>
                <List>
                  {["products", "services", "contact"].map((page, index) => (
                    <ListItem button key={page} className={classes.item}>
                      <ListItemText className={classes.menuItem}>
                        <Link
                          href={`${page === "products" ? "/" : `/${page}`}`}
                          style={{ textDecoration: "none" }}
                          className={classes.menuLink}
                        >
                          {capitaliseFirst(page)}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
