import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ContactData extends Component {
  public render(): JSX.Element {
    return (
      <Container className="text-center text-lg-left">
        <Row>
          <Col>
            <h4><b>Contact Us</b></h4>
            <br/>  
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg>
            <h5><b>United States</b></h5>
            <br/>
            <p>
              <a href="tel:+17862509701">
                +1 786 250 9701
              </a>
              <br/>
              <a href="mailto:jaime@wetoworld.com">
                jaime@wetoworld.com
              </a>
            </p>
            <p>200 LESLIE DR. 521HALLANDALE, FL 33009 USA </p>
          </Col>
          <Col xs="12" lg>
            <h5><b>Brazil</b></h5>
            <br/>
            <p>
              <a href="tel:+19547321181">
                +1 954 732 1181
              </a>
              <br/>
              <a href="mailto:luis@wetoworld.com">
                luis@wetoworld.com
              </a>
            </p>
          </Col>
          <Col xs="12" lg>
            <h5><b>Chile</b></h5>
            <br/>
            <p>
              <a href="tel:+56977934344">
                +56 9 7793 4344
              </a>
              <br/>
              <a href="mailto:fernando@wetoworld.com">
                fernando@wetoworld.com
              </a>
            </p>
          </Col>
          <Col xs="12" lg>
            <h5><b>Colombia</b></h5>
            <br/>
            <p>
              <a href="tel:+573143515251">
                +57 314 3515 251
              </a>
              <br/>
              <a href="mailto:felipe@wetoworld.com">
                felipe@wetoworld.com
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ContactData;
