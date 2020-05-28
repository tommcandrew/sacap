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
            mainCategorySpanish
            subCategory
            subCategorySpanish
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
      path: `/products/${edge.node.mainCategory}/${edge.node.subCategory}/${edge.node.contentful_id}`,
      context: {
        id: edge.node.contentful_id,
      },
    })
    //create page for each unique mainCategory

    createPage({
      component: mainCategoriesTemplate,
      path: `/products/${edge.node.mainCategory}`,
      context: {
        mainCategory: edge.node.mainCategory,
        mainCategorySpanish: edge.node.mainCategorySpanish,
      },
    })

    //create page for each unique sub-category
    createPage({
      component: subCategoriesTemplate,
      path: `/products/${edge.node.mainCategory}/${edge.node.subCategory}`,
      context: {
        subCategory: edge.node.subCategory,
        subCategorySpanish: edge.node.subCategorySpanish,
        mainCategory: edge.node.mainCategory,
        mainCategorySpanish: edge.node.mainCategorySpanish,
      },
    })
  })
}
