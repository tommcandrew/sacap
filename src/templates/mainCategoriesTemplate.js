import React, { useContext } from "react"
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
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"

export const query = graphql`
  query($mainCategory: String!) {
    allContentfulProduct(filter: { mainCategory: { eq: $mainCategory } }) {
      edges {
        node {
          name
          mainCategory
          mainCategorySpanish
          subCategory
          subCategorySpanish
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
  const { language } = useContext(LanguageContext)

  //get unique list of sub categories
  const subCategoriesAllEnglish = props.data.allContentfulProduct.edges.map(
    edge => edge.node.subCategory
  )
  //remove duplicates from list
  const subCategoriesUniqueEnglish = removeDuplicates(subCategoriesAllEnglish)

  //get image to represent each sub category
  const subCategoryImages = getCategoryImages(
    subCategoriesUniqueEnglish,
    props.data.allContentfulProduct.edges
  )

  const subCategoriesAllLocalised = props.data.allContentfulProduct.edges.map(
    edge => {
      if (language === "en" || !edge.node.subCategorySpanish) {
        return edge.node.subCategory
      } else {
        return edge.node.subCategorySpanish
      }
    }
  )

  const subCategoriesLocalisedUnique = removeDuplicates(
    subCategoriesAllLocalised
  )

  let mainCategory
  if (language === "en" || !props.pageContext.mainCategorySpanish) {
    mainCategory = props.pageContext.mainCategory
  } else {
    mainCategory = props.pageContext.mainCategorySpanish
  }

  return (
    <Layout>
      <Container className="mainCategories__wrapper">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            {multiLingualText.products[language]}
          </Link>
          <Typography color="textPrimary">
            {capitaliseFirst(mainCategory)}
          </Typography>
        </Breadcrumbs>
        <div className="mainCategories__content">
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {subCategoriesUniqueEnglish.map((subCategory, index) => (
                <Thumb
                  title={subCategoriesLocalisedUnique[index]}
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
