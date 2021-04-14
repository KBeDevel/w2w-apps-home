import { Component } from 'react'
import Grid from '../../helpers/grid.helper'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import RouterOutline from '../../helpers/router.helper'
import SignInForm from '../include/sign-in-form'
import '../../styles/sign-in.sass'

export default class SignIn extends Component {
  public componentDidMount(): void {
    CommonFunctions.updatePathTitle('Sign In')
  }

  public render(): JSX.Element {
    return RouterOutline.set(
      <Grid.Container fluid>
        <Grid.Row className="sign-in-background">
          <Grid.Container>
            <Grid.Row className="justify-content-center">
              <Grid.Col xs="12" lg="6" className="sign-in-form">
                <SignInForm />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
