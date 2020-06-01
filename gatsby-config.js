const dotenv = require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `SACAP`,
    description: `Plastic packaging supplier`,
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-168226356-1",
      },
    },
  ],
}
