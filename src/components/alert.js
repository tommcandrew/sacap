import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    fontSize: "1rem",
  },
}))

const Alert = ({ messages }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {messages.map((message, index) => (
        <Snackbar
          key={index}
          open={true}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            severity={message.type}
            elevation={6}
            variant="filled"
            className={classes.alert}
          >
            {message.text}
          </MuiAlert>
        </Snackbar>
      ))}
    </div>
  )
}

export default Alert
