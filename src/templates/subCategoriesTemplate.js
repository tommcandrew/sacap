import React, { useContext } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Thumb from "../components/thumb"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Typography from "@material-ui/core/Typography"
import capitaliseFirst from "../utils/capitaliseFirst"
import "../styles/subCategories.scss"
import Link from "@material-ui/core/Link"
import LanguageContext from "../context/LanguageContext"
import Head from "../components/head"

export const query = graphql`
  query($subCategory: String!) {
    allContentfulProduct(filter: { subCategory: { eq: $subCategory } }) {
      edges {
        node {
          name
          mainCategory
          subCategory
          contentful_id
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

const SubCategoriesTemplate = props => {
  const classes = useStyles()
  const { language } = useContext(LanguageContext)

  let mainCategory
  if (language === "en" || !props.pageContext.mainCategorySpanish) {
    mainCategory = props.pageContext.mainCategory
  } else {
    mainCategory = props.pageContext.mainCategorySpanish
  }

  let subCategory
  if (language === "en" || !props.pageContext.subCategorySpanish) {
    subCategory = props.pageContext.subCategory
  } else {
    subCategory = props.pageContext.subCategorySpanish
  }

  return (
    <Layout>
      <Head title={capitaliseFirst(subCategory)} />
      <Container className="subCategories__wrapper">
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

          <Link
            color="inherit"
            href={`/products/${props.pageContext.mainCategory}`}
          >
            {capitaliseFirst(mainCategory)}
          </Link>
          <Typography color="textPrimary">
            {capitaliseFirst(subCategory)}
          </Typography>
        </Breadcrumbs>
        <div className="subCategories__content">
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {props.data.allContentfulProduct.edges.map((edge, index) => (
                <Thumb
                  title={edge.node.name}
                  link={`/products/${edge.node.mainCategory}/${props.pageContext.subCategory}/${edge.node.contentful_id}`}
                  key={index}
                  image={edge.node.image.fluid.src}
                  imageTitle={edge.node.image.title}
                />
              ))}
            </Grid>
          </Container>
        </div>
      </Container>
    </Layout>
  )
}

export default SubCategoriesTemplate
