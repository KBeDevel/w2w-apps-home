import React, { Component } from 'react';
import Functions from '../common/helpers/functions.helper';
import RouterOutline from '../common/helpers/router-outline.helper';
import RouterComponent from '../common/models/component.model';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class About extends Component implements RouterComponent {
  public preload(): void {
    Functions.updateTitle('About - Us');
  }

  public render(): JSX.Element {
    this.preload();
    return RouterOutline.set(
      <Container className="my-5">
        <Row>
          <Col className="mb-5">
            <h1 className="font-weight-bold">About Us</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>The business hub for local entrepreneurs to grow their business without limits. From America to the world.</p>
            <br/>
            <h2
              className="font-weight-bold">A World Without Frontiers</h2>
            <p>In a world of social distance, connectivity is needed more than ever. In World Trade Center Fort Lauderdale we 
              have gathered the most innovative technology. From International Logistic, Cloud Learning and Cross Boarder 
              E-commerce. World Trade Center Fort Lauderdale supplies the most revolutionary support for optimized international trading</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
