import { Component, MouseEvent } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import Grid from '../../helpers/grid.helper'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import RouterOutline, { RouterComponent } from '../../helpers/router.helper'
import { applicationDescriptions } from '../../helpers/app-descriptor.helper'
import ProfileProvider from '../../providers/profile.provider'
import { handleW2WAPIResponse } from '../../helpers/form.helper'
import RouterMap from '../../helpers/routes-map.helper'
import { LinkContainer } from 'react-router-bootstrap'
import { EmptyProps, Profile } from '../../types'
import '../../styles/dashboard.sass'

type Operation = unknown & {
  open: boolean
}

type Invoice = unknown & {
  open: boolean
}

type DashboardState = {
  operations: Operation[],
  invoices: Invoice[],
  profile: Profile,
  profileProgress: number
}

export default class Dashboard extends Component<EmptyProps, DashboardState> implements RouterComponent {

  constructor(
    public readonly props: never
  ) {
    super(props)
    this.state = this.initState()
  }

  private initState(): DashboardState {
    return {
      operations: [],
      invoices: [],
      profile: ProfileProvider.EMPTY_PROFILE,
      profileProgress: 0
    }
  }

  private async getProfile(): Promise<void> {
    const response = await ProfileProvider.getUserProfile()
    if (!response) return
    if (handleW2WAPIResponse(response)) {
      this.setState({
        ...this.state,
        profile: response.value,
        profileProgress: 100
      })
    }
  }

  private redirectTo(link: string): void {
    window.location.href = link
  }

  private getActiveApps(): JSX.Element {
    return <Grid.Row className="mx-auto">
      {
        applicationDescriptions.map((app, index) => {
          return <Grid.Col
            className="dash-app-link"
            xs="12"
            lg="6"
            key={ index }
            onClick={ (event: MouseEvent<HTMLDivElement>) => { if (event.isTrusted) this.redirectTo(app.references[0].link) } } >
            <Image
              className="img-fluid d-block w-auto"
              src={ app.icon.svg ?? app.icon.svg }
              alt={ app.icon.alt } />
          </Grid.Col>
        })
      }
    </Grid.Row>
  }

  public componentDidMount(): void {
    this.getProfile()
  }

  public preload(): void {
    CommonFunctions.updatePathTitle('Dashboard')
  }

  public render(): JSX.Element {
    this.preload()
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col xs="12" lg className="col-card">
            <h2 className="font-weight-bold">
              Organization Profile
              <LinkContainer to={ RouterMap.profile.path } >
                <Button
                  variant="info"
                  className="d-inline-block d-lg-flex float-lg-right my-3 my-lg-0 mx-auto mx-lg-0" >
                  Check
                </Button>
              </LinkContainer>
            </h2>
            {
              this.state.profileProgress < 100
                ? <small className="float-lg-right d-block d-lg-flex">
                  { this.state.profileProgress }% complete
                </small>
                : null
            }
            <br />
            <Table
              className="mb-3"
              size="sm"
              striped
              borderless
              responsive >
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{ this.state.profile.organization.name }</td>
                </tr>
                <tr>
                  <td>Identifification</td>
                  <td>
                    {
                      this.state.profile.organization.identification.type
                        ? this.state.profile.organization.identification.type + ': ' + this.state.profile.organization.identification.number
                        : ' '
                    }
                  </td>
                </tr>
                <tr>
                  <td>Social Reason</td>
                  <td>{ this.state.profile.organization.socialReason }</td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
          <Grid.Col xs="12" lg="auto" />
          <Grid.Col xs="12" lg className="col-card">
            <h2 className="font-weight-bold">Apps</h2>
            <p>Your active W2W apps</p>
            { this.getActiveApps() }
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="py-3" />
        <Grid.Row>
          <Grid.Col className="col-card">
            <h2 className="font-weight-bold">
              Current / Open Operations
              <Button
                disabled
                variant="warning"
                className="d-inline-block d-lg-flex float-lg-right my-3 my-lg-0 mx-auto mx-lg-0" >
                Create Operation
              </Button>
            </h2>
            <br />
            {
              this.state.operations.length > 0
                ? <Table responsive borderless striped>
                  <tbody>
                    {
                      this.state.operations.map((op, index) => {
                        op.open
                          ? <tr key={ index }>
                            <th scope="row">{ index }</th>
                            <td>{ op.open }</td>
                          </tr>
                          : null
                      })
                    }
                  </tbody>
                </Table>
                : <h5 className="text-center">No opened operations yet</h5>
            }
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="py-3" />
        <Grid.Row>
          <Grid.Col className="col-card">
            <h2 className="font-weight-bold">Billing / Invoicing History</h2>
            <br />
            {
              this.state.invoices.length > 0
                ? <Table responsive borderless striped>
                  <tbody>
                    {
                      this.state.invoices.map((op, index) => {
                        op.open
                          ? <tr key={ index }>
                            <th scope="row">{ index }</th>
                            <td>{ op.open }</td>
                          </tr>
                          : null
                      })
                    }
                  </tbody>
                </Table>
                : <h5 className="text-center">No billing data available</h5>
            }
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>,
      'non-empty'
    )
  }
}
