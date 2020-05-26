const getCategoryImages = (categoryList, edges) => {
  const categoryImages = []
  categoryList.forEach(category => {
    for (let i = 0; i < edges.length; i++) {
      if (
        edges[i].node.mainCategory === category ||
        edges[i].node.subCategory === category
      ) {
        categoryImages.push({
          alt: edges[i].node.image.title,
          src: edges[i].node.image.fluid.src,
        })
        break
      }
    }
  })
  return categoryImages
}

export default getCategoryImages
