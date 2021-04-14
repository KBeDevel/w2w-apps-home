import { Component } from 'react'
import Grid from '../../helpers/grid.helper'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import RouterOutline from '../../helpers/router.helper'
import FinishSignUpForm from '../include/finish-sign-up-form'
import AccountProvider from '../../providers/account.provider'
import Error403Icon from '-!react-svg-loader!../../assets/svg/error-403.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import '../../styles/finish-sign-up.sass'

type FinishSignUpProps = {
  match: {
    params: {
      token: string
    }
  }
}

type FinishSignUpState = {
  isValidatingToken: boolean,
  isTokenValidated: boolean
}

export default class FinishSignUp extends Component<FinishSignUpProps, FinishSignUpState> {
  private signUpToken!: string

  constructor(
    props: FinishSignUpProps
  ) {
    super(props)
    this.state = {
      isValidatingToken: true,
      isTokenValidated: false
    }
    const { token } = this.props.match.params
    this.signUpToken = token
  }

  private verifySignUpToken(): void {
    const { token } = this.props.match.params
    AccountProvider.validateSignUpToken(token as string).then((response) => {
      this.setState({
        ...this.state,
        isTokenValidated: response?.value?.valid,
        isValidatingToken: false
      })
    })
  }

  public componentDidMount(): void {
    CommonFunctions.updatePathTitle('Finish Your Sign Up')
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  public render(): JSX.Element {
    if (this.state.isValidatingToken) {
      this.verifySignUpToken()
    }
    return RouterOutline.set(
      <>
        {
          !this.state.isValidatingToken
            ? <Grid.Container fluid className="h-100">
              {
                this.state.isTokenValidated
                  ? <Grid.Row className="finish-sign-up-background">
                    <Grid.Container>
                      <Grid.Row className="align-items-center flex-lg-wrap d-lg-flex">
                        <Grid.Col xs="12" lg className="finish-sign-up-form">
                          <FinishSignUpForm signUpToken={ this.signUpToken } />
                        </Grid.Col>
                      </Grid.Row>
                    </Grid.Container>
                  </Grid.Row>
                  : <Grid.Row className="my-5">
                    <Grid.Col className="text-center">
                      <Error403Icon />
                      <h1 className="mt-4">The provided link has expired or is not valid</h1>
                      <p>If you think this is an error, please contact us</p>
                      <p>Your ID is <span className="text-danger">{ this.signUpToken }</span></p>
                    </Grid.Col>
                  </Grid.Row>
              }
            </Grid.Container>
            : <Grid.Container>
              <Grid.Row>
                <Grid.Col className="text-center my-5 py-5">
                  <FontAwesomeIcon icon={ faCircleNotch } spin={ true } size={ '3x' } />
                  <h1 className="mt-4">Verifying Sign Up Request</h1>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
        }
      </>
    )
  }
}
