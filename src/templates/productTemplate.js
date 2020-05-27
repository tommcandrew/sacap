import React, { useContext } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CartContext from "../context/CartContext"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import capitaliseFirst from "../utils/capitaliseFirst"
import "../styles/product.scss"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"

export const query = graphql`
  query($id: String!) {
    contentfulProduct(contentful_id: { eq: $id }) {
      name
      contentful_id
      mainCategory
      subCategory
      description {
        json
      }
      image {
        title
        fluid {
          src
        }
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  left: {
    flexBasis: "45%",
  },

  image: {
    width: "100%",
  },

  input: {
    width: "50%",
  },
}))

const ProductTemplate = props => {
  const { handleAddToCart } = useContext(CartContext)
  const classes = useStyles()
  const { language } = useContext(LanguageContext)

  const handleAddRequest = e => {
    e.preventDefault()
    const name = props.data.contentfulProduct.name
    const id = props.data.contentfulProduct.contentful_id
    const quantity = e.target.quantity.value
    handleAddToCart(name, id, quantity)
    e.target.reset()
  }
  return (
    <Layout>
      <Container className="product__wrapper">
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" href="/">
            {multiLingualText.products[language]}
          </Link>
          <Link
            color="inherit"
            href={`/products/${props.data.contentfulProduct.mainCategory}`}
          >
            {capitaliseFirst(props.data.contentfulProduct.mainCategory)}
          </Link>
          <Link
            color="inherit"
            href={`/products/${props.data.contentfulProduct.mainCategory}/${props.data.contentfulProduct.subCategory}`}
          >
            {capitaliseFirst(props.data.contentfulProduct.subCategory)}
          </Link>
          <Typography color="textPrimary">
            {capitaliseFirst(props.data.contentfulProduct.name)}
          </Typography>
        </Breadcrumbs>
        <div className="product__content">
          <div className={classes.left}>
            <img
              src={props.data.contentfulProduct.image.fluid.src}
              alt={props.data.contentfulProduct.image.title}
              className={classes.image}
            />
          </div>
          <div className="product__right">
            <Typography
              gutterBottom
              variant="h4"
              component="h4"
              className="product__name"
            >
              {capitaliseFirst(props.data.contentfulProduct.name)}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="p"
              className="product__id"
            >
              ID: {capitaliseFirst(props.data.contentfulProduct.contentful_id)}
            </Typography>
            {documentToReactComponents(
              props.data.contentfulProduct.description.json
            )}
            <form className="product__form" onSubmit={e => handleAddRequest(e)}>
              <TextField
                label={multiLingualText.qty[language]}
                name="quantity"
                className={classes.input}
              />
              <Button variant="contained" color="secondary" type="submit">
                {multiLingualText.add[language]}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default ProductTemplate
