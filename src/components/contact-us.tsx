import React, { Component } from "react";
import Functions from "../common/helpers/functions.helper";
import RouterOutline from "../common/helpers/router-outline.helper";
import RouterComponent from "../common/models/component.model";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactForm from './contact-form';

class ContactUs extends Component implements RouterComponent {
  public preload(): void {
    Functions.updateTitle('Contact');
  }

  public render(): JSX.Element {
    this.preload();
    return RouterOutline.set(
      <>
        <Container>
          <Row>
            <Col className="py-5">
              <h1 className="font-weight-bold">Contact Us</h1>
            </Col>
          </Row>
        </Container>
        <ContactForm/>
      </>
    );
  }
}

export default ContactUs;
