import React from "react"
import Layout from "../components/layout"
import getCategoryImages from "../utils/getCategoryImages"
import removeDuplicates from "../utils/removeDuplicates"
import { graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import Thumb from "../components/thumb"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Typography from "@material-ui/core/Typography"
import capitaliseFirst from "../utils/capitaliseFirst"
import "../styles/mainCategories.scss"

export const query = graphql`
  query($mainCategory: String!) {
    allContentfulProduct(filter: { mainCategory: { eq: $mainCategory } }) {
      edges {
        node {
          name
          mainCategory
          subCategory
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
`

const useStyles = makeStyles(theme => ({}))

const MainCategoriesTemplate = props => {
  const classes = useStyles()

  console.log(props)

  //get unique list of sub categories
  const subCategoriesAll = props.data.allContentfulProduct.edges.map(
    edge => edge.node.subCategory
  )
  //remove duplicates from list
  const subCategoriesUnique = removeDuplicates(subCategoriesAll)

  //get image to represent each sub category
  const subCategoryImages = getCategoryImages(
    subCategoriesUnique,
    props.data.allContentfulProduct.edges
  )
  return (
    <Layout>
      <Container className="mainCategories__wrapper">
        <Breadcrumbs aria-label="breadcrumb">
          {props.pageContext.locale === "es" ? (
            <Link color="inherit" href="/">
              Productos
            </Link>
          ) : (
            <Link color="inherit" href="/">
              Products
            </Link>
          )}

          <Typography color="textPrimary">
            {capitaliseFirst(props.pageContext.mainCategory)}
          </Typography>
        </Breadcrumbs>
        <div className="mainCategories__content">
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {subCategoriesUnique.map((subCategory, index) => (
                <Thumb
                  title={subCategory}
                  link={`/products/${props.pageContext.mainCategory}/${subCategory}`}
                  key={index}
                  image={subCategoryImages[index].src}
                  imageTitle={subCategoryImages[index].alt}
                />
              ))}
            </Grid>
          </Container>
        </div>
      </Container>
    </Layout>
  )
}

export default MainCategoriesTemplate
