import React, { Component } from 'react';
import Functions from '../common/helpers/functions.helper';
import ContactData from './contact-data';
import '../styles/footer.sass';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import W2WLogo from '../assets/images/w2w-logo.png';
import WorldMapImage from '../assets/svgs/world-map.svg';
import ECLLogo from '../assets/svgs/ecl-logo.svg';
import WTCLogo from '../assets/images/wtcfl-logo-white.png';

class Footer extends Component {
  public render(): JSX.Element {
    return (
      <div>
        <Container className="footer-top py-5 bg-dark" fluid>
          <Row className="h-100">
            <Container className="h-100">
              <Row className="h-100 align-items-center flex-lg-wrap d-lg-flex text-center text-lg-left">
                <Col className="text-center text-lg-left d-none d-lg-block" xs="12" lg="4">
                  <h4><b>Where We Are</b></h4>
                  <br/>
                  <img
                    className="img-fluid"
                    src={ WorldMapImage }
                    height="70"
                    alt="Around the World"
                  ></img>
                </Col>
                <Col className="text-center text-lg-right mb-4 my-lg-0" xs="12" lg>
                  <img
                    className="img-fluid"
                    src={ WTCLogo }
                    height="60"
                    alt="World Trade Center Fort Lauderdale"
                  ></img>
                </Col>
                <Col className="d-block d-lg-none" xs="12">
                  <hr className="border-light" />
                </Col>
                <Col className="text-center text-lg-right mt-4 mt-lg-0" xs="12" lg="auto">
                  <img
                    src={ W2WLogo }
                    height="180"
                    alt="We To World"
                  ></img>
                </Col>
              </Row>
            </Container>
            <Container className="my-3">
              <Row>
                <Col>
                  <hr className="border-light" />
                </Col>
              </Row>
            </Container>
            <ContactData></ContactData>
          </Row>
        </Container>
        <Container className="footer-bottom py-3 bg-black" fluid>
          <Row>
            <Container>
              <Row>
                <Col className="text-center text-lg-right" xs="12" lg>
                  Developed & Powered By
                  <a href="https://eclprojects.net" target="_blank" rel="noreferrer" title="Ecommerce Logistics LLC">
                    <img
                      className="mx-2"
                      src={ ECLLogo }
                      height="25"
                      alt=" "
                    ></img>
                  </a>
                </Col>
                <Col className="text-center" xs="12" lg="auto">
                  <span className="d-none d-lg-inline-block">
                    &ensp;|&ensp;
                  </span>
                  <span className="d-inline-block d-lg-none my-1"></span>
                </Col>
                <Col className="text-center" xs="12" lg="auto">
                  Supported By
                  <a href="https://www.wtcfl.com/" target="_blank" rel="noreferrer" title="World Trade Center Fort Louderdale">
                    <img
                      className="mx-2"
                      src={ WTCLogo }
                      height="20"
                      alt=" "
                    ></img>
                  </a>
                </Col>
                <Col className="text-center" xs="12" lg="auto">
                  <span className="d-none d-lg-inline-block">
                    &ensp;|&ensp;
                  </span>
                  <span className="d-inline-block d-lg-none my-1"></span>
                </Col>
                <Col className="text-center text-lg-left" xs="12" lg>
                  { Functions.getCurrentYear() + ' © ' }
                  <a href="https://wetoworld.com" target="_blank" rel="noreferrer">We To World</a>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
