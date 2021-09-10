import { Component } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import { Link } from 'react-router-dom'
import ContactData from './contact-data'
import Grid from '../../helpers/grid.helper'
import Image from 'react-bootstrap/Image'
import RoutesMap from '../../helpers/routes-map.helper'
import Button from 'react-bootstrap/Button'
import W2WLogo from '../../assets/img/w2w-logo.png'
import WorldMapImage from '../../assets/svg/world-map.svg'
import ECLLogo from '../../assets/svg/ecl-logo.svg'
import WTCLogo from '../../assets/img/wtcfl-logo-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import '../../styles/footer.sass'

export default class MainFooter extends Component {
  public render(): JSX.Element {
    return (
      <footer>
        <Grid.Container className="footer-top py-5 bg-dark" fluid>
          <Grid.Row className="h-100">
            <Grid.Container className="h-100">
              <Grid.Row className="h-100 align-items-center flex-lg-wrap d-lg-flex text-center text-lg-left">
                <Grid.Col className="text-center text-lg-left d-none d-lg-block" xs="12" lg="4">
                  <h4><b>Where We Are</b></h4>
                  <br/>
                  <Image
                    className="img-fluid"
                    src={ WorldMapImage }
                    height="70"
                    alt="Around the World" />
                </Grid.Col>
                <Grid.Col className="text-center text-lg-right mb-4 my-lg-0" xs="12" lg>
                  <Image
                    className="img-fluid"
                    src={ WTCLogo }
                    height="60"
                    alt="World Trade Center Fort Lauderdale" />
                </Grid.Col>
                <Grid.Col className="d-block d-lg-none" xs="12">
                  <hr className="border-light" />
                </Grid.Col>
                <Grid.Col className="text-center text-lg-right mt-4 mt-lg-0" xs="12" lg="auto">
                  <Image
                    src={ W2WLogo }
                    height="180"
                    alt="We To World" />
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
            <Grid.Container className="my-3">
              <Grid.Row>
                <Grid.Col>
                  <hr className="border-light" />
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
            <ContactData />
            <Grid.Container>
              <Grid.Row>
                <Grid.Col className="text-center text-lg-right">
                  <Button
                    variant="outline-light"
                    className="rounded-0"
                    title="Go to the page top"
                    onClick={ () => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }) } } >
                    <FontAwesomeIcon icon={ faChevronUp } />
                  </Button>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
          </Grid.Row>
        </Grid.Container>
        <Grid.Container className="footer-middle bg-dark" fluid>
          <Grid.Row>
            <Grid.Container>
              <Grid.Row className="text-center justify-content-lg-center">
                <Grid.Col xs="12" lg="auto" className="mb-3">
                  <Link to={ RoutesMap.termsOfService.path }>Terms of Service</Link>
                </Grid.Col>
                <Grid.Col xs="12" lg="auto" className="mb-3">
                  <Link to={ RoutesMap.privacyPolicy.path }>Privacy Policy</Link>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
          </Grid.Row>
        </Grid.Container>
        <Grid.Container className="footer-bottom py-3" fluid>
          <Grid.Row>
            <Grid.Container>
              <Grid.Row>
                <Grid.Col className="text-center text-lg-right" xs="12" lg>
                  Developed & Powered By
                  <a href="https://eclprojects.net" target="_blank" rel="noreferrer" title="Ecommerce Logistics LLC">
                    <Image
                      className="ml-2 mr-0 mx-lg-2"
                      src={ ECLLogo }
                      height="25"
                      alt=" " />
                  </a>
                </Grid.Col>
                <Grid.Col className="text-center" xs="12" lg="auto">
                  <span className="d-none d-lg-inline-block">
                    &ensp;|&ensp;
                  </span>
                  <span className="d-inline-block d-lg-none my-1"></span>
                </Grid.Col>
                <Grid.Col className="text-center" xs="12" lg="auto">
                  Supported By
                  <a href="https://www.wtcfl.com/" target="_blank" rel="noreferrer" title="World Trade Center Fort Louderdale">
                    <Image
                      className="ml-2 mr-0 mx-lg-2"
                      src={ WTCLogo }
                      height="20"
                      alt="World Trade Center Fort Lauderdale" />
                  </a>
                </Grid.Col>
                <Grid.Col className="text-center" xs="12" lg="auto">
                  <span className="d-none d-lg-inline-block">
                    &ensp;|&ensp;
                  </span>
                  <span className="d-inline-block d-lg-none my-1"></span>
                </Grid.Col>
                <Grid.Col className="text-center text-lg-left" xs="12" lg>
                  Copyright&nbsp;&copy;&nbsp;{ CommonFunctions.getCurrentYear() }&nbsp;
                  <a href="https://wetoworld.com" target="_blank" rel="noreferrer">We To World</a>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
          </Grid.Row>
        </Grid.Container>
      </footer>
    )
  }
}
