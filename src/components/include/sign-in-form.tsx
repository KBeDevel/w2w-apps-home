import { Component, ChangeEvent, FormEvent } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Grid from '../../helpers/grid.helper'
import RecaptchaDisclaimer from '../common/recaptcha-disclaimer'
import RoutesMap from '../../helpers/routes-map.helper'
import SubmitButton from '../common/submit-button'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Credentials, EmptyProps, FormState, SecuredFormState, SignInFormFields } from '../../types'
import { getControlValidationState } from '../../helpers/form.helper'
import { LinkContainer } from 'react-router-bootstrap'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import AccountProvider from '../../providers/account.provider'
import '../../styles/form.sass'

export default class SignInForm extends Component<EmptyProps, SignInFormFields & FormState & SecuredFormState> {

  private _recaptchaToken!: string

  constructor(
    props: never
  ) {
    super(props)
    this.state = {
      signInUserId: {
        required: true,
        value: undefined
      },
      signInPassword: {
        required: true,
        value: undefined
      },
      signInRemember: {
        required: false,
        value: undefined
      },
      isFormValid: false,
      isSubmitting: false,
      isRecaptchaTokenValidated: false
    }
  }

  private updateStateFromInput(inputElement: HTMLInputElement): void {
    const isTextBox = (input = inputElement) => {
      return input.type === 'text' || input.type === 'password' || input.type === 'email'
    }
    this.setState(
      Object.assign(
        this.state,
        {
          [inputElement.id]: Object.assign(
            (this.state as SignInFormFields)[inputElement.id as keyof SignInFormFields],
            { value: isTextBox() ? inputElement.value : inputElement.checked }
          )
        }
      )
    )
  }

  private checkFieldsValidity(): void {
    let valid = true
    for (const fieldId in this.state) {
      if (valid) {
        const fieldData = (this.state as SignInFormFields)[fieldId as keyof SignInFormFields]
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

  private handleFormChange(event: ChangeEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.updateStateFromInput(event.target)
      this.checkFieldsValidity()
    }
  }

  private updateRecaptchaToken(token: string): void {
    this._recaptchaToken = token    
  }

  private async validateRecaptchaToken(): Promise<void> {
    // const result = await CommonProvider.validateRecaptchaToken(this._recaptchaToken)
    this.setState({
      ...this.state,
      isRecaptchaTokenValidated: true
    })
  }

  private async handleFormSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()

    if (!event.isTrusted) return

    // await this.validateRecaptchaToken()
    // if (!this.state.isRecaptchaTokenValidated) return

    const signInData: Credentials = {
      userId: CommonFunctions.Base64.encode(this.state.signInUserId.value as string),
      email: CommonFunctions.Base64.encode(this.state.signInUserId.value as string),
      password: CommonFunctions.SHA512.create(this.state.signInPassword.value as string),
      remember: this.state.signInRemember?.value
    }
    this.setState({
      ...this.state,
      isSubmitting: true
    }, () => {
      AccountProvider.signIn(signInData).then((response) => {
        if (response) {
          window.location.reload()
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
    return <Form id="signInForm" name="signInForm" onSubmit={ (event) => { this.handleFormSubmit(event) } }>
      {
        this.state.isFormValid && !this.state.isRecaptchaTokenValidated
          ? <GoogleReCaptcha action={ 'signin' } onVerify={ (token) => { this.updateRecaptchaToken(token) } } />
          : null
      }
      <Form.Group>
        <h2 className="font-weight-bold">
        Bienvenido de nuevo
        </h2>
        <small className="text-muted">Introduzca sus credenciales para continuar</small>
      </Form.Group>
      <div className="py-3" />
      <Form.Group controlId="signInUserId">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="text"
          required={ this.state.signInUserId.required }
          onChange={ (event) => { this.handleFormChange(event) } } />
      </Form.Group>
      <Form.Group controlId="signInPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          required={ this.state.signInPassword.required }
          onChange={ (event) => { this.handleFormChange(event) } } />
      </Form.Group>
      <div className="py-2" />
      <Grid.Row className="my-2">
        <Grid.Col className="text-center">
          <Form.Switch
            id="signInRemember"
            label="Recuérdame"
            required={ this.state.signInRemember?.required }
            onChange={ (event) => { this.handleFormChange(event) } } />
        </Grid.Col>
      </Grid.Row>
      <div className="py-2" />
      <Grid.Row className="justify-content-center my-2">
        <Grid.Col xs="12" lg="6">
          <SubmitButton
            variant="dark"
            block
            type="submit"
            disableIf={ !this.state.isFormValid }
            isSubmitting={ this.state.isSubmitting }
            buttonText={ 'Iniciar' } />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="justify-content-center my-2">
        <Grid.Col xs="12" lg="6">
          <LinkContainer to={ RoutesMap.signUp.path }>
            <Button variant="warning" block>
              <b>Crear una cuenta</b>
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
  }
}
