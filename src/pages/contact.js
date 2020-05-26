import React from "react"
import Layout from "../components/layout"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import "../styles/contact.scss"

const Contact = () => {
  return (
    <Layout>
      <Container className="services__wrapper">
        <Typography gutterBottom variant="h4" component="h4" align="center">
          Contact Us
        </Typography>
        <Container>
          <Typography variant="body1" paragraph={true}>
            Eiusmod dolore consectetur irure ad sit excepteur ipsum. Eu
            voluptate sint laborum fugiat eiusmod id veniam officia aliquip
            dolore aliqua labore anim. Occaecat quis nisi ea eiusmod sit magna
            est laboris ullamco ut labore Lorem fugiat. Labore eiusmod ullamco
            et fugiat minim nostrud sint dolore. Minim amet consectetur aliquip
            reprehenderit sunt.
          </Typography>
          <Typography variant="body1" paragraph={true}>
            Eiusmod dolore consectetur irure ad sit excepteur ipsum. Eu
            voluptate sint laborum fugiat eiusmod id veniam officia aliquip
            dolore aliqua labore anim. Occaecat quis nisi ea eiusmod sit magna
            est laboris ullamco ut labore Lorem fugiat. Labore eiusmod ullamco
            et fugiat minim nostrud sint dolore. Minim amet consectetur aliquip
            reprehenderit sunt.
          </Typography>
          <Typography variant="body1" paragraph={true}>
            Eiusmod dolore consectetur irure ad sit excepteur ipsum. Eu
            voluptate sint laborum fugiat eiusmod id veniam officia aliquip
            dolore aliqua labore anim. Occaecat quis nisi ea eiusmod sit magna
            est laboris ullamco ut labore Lorem fugiat. Labore eiusmod ullamco
            et fugiat minim nostrud sint dolore. Minim amet consectetur aliquip
            reprehenderit sunt.
          </Typography>
        </Container>
      </Container>
    </Layout>
  )
}

export default Contact
