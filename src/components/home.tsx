import React, { Component } from 'react';
import Functions from "../common/helpers/functions.helper";
import RouterOutline from "../common/helpers/router-outline.helper";
import RouterComponent from "../common/models/component.model";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import '../styles/home.sass';
import FasttrackLogo from '../assets/svgs/fasttrack-logo.svg';
import B2BLogo from '../assets/images/w2w-b2b-logo.png';
import FIORBannerImage from '../assets/images/fior-banner.jpg';
import ECLFUllLogo from '../assets/svgs/ecl-full-logo.svg';
import ECLFUllWhiteLogo from '../assets/svgs/ecl-full-logo-white.svg';
import { Link } from 'react-router-dom';
import { OurServices } from './services';
import Swal from 'sweetalert2';

class HomeBannerContent extends Component {
  public render(): JSX.Element {
    return (
      <Container className="h-100">
        <Row className="h-100 align-items-center flex-lg-wrap d-lg-flex text-center text-lg-left">
          <Col className="text-white pl-lg-0" xs="12" lg="7">
            <h1>Welcome to<br/><span className="font-weight-bold">We To World</span> Applications</h1>
            <h5>The global platform to facilitate and accelerate the crossborder e-commerce experience for foreign exports</h5>
          </Col>
        </Row>
        <Row className="d-block d-lg-none mt-4">
          <Col className="banner-powered-by-wrapper text-center" xs="12" lg="7">
            <p className="font-weight-bold">Powered By</p>
            <div className="banner-powered-by">
              <img
                className="img-fluid w-50"
                src={ ECLFUllWhiteLogo }
                alt="Ecommerce Logistics LLC"
              ></img>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

class HomeBannerOverlay extends Component {

  private handleDefaultAppLink(event: React.MouseEvent<Record<never, string>, MouseEvent>): void {
    if (event.isTrusted) {
      const alert = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-warning rounded-0'
        },
        buttonsStyling: false
      });
      alert.fire({
        title: 'This app currently not available',
        text: 'Please, try again later',
        icon: 'warning'
      });
    }
  }

  private handleRedirect(event: React.MouseEvent<Record<never, string>, MouseEvent>, link: string): void {
    if (event.isTrusted) {
      window.location.href = link;
    }
  }

  public render(): JSX.Element {
    return (
      <Container>
        <Row>
          <Col className="banner-powered-by-wrapper" xs="12" lg="7">
            <div className="d-none d-lg-block">
              <div className="banner-powered-by">
                <p className="font-weight-bold">Powered By</p>
                <img
                  className="img-fluid w-50"
                  src={ ECLFUllLogo }
                  alt="Ecommerce Logistics LLC"
                ></img>
              </div>
            </div>
          </Col>
          <Col className="text-white banner-box-wrapper" xs="12" lg>
            <div className="banner-box">
              <div className="p-0 p-lg-4 m-4 m-lg-5 text-center">
                <h2><b>Our Apps</b></h2>
                <div className="banner-box-apps">
                  <div className="bg-white my-3 app-logo force-cursor" onClick={ (event) => { this.handleRedirect(event, '/fasttrack'); } }>
                    <img
                      className="m-2"
                      src={ FasttrackLogo }
                      height="65"
                      alt="FAST TRACK"
                    ></img>
                  </div>
                  <div className="bg-white my-3 app-logo force-cursor" onClick={ (event) => { this.handleDefaultAppLink(event); } }>
                    <img
                      className="m-2"
                      src={ B2BLogo }
                      height="65"
                      alt="WE TO WORLD"
                    ></img>
                    <span className="font-weight-bold">B2B Platform</span>
                  </div>
                </div>
                <h3><b>& more...</b></h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

class HomeBanner extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Container className="main-banner px-0" fluid>
          <Row className="h-100">
            <HomeBannerContent/>
          </Row>
        </Container>
        <HomeBannerOverlay/>
      </>
    );
  }
}

interface DismissibleAlertComponentState {
  isActive: boolean
}

class DevelopmentAlert extends Component<Record<string, never>, DismissibleAlertComponentState>{
  constructor(
    props: never
  ) {
    super(props);
    this.state = {
      isActive: true
    }
  }

  private hideAlert(): void {
    this.setState({
      isActive: false
    });
  }

  public render(): JSX.Element {
    return (
      <Alert variant="warning" show={ this.state.isActive } transition={ true } onClose={ () => this.hideAlert() } dismissible={ true }>
        This service is under development. For any question, call us or send us a message (<Link to="/contact">check contact information</Link>)
      </Alert>
    );
  }
}

class HomeBody extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Container className="h-100 my-4 my-lg-5" fluid>
          <Row className="h-100 body-section-0">
            <Container>
              <Row>
                <Col className="my-5 mt-0">
                  <DevelopmentAlert/>
                </Col>
              </Row>
            </Container>
          </Row>
          <Row className="h-100 body-section-1">
            <Container>
              <Row>
                <Col>
                  <h2 className="font-weight-bold">Control your business export around the world</h2>
                  <br/>
                  <h5 className="font-weight-light">
                    All sellers around the world will be able to coordinate and interact with logistics operators during 
                    the process of exporting products that will be offered in the Marketplace in the United States. managing 
                    updated information of their shipment during the transportation process from their country to the 
                    Distribution Centers in the United States.
                  </h5>
                </Col>
              </Row>
            </Container>
          </Row>
          <Row className="h-100 body-section-2">
            <Container className="h-100 my-5">
              <Row className="h-100 align-items-center flex-lg-wrap d-lg-flex mb-4">
                <Col xs="12" lg="5">
                  <h1 className="font-weight-bold">
                    Export like a foreign import of record
                  </h1>
                  <hr/>
                  <h4 className="font-weight-bold">What is the foreign import of records program?</h4>
                  <br/>
                  <p>
                    The “Importer of Record (IOR)” is the entity or person who assumes responsibility; before the U.S. Customs Service; 
                    for ensuring that legal goods/products are imported in accordance with the laws of the United States. 
                    In “Market Place Program”, Latin American exporters will act as “Foreign Importer of Record”, meaning that 
                    exporters will be responsible to the U.S. Customs Service for their own imports.
                  </p>
                  <p>
                    Exporters who participate in the “Marketplace Program” to promote their products in the Marketplace USA, will be 
                    registered as a “Foreign Importer of Record” with the United States Customs Service. This registration will 
                    allow them to ship products and import them into the United States in the name of their company legally 
                    incorporated in their country of origin.
                  </p>
                  <br/>
                </Col>
                <Col xs="12" lg="1"></Col>
                <Col xs="12" lg>
                  <img
                    className="img-fluid"
                    src={ FIORBannerImage }
                    alt="FIOR"
                  ></img>
                </Col>
              </Row>
            </Container>
          </Row>
          <Row className="h-100 body-section-3">
            <Container className="my-5">
              <Row className="mb-4">
                <Col>
                  <h1 className="font-weight-bold">
                    <Link to="/services" className="header-link">
                      Our services
                    </Link>
                  </h1>
                </Col>
              </Row>
              <OurServices/>
            </Container>
          </Row>
        </Container>
      </>
    );
  }
}

class Home extends Component implements RouterComponent {
  public preload(): void {
    Functions.updateTitle('Home');
  }

  public render(): JSX.Element {
    this.preload();
    return RouterOutline.set(
      <div>
        <HomeBanner/>
        <HomeBody/>
      </div>
    );
  }
}

export default Home;
