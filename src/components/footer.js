import React, { useContext } from "react"
import "../styles/footer.scss"
import { Typography, Link } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import removeDuplicates from "../utils/removeDuplicates"
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"

const useStyles = makeStyles(theme => ({
  link: {
    color: "white",
  },
}))

const Footer = () => {
  const classes = useStyles()
  const { language } = useContext(LanguageContext)

  const data = useStaticQuery(graphql`
    query {
      allContentfulProduct {
        edges {
          node {
            mainCategory
            mainCategorySpanish
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
    <div className="footer__wrapper">
      <div className="footer__content">
        <div className="footer__lists">
          <ul className="footer__list">
            <Typography variant="h5" gutterBottom>
              <Link
                href={"/"}
                className={classes.link}
                style={{ textDecoration: "none" }}
              >
                {multiLingualText.products[language]}
              </Link>
            </Typography>
            {mainCategoriesLocalisedUnique.map((mainCategory, index) => (
              <li key={index}>
                <Link
                  href={`/products/${mainCategoriesUniqueEnglish[index]}`}
                  className={classes.link}
                  style={{ textDecoration: "none" }}
                >
                  {mainCategory}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="footer__list">
            <Typography variant="h5" gutterBottom>
              <Link
                href={"/services"}
                className={classes.link}
                style={{ textDecoration: "none" }}
              >
                {multiLingualText.services[language]}
              </Link>
            </Typography>
            <li>
              <Link
                href={"/services/#customDesign"}
                className={classes.link}
                style={{ textDecoration: "none" }}
              >
                {multiLingualText.custom_design[language]}{" "}
              </Link>
            </li>
          </ul>

          <ul className="footer__list">
            <Typography variant="h5" gutterBottom>
              {multiLingualText.our_company[language]}
            </Typography>
            <li> {multiLingualText.about[language]}</li>
            <Link
              href={"/contact"}
              className={classes.link}
              style={{ textDecoration: "none" }}
            >
              <li> {multiLingualText.contact[language]}</li>
            </Link>
          </ul>
        </div>
        <div className="footer__copyright">
          <Typography>&copy; Sacap 2020</Typography>
        </div>
      </div>
    </div>
  )
}

export default Footer
