import { Component } from 'react'
import RouterOutline, { RouterComponent } from '../../helpers/router.helper'
import Grid from '../../helpers/grid.helper'
import Error403Icon from '-!react-svg-loader!../../assets/svg/error-403.svg'
import AccountProvider from '../../providers/account.provider'
import RoutesMap from '../../helpers/routes-map.helper'
import { Link } from 'react-router-dom'
import { RouteHandler } from '../../types'
import { CommonFunctions } from '../../helpers/common-functions.helper'

export default class Forbidden extends Component<RouteHandler> implements RouterComponent {

  public requestedResource: string | undefined = undefined

  public preload(): void {
    CommonFunctions.updatePathTitle('Error 403 - Forbidden Access')
    this.requestedResource = new URLSearchParams(this.props.location.search).get('resource') ?? undefined
    if (this.requestedResource) {
      this.requestedResource = CommonFunctions.Base64.decode(this.requestedResource)
    }
    const sessionChecker = setInterval(() => {
      console.log(`Redirecting to ${this.requestedResource}? ${(AccountProvider.isAuthenticated() ? 'yes' : 'no')}`)
      if (AccountProvider.isAuthenticated() && this.requestedResource) {
        window.location.href = this.requestedResource
        clearInterval(sessionChecker)
      }
    }, 3000)
  }

  public render(): JSX.Element {
    this.preload()
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col className="text-center">
            <Error403Icon />
            <div className="my-5"></div>
            <h1><b>Forbidden Access</b></h1>
            <h5><br />You do not have enough permissions to access to this resource</h5>
            {
              !AccountProvider.isAuthenticated()
                ? <p><br />Are you already logged? If not, <Link to={ RoutesMap.signIn.path }>sign in</Link> to access to your account</p>
                : ''
            }
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>,
      'non-empty'
    )
  }
}
