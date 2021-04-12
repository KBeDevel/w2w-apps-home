import { Component, ChangeEvent, FormEvent } from 'react'
import Grid from '../../helpers/grid.helper'
import Form from 'react-bootstrap/Form'
import CommonProvider from '../../providers/common.provider'
import RecaptchaDisclaimer from '../common/recaptcha-disclaimer'
import SubmitButton from '../common/submit-button'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { ContactFormFields, ContactForm as ContactUsBody, ContactFormMessage, EmptyProps, FormState, SecuredFormState } from '../../types'
import { getControlValidationState, handleW2WAPIResponse } from '../../helpers/form.helper'
import ProfileProvider from '../../providers/profile.provider'
import Swal from 'sweetalert2'
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

  public componentDidMount(): void {
    ProfileProvider.getUserProfile().then((response) => {
      if (response?.value?.representative) {
        this.setState({
          ...this.state,
          contactName: {
            ...this.state.contactName,
            value: `${response.value.representative.firstName} ${response.value.representative.lastName}`
          },
          contactEmail: {
            ...this.state.contactEmail,
            value: response.value.representative.contactData.email
          }
        })
      }
    })
  }

  private initState(): ContactFormMessage & ContactFormFields & FormState & SecuredFormState {
    return {
      isFormValid: false,
      isSubmitting: false,
      isRecaptchaTokenValidated: false,
      fieldHeight: this._defaultTextAreaHeight,
      contactName: {
        required: true,
        value: ''
      },
      contactEmail: {
        required: true,
        value: ''
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
    this.setState({
      ...this.state,
      [inputElement.id]: {
        ...(this.state as ContactFormFields)[inputElement.id as keyof ContactFormFields],
        value: CommonFunctions.isTextBox(inputElement)
          ? inputElement.value
          : inputElement.checked
      }
    }, () => {
      this.checkFieldsValidity()
    })
  }

  private checkFieldsValidity(): void {
    let valid = true
    for (const fieldId in this.state) {
      if (!valid) break
      const fieldData = (this.state as ContactFormFields)[fieldId as keyof ContactFormFields]
      console.log(fieldData)
      valid = getControlValidationState(fieldData)
    }
    this.setState({
      ...this.state,
      isFormValid: valid
    })
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

  private handleFormChange(event: ChangeEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.updateStateFromInput(event.target)
    }
  }

  private handleMessageTyping(event: ChangeEvent): void {
    if (event.isTrusted) {
      const input = event.target as HTMLTextAreaElement
      this._messageCharacterCounter = input.value.length
      this.setState({
        ...this.state,
        contactMessage: {
          ...this.state.contactMessage,
          value: CommonFunctions.capitalize(input.value, 'simple')
        },
        fieldHeight: !(event.target as HTMLTextAreaElement).value
          ? this._defaultTextAreaHeight
          : (
            event.target.scrollHeight < this._defaultTextAreaHeight
              ? this.state.fieldHeight
              : event.target.scrollHeight
          )
      })
    }
  }

  private async handleFormSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!event.isTrusted) return

    await this.validateRecaptchaToken()
    if (!this.state.isRecaptchaTokenValidated) return

    const contactForm: ContactUsBody = {
      senderName: this.state.contactName.value as string,
      senderEmail: this.state.contactEmail.value as string,
      message: this.state.contactMessage.value as string
    }

    ContactProvider.sendMessage(contactForm).then((response) => {
      if (!response) return
      if (handleW2WAPIResponse(response)) {
        if (response.value.sent) {
          Swal.fire({
            icon: 'success',
            title: 'Message sent'
          })
        }
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
              <GoogleReCaptcha action={ 'contact' } onVerify={ (token) => { this.updateRecaptchaToken(token) } } />
              <Form.Group controlId="contactName">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  type="text"
                  value={ this.state.contactName.value }
                  onChange={ (event) => { this.capitalizeName(event); this.handleFormChange(event) } }
                  placeholder={ this._placeholders.name }
                  required={ this.state.contactName.required } />
              </Form.Group>
              <Form.Group controlId="contactEmail">
                <Form.Label>Your email</Form.Label>
                <Form.Control
                  type="email"
                  value={ this.state.contactEmail.value }
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
                  value={ this.state.contactMessage.value }
                  style={{ height: Math.floor(this.state.fieldHeight) }}
                  minLength={ this._messageMinLength }
                  maxLength={ this._messageMaxLength }
                  onChange={ (event) => { this.handleFormChange(event), this.handleMessageTyping(event) } }
                  placeholder={ this._placeholders.message }
                  required={ this.state.contactMessage.required } />
                <Form.Text>
                  { this._messageCharacterCounter + `/${this._messageMaxLength}` }
                </Form.Text>
              </Form.Group>
              <SubmitButton
                variant="dark"
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
