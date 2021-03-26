import { Component, ChangeEvent, FormEvent } from 'react'
import Grid from '../../helpers/grid.helper'
import Form from 'react-bootstrap/Form'
import CommonProvider from '../../providers/common.provider'
import RecaptchaDisclaimer from '../common/recaptcha-disclaimer'
import SubmitButton from '../common/submit-button'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { ContactFormFields, ContactForm as ContactUsBody, ContactFormMessage, EmptyProps, FormState, SecuredFormState } from '../../types'
import { getControlValidationState } from '../../helpers/form.helper'
import ContactProvider from '../../providers/contact.provider'
import '../../styles/form.sass'

export default class ContactForm extends Component<EmptyProps, ContactFormMessage & ContactFormFields & FormState & SecuredFormState> {
  private readonly _defaultTextAreaHeight = 48
  private readonly _messageMinLength = 10
  private readonly _messageMaxLength = 1500
  private readonly _placeholders = {
    name: 'John Doe',
    email: 'my@email.world',
    message: 'I want to ask for...'
  }
  private _messageCharacterCounter = 0
  private _recaptchaToken!: string

  constructor(
    props: never
  ) {
    super(props)
    this.state = this.initState()
  }

  private initState(): ContactFormMessage & ContactFormFields & FormState & SecuredFormState {
    return {
      isFormValid: false,
      isSubmitting: false,
      isRecaptchaTokenValidated: false,
      fieldHeight: this._defaultTextAreaHeight,
      contactName: {
        required: true,
        value: undefined
      },
      contactEmail: {
        required: true,
        value: undefined
      },
      contactMessage: {
        required: true,
        value: undefined
      }
    } as ContactFormMessage & ContactFormFields & FormState & SecuredFormState
  }

  private capitalizeName(event: ChangeEvent): void {
    if (event.isTrusted) {
      const input = event.target as HTMLInputElement
      input.value = input.value
        ? CommonFunctions.capitalize(input.value, 'full')
        : ''
    }
  }

  private updateStateFromInput(inputElement: HTMLInputElement): void {
    const isTextBox = (input = inputElement) => {
      return input.type === 'text' || input.type === 'email'
    }
    this.setState(
      Object.assign(
        this.state,
        {
          [inputElement.id]: Object.assign(
            (this.state as ContactFormFields)[inputElement.id as keyof ContactFormFields],
            {
              value: isTextBox()
                ? inputElement.value
                : inputElement.checked
            }
          )
        }
      )
    )
  }

  private checkFieldsValidity(): void {
    let valid = true
    for (const fieldId in this.state) {
      if (valid) {
        const fieldData = (this.state as ContactFormFields)[fieldId as keyof ContactFormFields]
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

  private handleMessageInputHeight(event: ChangeEvent): void {
    this.setState((prevState) => Object.assign(
      prevState,
      {
        fieldHeight: !(event.target as HTMLTextAreaElement).value
          ? this._defaultTextAreaHeight
          : (
            event.target.scrollHeight < this._defaultTextAreaHeight
              ? this.state.fieldHeight
              : event.target.scrollHeight
          )
      }
    ))
  }

  private updateRecaptchaToken(token: string): void {
    this._recaptchaToken = token    
  }

  private async validateRecaptchaToken(): Promise<void> {
    const result = await CommonProvider.validateRecaptchaToken(this._recaptchaToken)
    this.setState({
      ...this.state,
      isRecaptchaTokenValidated: result?.value?.valid
    })
  }

  private handleMessageTyping(event: ChangeEvent): void {
    if (event.isTrusted) {
      const input = event.target as HTMLTextAreaElement
      this._messageCharacterCounter = input.value.length
      input.value = input.value
        ? input.value[0].toLocaleUpperCase() + input.value.substr(1)
        : ''
    }
  }

  private handleFormChange(event: ChangeEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.updateStateFromInput(event.target)
      this.checkFieldsValidity()
    }
  }

  private async handleFormSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!event.isTrusted) return

    await this.validateRecaptchaToken()
    if (!this.state.isRecaptchaTokenValidated) return

    const contactForm: ContactUsBody = {
      completeName: this.state.contactName.value as string,
      email: this.state.contactEmail.value as string,
      message: this.state.contactMessage.value as string
    }

    ContactProvider.sendMessage(contactForm).then((response) => {
      if (response) {
        console.log(response)
      }
    }).finally(() => {
      this.setState({
        ...this.state,
        isSubmitting: false
      })
    })
  }

  public render(): JSX.Element {
    return (
      <Grid.Container className="mb-5">
        <Grid.Row>
          <Grid.Col>
            <Form name="contactForm" onSubmit={ (event) => { this.handleFormSubmit(event) } }>
              <GoogleReCaptcha onVerify={ (token) => { this.updateRecaptchaToken(token) } } />
              <Form.Group controlId="contactName">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={ (event) => { this.capitalizeName(event); this.handleFormChange(event) } }
                  placeholder={ this._placeholders.name }
                  required={ this.state.contactName.required } />
              </Form.Group>
              <Form.Group controlId="contactEmail">
                <Form.Label>Your email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={ (event) => { this.handleFormChange(event) } }
                  placeholder={ this._placeholders.email }
                  required={ this.state.contactEmail.required } />
                <Form.Text className="text-muted">
                  We know your privacy is important, we will never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="contactMessage">
                <Form.Label>Type your message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={ 3 }
                  style={{ height: Math.floor(this.state.fieldHeight) }}
                  minLength={ this._messageMinLength }
                  maxLength={ this._messageMaxLength }
                  onChange={ (event) => { this.handleMessageTyping(event); this.handleMessageInputHeight(event); this.handleFormChange(event) } }
                  placeholder={ this._placeholders.message }
                  required={ this.state.contactMessage.required } />
                <Form.Text>
                  { this._messageCharacterCounter + `/${this._messageMaxLength}` }
                </Form.Text>
              </Form.Group>
              <SubmitButton
                variant="dark"
                disableIf={ !this.state.isFormValid }
                isSubmitting={ this.state.isSubmitting }
                buttonText={ 'Send' } />
              <div className="py-2" />
              <Grid.Row>
                <Grid.Col>
                  <RecaptchaDisclaimer />
                </Grid.Col>
              </Grid.Row>
            </Form>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
