import React from "react"
import Layout from "../components/layout"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import "../styles/services.scss"

const Services = props => {
  return (
    <Layout>
      <Container className="services__wrapper">
        {props.pageContext.locale === "es" ? (
          <Typography gutterBottom variant="h4" component="h4" align="center">
            Nuestros servicios
          </Typography>
        ) : (
          <Typography gutterBottom variant="h4" component="h4" align="center">
            Our Services
          </Typography>
        )}
        {props.pageContext.locale === "es" ? (
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            align="center"
            style={{ marginTop: "3rem" }}
          >
            Diseño Personalizado
          </Typography>
        ) : (
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            align="center"
            style={{ marginTop: "3rem" }}
          >
            Custom Design
          </Typography>
        )}
        <Container>
          {props.pageContext.locale === "es" ? (
            <Typography variant="body1" paragraph={true}>
              Si no encuentra exactamente lo que está buscando dentro de nuestra
              gama de productos, puede aprovechar nuestro diseño de empaque a
              medida servicio. Si tiene un diseño o boceto listo, lo
              utilizaremos. Si no tienes un diseño listo o si no tienes una idea
              específica en mente, puede discutir sus requisitos con nuestro
              equipo de diseño que ayudará a crear un diseño con el que estés
              satisfecho. Solo ponte en contacto con su consulta a través de la
              página de contacto.
            </Typography>
          ) : (
            <Typography variant="body1" paragraph={true}>
              If you don’t find exactly what you’re looking for within our
              product range, you can avail yourself of our bespoke packaging
              design service. If you have a design or sketch ready, we will use
              that. If you don’t have a design ready or if you don’t have a
              specific idea in mind, you can discuss your requirements with our
              design team who will help create a design that you’re happy with.
              Just get in touch with your query via the Contact page.
            </Typography>
          )}
        </Container>
      </Container>
    </Layout>
  )
}

export default Services
