import React, { Component } from 'react';
import RouterOutline from '../common/helpers/router-outline.helper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Error404Icon from '../assets/svgs/error-404.svg';

class NotFound extends Component {
  public render(): JSX.Element {
    return RouterOutline.set(
      <Container>
        <Row>
          <Col className="py-5 text-center">
            <img
              className="img-fluid"
              src={Error404Icon}
              alt="404"
            ></img>
            <div className="my-5"></div>
            <h1><b>Oops, resource not found</b></h1>
            <h5>The requested resource is incorrect or is under maintenance</h5>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;
