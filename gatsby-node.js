const locales = require("./locales")
const path = require("path")
//reminder: you need to think about what to do if info entered not all in lower case

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const mainCategoriesTemplate = path.resolve(
    "./src/templates/mainCategoriesTemplate.js"
  )
  const subCategoriesTemplate = path.resolve(
    "./src/templates/subCategoriesTemplate.js"
  )
  const productTemplate = path.resolve("./src/templates/productTemplate.js")
  const res = await graphql(`
    query {
      allContentfulProduct {
        edges {
          node {
            mainCategory
            subCategory
            contentful_id
          }
        }
      }
    }
  `)

  res.data.allContentfulProduct.edges.forEach(edge => {
    //should I use contentful_id or just id?

    //create a page for every product

    createPage({
      component: productTemplate,
      path: "./src/templates/productTemplate",
      context: {
        id: edge.node.contentful_id,
      },
    })
    //create page for each unique mainCategory

    createPage({
      component: mainCategoriesTemplate,
      path: "./src/templates/mainCategoriesTemplate",
      context: {
        mainCategory: edge.node.mainCategory,
      },
    })

    //create page for each unique sub-category
    createPage({
      component: subCategoriesTemplate,
      path: "./src/templates/subCategoriesTemplate",
      context: {
        subCategory: edge.node.subCategory,
        mainCategory: edge.node.mainCategory,
      },
    })
  })
}
