import { Component } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'
import SignUpForm from '../include/sign-up-form'
import '../../styles/sign-up.sass'

export default class SignUp extends Component {
  public componentDidMount(): void {
    CommonFunctions.updatePathTitle('Create Account')
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  public render(): JSX.Element {
    return RouterOutline.set(
      <Grid.Container fluid className="h-100">
        <Grid.Row className="sign-up-background">
          <Grid.Container>
            <Grid.Row className="align-items-center flex-lg-wrap d-lg-flex inner-wrapper">
              <Grid.Col xs="12" lg className="page-title d-none d-lg-block">
                <h1 className="font-weight-bolder">
                  Handle your service integrations, logistical workflow and warehousing procedures in one place
                </h1>
              </Grid.Col>
              <Grid.Col xs="12" lg className="sign-up-form">
                <SignUpForm />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
