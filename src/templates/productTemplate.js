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
      colour
      dosage
      material
      capacity
      # weight
      description {
        json
      }
      descriptionSpanish {
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
  specsTitle: {
    textAlign: "center",
  },
}))

const ProductTemplate = props => {
  const { handleAddToCart, setInfoMessages } = useContext(CartContext)
  const classes = useStyles()
  const { language } = useContext(LanguageContext)

  const handleAddRequest = e => {
    e.preventDefault()
    if (!e.target.quantity.value) {
      console.log("no quantity")
      setInfoMessages([
        { type: "warning", text: multiLingualText.enter_a_quantity[language] },
      ])
      return
    } else {
      const name = props.data.contentfulProduct.name
      const id = props.data.contentfulProduct.contentful_id
      const quantity = e.target.quantity.value
      handleAddToCart(name, id, quantity)
      e.target.reset()
    }
  }
  let mainCategory
  if (language === "en" || !props.data.contentfulProduct.mainCategorySpanish) {
    mainCategory = props.data.contentfulProduct.mainCategory
  } else {
    mainCategory = props.data.contentfulProduct.mainCategorySpanish
  }
  let subCategory
  if (language === "en" || !props.data.contentfulProduct.subCategorySpanish) {
    subCategory = props.data.contentfulProduct.subCategory
  } else {
    subCategory = props.data.contentfulProduct.subCategorySpanish
  }
  let description
  if (language === "en" || !props.data.contentfulProduct.descriptionSpanish) {
    description = props.data.contentfulProduct.description.json
  } else {
    description = props.data.contentfulProduct.descriptionSpanish.json
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
            {mainCategory}
          </Link>
          <Link
            color="inherit"
            href={`/products/${props.data.contentfulProduct.mainCategory}/${props.data.contentfulProduct.subCategory}`}
          >
            {subCategory}
          </Link>
          <Typography color="textPrimary">
            {capitaliseFirst(props.data.contentfulProduct.name)}
          </Typography>
        </Breadcrumbs>
        <div className="product__content">
          <div className="product__content--top">
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
                variant="h5"
                component="h5"
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
                ID:{" "}
                {capitaliseFirst(props.data.contentfulProduct.contentful_id)}
              </Typography>
              {documentToReactComponents(description)}
              <form
                className="product__form"
                onSubmit={e => handleAddRequest(e)}
              >
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

          <div className="product__content__bottom">
            <div className="product__specs">
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                className={classes.specsTitle}
              >
                {multiLingualText.specifications[language]}
              </Typography>
              {props.data.contentfulProduct.weight && (
                <div className="product__spec">
                  <div className="product__spec--label">
                    {multiLingualText.weight[language]}
                  </div>
                  <div className="product__spec--data">
                    {props.data.contentfulProduct.weight}
                  </div>
                </div>
              )}
              {props.data.contentfulProduct.colour && (
                <div className="product__spec">
                  <div className="product__spec--label">
                    {multiLingualText.colour[language]}
                  </div>
                  <div className="product__spec--data">
                    {props.data.contentfulProduct.colour}
                  </div>
                </div>
              )}
              {props.data.contentfulProduct.material && (
                <div className="product__spec">
                  <div className="product__spec--label">
                    {multiLingualText.material[language]}
                  </div>
                  <div className="product__spec--data">
                    {props.data.contentfulProduct.material}
                  </div>
                </div>
              )}
              {props.data.contentfulProduct.dosage && (
                <div className="product__spec">
                  <div className="product__spec--label">
                    {multiLingualText.dosage[language]}
                  </div>
                  <div className="product__spec--data">
                    {props.data.contentfulProduct.dosage}
                  </div>
                </div>
              )}
              {props.data.contentfulProduct.capacity && (
                <div className="product__spec">
                  <div className="product__spec--label">
                    {multiLingualText.capacity[language]}
                  </div>
                  <div className="product__spec--data">
                    {props.data.contentfulProduct.capacity}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default ProductTemplate
