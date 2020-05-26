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

  //create a page for every product
  res.data.allContentfulProduct.edges.forEach(edge => {
    //should I use contentful_id or just id?

    return new Promise(resolve => {
      //then create two new pages in its place based on languages in locales file
      Object.keys(locales).map(lang => {
        const path = `/products/${edge.node.mainCategory}/${edge.node.subCategory}/${edge.node.contentful_id}`
        const localizedPath = locales[lang].default
          ? path
          : locales[lang].path + path

        return createPage({
          component: productTemplate,
          path: localizedPath,
          context: {
            id: edge.node.contentful_id,
            locale: lang,
          },
        })
      })

      resolve()
    })
  })

  //create page for each unique mainCategory
  res.data.allContentfulProduct.edges.forEach(edge => {
    return new Promise(resolve => {
      //then create two new pages in its place based on languages in locales file
      Object.keys(locales).map(lang => {
        const path = `/products/${edge.node.mainCategory}`
        const localizedPath = locales[lang].default
          ? path
          : locales[lang].path + path

        return createPage({
          component: mainCategoriesTemplate,
          path: localizedPath,
          context: {
            mainCategory: edge.node.mainCategory,
            locale: lang,
          },
        })
      })

      resolve()
    })
  })

  //create page for each unique sub-category
  res.data.allContentfulProduct.edges.forEach(edge => {
    return new Promise(resolve => {
      //then create two new pages in its place based on languages in locales file
      Object.keys(locales).map(lang => {
        const path = `/products/${edge.node.mainCategory}/${edge.node.subCategory}`
        const localizedPath = locales[lang].default
          ? path
          : locales[lang].path + path

        return createPage({
          component: subCategoriesTemplate,
          path: localizedPath,
          context: {
            subCategory: edge.node.subCategory,
            mainCategory: edge.node.mainCategory,
            locale: lang,
          },
        })
      })

      resolve()
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  console.log(page.path)
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    //delete each page after it's created
    deletePage(page)

    //then create two new pages in its place based on languages in locales file
    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
        },
      })
    })

    resolve()
  })
}
