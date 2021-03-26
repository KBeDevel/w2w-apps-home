import { Component } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import RouterOutline, { RouterComponent } from '../../helpers/router.helper'
import Grid from '../../helpers/grid.helper'

import Error404Icon from '-!react-svg-loader!../../assets/svg/error-404.svg'

export default class NotFound extends Component implements RouterComponent {
  public preload(): void {
    CommonFunctions.updatePathTitle('Error 404 - Resource Not Found')
  }

  public render(): JSX.Element {
    this.preload()
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col className="text-center">
            <Error404Icon />
            <div className="my-5"></div>
            <h1><b>Oops, resource not found</b></h1>
            <h5>The requested resource is incorrect or is under maintenance</h5>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>,
      'non-empty'
    )
  }
}
