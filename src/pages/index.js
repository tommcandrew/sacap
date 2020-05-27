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
  const mainCategoriesAll = data.allContentfulProduct.edges.map(
    edge => edge.node.mainCategory
  )
  //remove duplicates from list
  const mainCategoriesUnique = removeDuplicates(mainCategoriesAll)

  //get image to represent each category
  const categoryImages = getCategoryImages(
    mainCategoriesUnique,
    data.allContentfulProduct.edges
  )

  return (
    <Layout>
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
              {mainCategoriesUnique.map((mainCategory, index) => (
                <Thumb
                  title={mainCategory}
                  link={`/products/${mainCategory}`}
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
