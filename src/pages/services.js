import React, { useContext } from "react"
import Layout from "../components/layout"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import "../styles/services.scss"
import LanguageContext from "../context/LanguageContext"
import multiLingualText from "../assets/multiLingualText"

const Services = props => {
  const { language } = useContext(LanguageContext)

  return (
    <Layout>
      <Container className="services__wrapper">
        <Typography gutterBottom variant="h4" component="h4" align="center">
          {multiLingualText.our_services[language]}
        </Typography>

        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          align="center"
          style={{ marginTop: "3rem" }}
        >
          {multiLingualText.custom_design[language]}
        </Typography>

        <Container>
          <Typography variant="body1" paragraph={true}>
            {multiLingualText.custom_design_main[language]}
          </Typography>
        </Container>
      </Container>
    </Layout>
  )
}

export default Services
