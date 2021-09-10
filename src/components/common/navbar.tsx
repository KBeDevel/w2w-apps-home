import { Component, MouseEvent } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Grid from '../../helpers/grid.helper'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import RoutesMap from '../../helpers/routes-map.helper'
import AccountProvider from '../../providers/account.provider'
import { RouteAnalyzerHelper } from '../../helpers/route-analyzer.helper'

import W2WLogo from '../../assets/svg/brands/luminant-logo-w.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../../styles/navbar.sass'

export default class MainNavbar extends Component {

  private _isAuthenticated = false

  constructor (
    props: never
  ) {
    super(props)
    this._isAuthenticated = AccountProvider.isAuthenticated()
  }

  private checkNoNewUserPath(): boolean {
    return RouteAnalyzerHelper.isPathEqualsTo(RoutesMap.signUp.path) || RouteAnalyzerHelper.isPathEqualsTo(RoutesMap.signUpFinish.path)
  }

  private closeSession(event: MouseEvent<unknown, unknown>): void {
    if (event.isTrusted) {
      this._isAuthenticated = AccountProvider.closeSession(true)
    }
  }

  private baseLinks(): JSX.Element {
    return <>
      <Nav.Link>Services</Nav.Link>
      <Nav.Link>Contact</Nav.Link>
    </>
  }

  public render(): JSX.Element {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Grid.Container>
          <LinkContainer to="/home">
            <Navbar.Brand>
              <Image
                src={ W2WLogo }
                height="60"
                alt="We To World" />
              <span className="d-none d-lg-inline-block mx-lg-4">|</span>
              <Image
                className="d-none d-lg-inline-block"
                // src={ WTCLogo }
                height="10"
                alt="" />
              <span className="mx-3 mx-lg-4"></span>
              <span>
                <b>Session</b>
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="main-navbar-links"/>
          <Navbar.Collapse id="main-navbar-links">
            <Nav className="ml-auto text-center text-lg-left">
              {
                this._isAuthenticated
                  ? <>
                    <LinkContainer to={ RoutesMap.dashboard.path }>
                      <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    { this.baseLinks() }
                    <NavDropdown
                      title={ <FontAwesomeIcon icon={ faUser } /> }
                      id="account-settings-dropdown"
                      drop="down" >
                      <LinkContainer to={ RoutesMap.profile.path }>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={ (event) => { this.closeSession(event) } } >Cerrar sesion</NavDropdown.Item>
                    </NavDropdown>
                  </>
                  : <>
                    <LinkContainer to={ RoutesMap.home.path }>
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    { this.baseLinks() }
                    <Form inline className="d-inline-flex d-lg-none">
                      {
                        !this.checkNoNewUserPath()
                          ? <>
                            <LinkContainer to={ RoutesMap.signIn.path }>
                              <Button variant="outline-light" size="sm" className="mx-2 ml-lg-2 mr-lg-0 btn-block">
                                <b>Iniciar</b>
                              </Button>
                            </LinkContainer>
                            <LinkContainer to={ RoutesMap.signUp.path }>
                              <Button variant="warning" size="sm" className="mx-2 mr-lg-0 btn-block">
                                <b>Crea tu cuenta gratis</b>
                              </Button>
                            </LinkContainer>
                          </>
                          : <></>
                      }
                    </Form>
                    <Form inline className="d-none d-lg-inline-flex">
                      {
                        !this.checkNoNewUserPath()
                          ? <>
                            <LinkContainer to={ RoutesMap.signIn.path }>
                              <Button variant="outline-light" size="sm" className="mx-2 ml-lg-2 mr-lg-0">
                                <b>Iniciar</b>
                              </Button>
                            </LinkContainer>
                            <Button variant="warning" size="sm" className="mx-2 mr-lg-0">
                              <b>Registro</b>
                            </Button>
                          </>
                          : <></>
                      }
                    </Form>
                  </>
              }
            </Nav>
          </Navbar.Collapse>
        </Grid.Container>
      </Navbar>
    )
  }
}
