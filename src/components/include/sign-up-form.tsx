import { Component, ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CommonProvider from '../../providers/common.provider'
import RecaptchaDisclaimer from '../common/recaptcha-disclaimer'
import RoutesMap from '../../helpers/routes-map.helper'
import Grid from '../../helpers/grid.helper'
import SubmitButton from '../common/submit-button'
import PasswordField from '../common/password-field'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Link } from 'react-router-dom'
import { getControlValidationState, handleW2WAPIResponse } from '../../helpers/form.helper'
import { EmptyProps, FormState, SecuredFormState, SignUpFormFields, SignUpInit } from '../../types'
import { LinkContainer } from 'react-router-bootstrap'
import { CommonFunctions, Default, PasswordStatus } from '../../helpers/common-functions.helper'
import AccountProvider from '../../providers/account.provider'
import Swal from 'sweetalert2'
import '../../styles/form.sass'

type SignUpInitState = {
  passwordMatching: boolean,
  passwordSecurityLevel?: PasswordStatus
}

export default class SignUpForm extends Component<EmptyProps, SignUpFormFields & SignUpInitState & FormState & SecuredFormState> {

  private _recaptchaToken!: string

  constructor(
    props: never
  ) {
    super(props)
    this.state = this.initState()
  }

  private initState(): SignUpFormFields & SignUpInitState & FormState & SecuredFormState {
    return {
      isFormValid: false,
      isSubmitting: false,
      isRecaptchaTokenValidated: false,
      passwordMatching: true,
      signUpUserId: {
        required: true,
        value: undefined
      },
      signUpPassword: {
        required: true,
        value: undefined
      },
      signUpConfirmPassword: {
        required: true,
        value: undefined
      },
      signUpTerms: {
        required: true,
        value: undefined
      },
    } as SignUpFormFields & SignUpInitState & FormState & SecuredFormState
  }

  private updateStateFromInput(inputElement: HTMLInputElement): void {
    this.setState(Object.assign(
      this.state,
      {
        [inputElement.id]: Object.assign(
          (this.state as SignUpFormFields)[inputElement.id as keyof SignUpFormFields],
          { value: CommonFunctions.isTextBox(inputElement) ? inputElement.value : inputElement.checked }
        )
      }
    ))
  }

  private checkPasswordSecurity(event: KeyboardEvent<HTMLInputElement> | FormEvent<HTMLInputElement>): void {
    this.handleFormChange(event)
    if (event.isTrusted) {
      this.setState({
        ...this.state,
        passwordSecurityLevel: CommonFunctions.checkPasswordSecurity(this.state.signUpPassword.value ?? '')
      }, () => {
        if (this.state.signUpConfirmPassword.value) {
          this.checkPasswordMatching(event, true)
        }
      })
    }
  }

  private checkPasswordMatching(event: KeyboardEvent<HTMLInputElement> | FormEvent<HTMLInputElement>, noUpdate = false): void {
    if (!noUpdate) this.handleFormChange(event)
    if (event.isTrusted) {
      this.setState({
        ...this.state,
        passwordMatching: this.state.signUpConfirmPassword.value === this.state.signUpPassword.value
      })
    }
  }

  private checkFieldsValidity(): void {
    let valid = true
    for (const fieldId in this.state) {
      if (valid) {
        const fieldData = (this.state as SignUpFormFields)[fieldId as keyof SignUpFormFields]
        valid = getControlValidationState(fieldData)
      } else {
        break
      }
    }
    this.setState({
      ...this.state,
      isFormValid: valid
    })
  }

  private handleFormChange(event: ChangeEvent | FormEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>): void {
    if (event.target instanceof HTMLInputElement) {
      this.updateStateFromInput(event.target)
      this.checkFieldsValidity()
    }
  }

  private async validateRecaptchaToken(): Promise<void> {
    const result = await CommonProvider.validateRecaptchaToken(this._recaptchaToken)
    this.setState({
      ...this.state,
      isRecaptchaTokenValidated: result?.value?.valid
    })
  }

  private updateRecaptchaToken(token: string): void {
    this._recaptchaToken = token    
  }

  private async handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!event.isTrusted) return

    await this.validateRecaptchaToken()
    if (!this.state.isRecaptchaTokenValidated) return

    const signUpInitData: SignUpInit = {
      email: CommonFunctions.Base64.encode(this.state.signUpUserId.value as string),
      userId: CommonFunctions.Base64.encode(this.state.signUpUserId.value as string),
      password: CommonFunctions.SHA512.create(this.state.signUpPassword.value as string),
      terms: this.state.signUpTerms.value as boolean
    }
    this.setState({
      ...this.state,
      isSubmitting: true
    }, () => {
      AccountProvider.signUpInit(signUpInitData).then((response) => {
        if (!handleW2WAPIResponse(response)) {
          if (response.value.status === 'OK' && this.state.signUpUserId.value) {
            Swal.fire({
              icon: 'success',
              title: `We sent an email. Please check the ${this.state.signUpUserId.value} inbox`,
              text: 'This process is necessary to continue the registration process'
            })
          }
        }
      }).finally(() => {
        this.setState({
          ...this.state,
          isSubmitting: false
        })
      })
    })
  }

  public render(): JSX.Element {
    return (
      <Form className="text-center text-lg-left" onSubmit={ (event) => { this.handleSubmit(event) } }>
        <GoogleReCaptcha
          action={ 'signupinit' }
          onVerify={ (token) => { this.updateRecaptchaToken(token) } }/>
        <Form.Group>
          <h2 className="font-weight-bold">
            All W2W in one account
          </h2>
          <small className="text-muted">Use a <b>single account</b> to access to all We To World applications.</small>
        </Form.Group>
        <div className="py-3" />
        <Form.Group controlId="signUpUserId">
          <Form.Label>Please specify an email to start</Form.Label>
          <Form.Control
            type="email"
            placeholder={ 'example@email.world' }
            autoComplete={ 'new-password' }
            required={ this.state.signUpUserId.required }
            onChange={ (event) => { this.handleFormChange(event) } } />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="signUpPassword">
            Set a password
          </Form.Label>
          <PasswordField
            id="signUpPassword"
            autoComplete={ 'off' }
            autoFocus={ false }
            required={ this.state.signUpPassword.required }
            onInput={ (event: FormEvent<HTMLInputElement>) => { this.checkPasswordSecurity(event) } } />
          <Form.Text>
            {
              this.state.signUpPassword.value && this.state.passwordSecurityLevel
                ? this.state.passwordSecurityLevel === PasswordStatus.invalid
                  ? <span className="text-danger">The password length must be greater than { Default.INPUT_MIN_LENGTH } characters</span>
                  : this.state.passwordSecurityLevel === PasswordStatus.weak
                    ? <span className="text-warning">Weak password</span>
                    : this.state.passwordSecurityLevel === PasswordStatus.enough
                      ? <span>The password looks good</span>
                      : <span className="text-success">The password is secure</span>
                : null
            }
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="signUpConfirmPassword">
            Confirm your password
          </Form.Label>
          <PasswordField
            id="signUpConfirmPassword"
            autoComplete={ 'off' }
            required={ this.state.signUpConfirmPassword.required }
            disabled={ !this.state.signUpPassword.value }
            onInput={ (event: FormEvent<HTMLInputElement>) => { this.checkPasswordMatching(event) } } />
          <Form.Text>
            {
              this.state.signUpPassword.value && !this.state.passwordMatching
                ? <span className="text-muted">The passwords must be equals</span>
                : null
            }
          </Form.Text>
        </Form.Group>
        <div className="py-2" />
        <Grid.Row className="my-2">
          <Grid.Col className="text-center">
            <Form.Switch id="signUpTerms">
              <Form.Switch.Input
                required={ this.state.signUpTerms.required }
                onChange={ (event: ChangeEvent) => { this.handleFormChange(event) } } />
              <Form.Switch.Label>
                I accept the service&nbsp;
                <Link to={ RoutesMap.termsOfService.path } target="_blank">
                    terms and conditions
                </Link>
                &nbsp;and the&nbsp;
                <Link to={ RoutesMap.privacyPolicy.path } target="_blank">
                  privacy policy
                </Link>
              </Form.Switch.Label>
            </Form.Switch>
          </Grid.Col>
        </Grid.Row>
        <div className="py-2" />
        <Grid.Row className="justify-content-center my-2">
          <Grid.Col xs="12" lg="6">
            <SubmitButton
              block
              variant="warning"
              disableIf={ !this.state.isFormValid || !this.state.passwordMatching }
              isSubmitting={ this.state.isSubmitting }
              buttonText={ 'Submit' } />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="justify-content-center my-2">
          <Grid.Col xs="12" lg="6">
            <LinkContainer to={ RoutesMap.signIn.path }>
              <Button variant="outline-dark" block>
                I already have an account
              </Button>
            </LinkContainer>
          </Grid.Col>
        </Grid.Row>
        <div className="py-2" />
        <Grid.Row>
          <Grid.Col>
            <RecaptchaDisclaimer />
          </Grid.Col>
        </Grid.Row>
      </Form>
    )
  }
}
