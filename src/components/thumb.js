import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
    backgroundSize: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
}))

const Thumb = ({ title, link, image, imageTitle }) => {
  const classes = useStyles()

  return (
    <Grid item key={title} xs={12} sm={6} lg={4}>
      <Link to={link}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            title={imageTitle}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}

export default Thumb
