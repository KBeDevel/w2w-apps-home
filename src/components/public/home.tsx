import { Component, MouseEvent } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import RouterOutline, { RouterComponent } from '../../helpers/router.helper'
import { Link } from 'react-router-dom'
import { OurServices } from './services'
import Grid from '../../helpers/grid.helper'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Swal from 'sweetalert2'
import RoutesMap from '../../helpers/routes-map.helper'
import { LinkContainer } from 'react-router-bootstrap'
import { applicationDescriptions } from '../../helpers/app-descriptor.helper'

import FasttrackLogo from '../../assets/svg/fasttrack-logo.svg'
import B2BLogo from '../../assets/img/w2w-b2b-logo.png'
import FIORBannerImage from '../../assets/img/fior-banner.jpg'
import ECLFUllLogo from '../../assets/svg/ecl-full-logo.svg'
import ECLFUllWhiteLogo from '../../assets/svg/ecl-full-logo-white.svg'

import '../../styles/home.sass'

class HomeBannerContent extends Component {
  public render(): JSX.Element {
    return (
      <Grid.Container className="h-100">
        <Grid.Row className="h-100 align-items-center flex-lg-wrap d-lg-flex text-center text-lg-left">
          <Grid.Col className="text-white pl-lg-0" xs="12" lg="7">
            <h1>Welcome to<br/><span className="font-weight-bold">We To World</span> Applications</h1>
            <h5>The global platform to facilitate and accelerate the crossborder e-commerce experience for foreign exports</h5>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="d-block d-lg-none mt-4">
          <Grid.Col className="banner-powered-by-wrapper text-center" xs="12" lg="7">
            <p className="font-weight-bold">Powered By</p>
            <div className="banner-powered-by">
              <Image
                className="img-fluid w-50"
                src={ ECLFUllWhiteLogo }
                alt="Ecommerce Logistics LLC" />
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}

class HomeBannerOverlay extends Component {
  private handleDefaultAppLink(event: MouseEvent): void {
    if (event.isTrusted) {
      const alert = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-warning rounded-0'
        },
        buttonsStyling: false
      })
      alert.fire({
        title: 'This app currently not available',
        text: 'Please, try again later',
        icon: 'warning'
      })
    }
  }

  private handleRedirect(event: MouseEvent, appName: string): void {
    const destinyElement = document.getElementById(`app-desc-${appName}`)
    if (event.isTrusted && destinyElement) {
      destinyElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  public render(): JSX.Element {
    return (
      <Grid.Container>
        <Grid.Row>
          <Grid.Col className="banner-powered-by-wrapper" xs="12" lg="7">
            <div className="d-none d-lg-block">
              <div className="banner-powered-by">
                <p className="font-weight-bold">Powered By</p>
                <Image
                  className="img-fluid w-50"
                  src={ ECLFUllLogo }
                  alt="Ecommerce Logistics LLC" />
              </div>
            </div>
          </Grid.Col>
          <Grid.Col className="text-white banner-box-wrapper" xs="12" lg>
            <div className="banner-box">
              <div className="p-0 p-lg-4 m-4 m-lg-5 text-center">
                <h2 className="font-weight-bold"><b>Direct links</b></h2>
                <div className="banner-box-apps">
                  <div className="bg-white my-3 app-logo force-cursor" onClick={ (event) => { this.handleRedirect(event, 'fasttrack') } }>
                    <Image
                      className="m-2"
                      src={
                        applicationDescriptions.find(app => app.elementId === 'fasttrack')?.icon.link
                        ?? applicationDescriptions.find(app => app.elementId === 'fasttrack')?.icon.svg
                        ?? FasttrackLogo
                      }
                      height="65"
                      alt="FAST TRACK" />
                  </div>
                  <div className="bg-white my-3 app-logo force-cursor" onClick={ (event) => { this.handleDefaultAppLink(event) } }>
                    <Image
                      className="m-2"
                      src={ B2BLogo }
                      height="65"
                      alt="WE TO WORLD" />
                    <span className="font-weight-bold">B2B Platform</span>
                  </div>
                </div>
                <h3><b>and more coming soon</b></h3>
                <h5 className="font-weight-light font-italic">See bellow for details</h5>
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}

class HomeBanner extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Grid.Container className="main-banner px-0" fluid>
          <Grid.Row className="h-100">
            <HomeBannerContent/>
          </Grid.Row>
        </Grid.Container>
        <HomeBannerOverlay/>
      </>
    )
  }
}

class HomeApplicationList extends Component {
  public render(): JSX.Element {
    return (
      <>
        {
          applicationDescriptions.map((item, index) => (
            <Grid.Row id={ `app-desc-${item.elementId}` } className="align-items-center flex-lg-wrap d-lg-flex my-5" key={ index }>
              <Grid.Col className="my-3 my-lg-0 text-center text-lg-left" xs="12" lg>
                <h3 className="font-weight-bold">
                  <Link to="/fast-track" className="header-link">
                    { item.title }
                  </Link>
                </h3>
                <h5 className="font-weight-light">
                  { item.description.long }
                </h5>
              </Grid.Col>
              <Grid.Col className="text-center my-3 my-lg-0" xs="12" lg="4">
                <Image
                  className="img-fluid w-100"
                  src={ item.icon.link ?? item.icon.svg ?? '' }
                  alt={ item.icon.alt } />
              </Grid.Col>
              <Grid.Col className="text-center text-lg-left my-4" xs="12">
                <Button variant="outline-dark" className="mx-2 ml-lg-0" href={ item.references[0].link }>
                  { item.references[0].title }
                </Button>
                <LinkContainer to={ RoutesMap.signUp.path }>
                  <Button variant="warning" className="mx-2">
                    Create Free Account
                  </Button>
                </LinkContainer>
              </Grid.Col>
            </Grid.Row>
          ))
        }
      </>
    )
  }
}

class HomeBody extends Component {
  public render(): JSX.Element {
    return (
      <Grid.Container className="h-100 my-4 my-lg-5" fluid>
        <Grid.Row className="h-100">
          <Grid.Container className="h-100 body-section-0 my-3">
            <Grid.Row>
              <Grid.Col>
                <hr/>
              </Grid.Col>
            </Grid.Row>
            <HomeApplicationList />
          </Grid.Container>
        </Grid.Row>
        <Grid.Row className="h-100 body-section-1">
          <Grid.Container>
            <Grid.Row>
              <Grid.Col>
                <h2 className="font-weight-bold">Control your business export around the world</h2>
                <br/>
                <h5 className="font-weight-light">
                  All sellers around the world will be able to coordinate and interact with logistics operators during 
                  the process of exporting products that will be offered in the Marketplace in the United States. managing 
                  updated information of their shipment during the transportation process from their country to the 
                  Distribution Centers in the United States.
                </h5>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </Grid.Row>
        <Grid.Row className="h-100 body-section-2">
          <Grid.Container className="h-100 my-5">
            <Grid.Row className="h-100 align-items-center flex-lg-wrap d-lg-flex mb-4">
              <Grid.Col xs="12" lg="5">
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
              </Grid.Col>
              <Grid.Col xs="12" lg="1"></Grid.Col>
              <Grid.Col xs="12" lg>
                <Image
                  className="img-fluid"
                  src={ FIORBannerImage }
                  alt="FIOR" />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </Grid.Row>
        <Grid.Row className="h-100 body-section-3">
          <Grid.Container className="my-5">
            <Grid.Row className="mb-4">
              <Grid.Col>
                <h1 className="font-weight-bold">
                  <Link to="/services" className="header-link">
                    Our services
                  </Link>
                </h1>
              </Grid.Col>
            </Grid.Row>
            <OurServices/>
          </Grid.Container>
        </Grid.Row>
      </Grid.Container>
    )
  }
}

export default class Home extends Component implements RouterComponent {
  public preload(): void {
    CommonFunctions.updatePathTitle('Home')
  }

  public render(): JSX.Element {
    this.preload()
    return RouterOutline.set(
      <>
        <HomeBanner/>
        <HomeBody/>
      </>
    )
  }
}
