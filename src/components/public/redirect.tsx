import { Component } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

type RedirectRouteParams = {
  match: {
    params: {
      destinationHash: string
    }
  }
}

export default class Redirector extends Component<RedirectRouteParams> {

  private _destinationHash = this.props.match.params.destinationHash
  public destinationUrl: string | undefined = undefined
  public message = 'Redirecting'

  public componentDidMount(): void {
    try {
      // Validate destination url
      const destination = CommonFunctions.Base64.decode(this._destinationHash)
      if (destination.startsWith('http') || !destination.startsWith('/')) {
        this.message = 'Redirecting To External Resource'
      }
      CommonFunctions.updatePathTitle(this.destinationUrl ? this.message : 'An error ocurred while redirecting')
      this.destinationUrl = destination
    } catch (reason) {
      console.error(reason)
      this.destinationUrl = undefined
    }
    setTimeout(() => {
      if (this.destinationUrl) window.location.href = this.destinationUrl
    }, 1500)
  }

  public render(): JSX.Element {
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col className="text-center">
            <h1 className="font-weight-bold">
              { this.destinationUrl ? this.message : '' }
            </h1>
            <h5 className="font-weight-light">
              { this.destinationUrl ? 'URL: ' + this.destinationUrl : 'Oops, the url provided seems to be broken or is not available at this moment' }
            </h5>
            { this.destinationUrl
              ? (
                <h2>
                  <br />
                  <FontAwesomeIcon icon={ faSyncAlt } spin />
                </h2>
              )
              : <></>
            }
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>,
      'non-empty'
    )
  }
}
