import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import getCategoryImages from "../utils/getCategoryImages"
import removeDuplicates from "../utils/removeDuplicates"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Thumb from "../components/thumb"
import "../styles/products.scss"
import "../styles/global.scss"
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"
import Head from "../components/head.js"

const useStyles = makeStyles(theme => ({
  title: {
    paddingTop: theme.spacing(2),
    textAlign: "center",
  },
}))

const Products = props => {
  const classes = useStyles()
  const { language } = useContext(LanguageContext)

  const data = useStaticQuery(graphql`
    query {
      allContentfulProduct {
        edges {
          node {
            mainCategory
            mainCategorySpanish
            image {
              title
              fluid {
                src
              }
            }
          }
        }
      }
    }
  `)

  const mainCategoriesAllEnglish = data.allContentfulProduct.edges.map(
    edge => edge.node.mainCategory
  )
  //remove duplicates from list
  const mainCategoriesUniqueEnglish = removeDuplicates(mainCategoriesAllEnglish)
  //get image to represent each category
  const categoryImages = getCategoryImages(
    mainCategoriesUniqueEnglish,
    data.allContentfulProduct.edges
  )

  const mainCategoriesAllLocalised = data.allContentfulProduct.edges.map(
    edge => {
      if (language === "en" || !edge.node.mainCategorySpanish) {
        return edge.node.mainCategory
      } else {
        return edge.node.mainCategorySpanish
      }
    }
  )

  const mainCategoriesLocalisedUnique = removeDuplicates(
    mainCategoriesAllLocalised
  )

  return (
    <Layout>
      <Head title="Home" />
      <Container className="products__wrapper">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className={classes.title}
        >
          {multiLingualText.our_products[language]}
        </Typography>
        <div className="products__content">
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {/* mapping over english list instead of localised beacuse image array is created based on english list - if there is a discrepency between number of items in english list and spanish list (e.g. if spanish product category has a typo) it will crash as it won't find an item with the last index - this way the last item just won't be shown */}
              {mainCategoriesUniqueEnglish.map((mainCategoryEnglish, index) => (
                <Thumb
                  title={mainCategoriesLocalisedUnique[index]}
                  link={`/products/${mainCategoryEnglish}`}
                  key={index}
                  image={categoryImages[index].src}
                  imageTitle={categoryImages[index].alt}
                />
              ))}
            </Grid>
          </Container>
        </div>
      </Container>
    </Layout>
  )
}

export default Products
