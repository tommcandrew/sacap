import React from "react"
import "../styles/footer.scss"
import { Typography, Link } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import removeDuplicates from "../utils/removeDuplicates"

const useStyles = makeStyles(theme => ({
  link: {
    color: "white",
  },
}))

const Footer = () => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query {
      allContentfulProduct {
        edges {
          node {
            mainCategory
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

  return (
    <div className="footer__wrapper">
      <div className="footer__content">
        <div className="footer__lists">
          <ul className="footer__list">
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
            {mainCategoriesUnique.map((mainCategory, index) => (
              <li key={index}>
                <Link
                  href={`/${mainCategory}`}
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
              Services
            </Typography>
            <li>Package Design</li>
            <li>Custom Moulding</li>
          </ul>

          <ul className="footer__list">
            <Typography variant="h5" gutterBottom>
              Our Company
            </Typography>
            <li>About</li>
            <li>Contact</li>
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
