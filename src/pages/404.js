import React from "react"
import Layout from "../components/layout"

const NotFound = props => {
  return (
    <Layout>
      <div className="notFound__wrapper">
        {props.pageContext.locale === "es" ? (
          <h1>Página no encontrada.</h1>
        ) : (
          <h1>Page not found.</h1>
        )}
      </div>
    </Layout>
  )
}

export default NotFound
