import { Component, FormEvent, KeyboardEvent } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Grid from '../../helpers/grid.helper'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import ProvidersHelper from '../../helpers/providers.helper'
import Countries from '../../json/Countries.json'
import Select, { OptionTypeBase } from 'react-select'
import CommonProvider from '../../providers/common.provider'
import PlacesProvider from '../../providers/places.providers'
import SubmitButton from '../common/submit-button'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { ALLOWED_COUNTRIES } from '../../helpers/country.helper'
import { CountrySelectedState, FinishSignUpFormState, FormState, SecuredFormState, SelectOption, SignUpFinish } from '../../types'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import { defaultSelectStyles, controlNumberInput, employeesQuantityRange, getControlRef, handleW2WAPIResponse } from '../../helpers/form.helper'
import { loadingIndicatorPatch, showPoweredByGoogleHelper } from '../../helpers/places-autocomplete.helper'
import AccountProvider from '../../providers/account.provider'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import '../../styles/form.sass'
import 'react-datepicker/dist/react-datepicker.css'

type FinishSignUpFormProps = {
  signUpToken?: string
}

export default class FinishSignUpForm extends Component<FinishSignUpFormProps, FinishSignUpFormState & CountrySelectedState & FormState & SecuredFormState> {

  private readonly _employeesQuantityOptions: SelectOption[] = employeesQuantityRange
  private _allowedCountriesOptions: SelectOption[] = []
  private _allowedPhonesPrefixesOptions: SelectOption[] = []
  private _allowedJuridicIDsOptions: SelectOption[] = []
  private _allowedNonJuridicIDsOptions: SelectOption[] = []
  private _recaptchaToken!: string

  public formData: SignUpFinish | undefined = undefined

  constructor(
    props: FinishSignUpFormProps
  ) {
    super(props)
    this.state = this.initialState()
    this.getAllowedCountries()
  }

  private initialState(): FinishSignUpFormState & CountrySelectedState & FormState & SecuredFormState {
    return {
      isSubmitting: false,
      isFormValid: false,
      isRecaptchaTokenValidated: false,
      country: undefined,
      finishSignUpOrganizationName: { required: true, value: '' },
      finishSignUpOrganizationSocialReason: { required: false, value: '' },
      finishSignUpOrganizationEmployeesQuantityRange: { required: false, value: '' },
      finishSignUpOrganizationOpeningDate: { required: false, value: '' },
      finishSignUpOrganizationAnualSales: { required: false, value: NaN },
      finishSignUpOrganizationTaxId: { required: true, value: '' },
      finishSignUpOrganizationTaxIdType: { required: true, value: '' },
      finishSignUpRepresentativeFirstName: { required: true, value: '' },
      finishSignUpRepresentativeLastName: { required: true, value: '' },
      finishSignUpRepresentativeCorporativePosition: { required: true, value: '' },
      finishSignUpRepresentativeTaxId: { required: true, value: '' },
      finishSignUpRepresentativeTaxIdType: { required: true, value: '' },
      finishSignUpRepresentativeEmail: { required: true, value: '' },
      finishSignUpRepresentativePhone: { required: false, value: '' },
      finishSignUpRepresentativePhonePrefix: { required: false, value: '' },
      finishSignUpBillingAddressStreetName: {
        required: true,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressStreetName')
      },
      finishSignUpBillingAddressStreetNumber: {
        required: true,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressStreetNumber')
      },
      finishSignUpBillingAddressDoor: {
        required: false,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressDoor')
      },
      finishSignUpBillingAddressComplement: {
        required: false,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressComplement')
      },
      finishSignUpBillingAddressNeighborhood: {
        required: false,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressNeighborhood')
      },
      finishSignUpBillingAddressCity: {
        required: true,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressCity')
      },
      finishSignUpBillingAddressState: {
        required: true,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressState')
      },
      finishSignUpBillingAddressPostalCode: {
        required: true,
        value: '',
        controlRef: getControlRef('finishSignUpBillingAddressPostalCode')
      },
      finishSignUpBillingAddressCountryName: { required: true, value: '' },
    } as (FinishSignUpFormState & CountrySelectedState & FormState & SecuredFormState)
  }

  private getAllowedCountries(): void {
    this._allowedCountriesOptions = Countries.filter(
      country => ALLOWED_COUNTRIES.includes(country.twoDigitCode)
    ).map(
      (country) => {
        return { label: `${country.flag}  ${country.name}`, value: country.twoDigitCode }
      }
    )
  }

  private getAllowedCountriesPhoneCodes(newCountry: string): void {
    this._allowedPhonesPrefixesOptions = Countries.filter(
      country => country.twoDigitCode === newCountry
    ).map((country) => {
      return { label: `${country.flag} +${country.phoneCode}`, value: `+${country.phoneCode}` }
    })
  }

  private getJuridicTaxIdTypes(countryCode: string): void {
    this._allowedJuridicIDsOptions = this.getCurrentSelectedCountry(countryCode)?.identification?.types.filter(
      type => type.isJuridic
    ).map((type) => {
      return { label: type.value, value: type.value, helper: type.realName, description: type.description }
    }) ?? []
  }

  private getNonJuridicTaxIdTypes(countryCode: string): void {
    this._allowedNonJuridicIDsOptions = this.getCurrentSelectedCountry(countryCode)?.identification?.types.filter(
      type => !type.isJuridic
    ).map((type) => {
      return { label: type.value, value: type.value, helper: type.realName, description: type.description }
    }) ?? []
  }

  private getCurrentSelectedCountry(countryCode: string) {
    return Countries.find(
      country => country.twoDigitCode === countryCode
    )
  }

  private updateSelectedCountry(newValue: string): void {
    this.getAllowedCountriesPhoneCodes(newValue)
    this.getJuridicTaxIdTypes(newValue)
    this.getNonJuridicTaxIdTypes(newValue)
    this.setState({
      ...this.state,
      country: newValue,
      finishSignUpOrganizationTaxIdType: {
        ...this.state.finishSignUpOrganizationTaxIdType,
        value: this._allowedJuridicIDsOptions[0].value
      },
      finishSignUpBillingAddressCountryName: {
        ...this.state.finishSignUpBillingAddressCountryName,
        value: this.getCurrentSelectedCountry(newValue)?.name
      },
      finishSignUpRepresentativeTaxIdType: {
        ...this.state.finishSignUpRepresentativeTaxIdType,
        value: this._allowedNonJuridicIDsOptions[0].value
      },
      finishSignUpRepresentativePhonePrefix: {
        ...this.state.finishSignUpRepresentativePhonePrefix,
        value: this._allowedPhonesPrefixesOptions[0].value
      },
    })
  }

  private updateBillingAddressFragment(input: HTMLInputElement): void {
    this.setState({
      ...this.state,
      [input.id]: {
        ...(this.state as FinishSignUpFormState)[input.id as keyof FinishSignUpFormState],
        value: input.value
      }
    })
  }

  private async updateAddress(addressSearchResult: OptionTypeBase | null): Promise<void> {
    const auxProvider = new PlacesProvider()
    const componentsTemplate = auxProvider.rawAddress
    if (!addressSearchResult?.value.place_id) return
    const place = await PlacesProvider.getDetailsByPlaceId(addressSearchResult?.value.place_id)
    if (place.address_components) {
      for (const component of place.address_components) {
        const key = component.types[0]
        if (componentsTemplate[key]) {
          componentsTemplate[key].value = component[componentsTemplate[key].tag]
        }
      }
    }
    const autocompleteFieldsMap: { [name: string]: string} = {
      finishSignUpBillingAddressStreetName: componentsTemplate.route.value ?? '',
      finishSignUpBillingAddressStreetNumber: componentsTemplate.street_number.value ?? '',
      finishSignUpBillingAddressNeighborhood: componentsTemplate.sublocality_level_1.value ?? '',
      finishSignUpBillingAddressCity: componentsTemplate.locality.value ?? componentsTemplate.administrative_area_level_2.value ?? '',
      finishSignUpBillingAddressState: componentsTemplate.administrative_area_level_1.value ?? '',
      finishSignUpBillingAddressPostalCode: componentsTemplate.postal_code.value ?? '',
    }
    for (const inputName in autocompleteFieldsMap) {
      const stateField = (this.state as FinishSignUpFormState)[inputName as keyof FinishSignUpFormState]
      this.setState((prevState) => ({
        ...prevState,
        [inputName]: {
          ...(prevState as FinishSignUpFormState)[inputName as keyof FinishSignUpFormState],
          value: autocompleteFieldsMap[inputName]
        }
      }), () => {
        if (stateField.controlRef) {
          stateField.controlRef.value = autocompleteFieldsMap[inputName] ?? ''
        }
      })
    }
  }

  private handleFormState(event: FormEvent): void {
    try {
      this.setState({
        ...this.state,
        isFormValid: true
      }, () => {
        const currentElement = event.target
        if (currentElement instanceof HTMLInputElement) {
          const ref = (this.state as FinishSignUpFormState)[currentElement.id as keyof FinishSignUpFormState]
          if (ref) {
            this.setState({
              ...this.state,
              [currentElement.id]: {
                ...ref,
                value: CommonFunctions.isTextBox(currentElement) ? currentElement.value : currentElement.checked
              }
            }, () => {
              this.setState({
                ...this.state,
                isFormValid: ref.required ? ref.value !== undefined : true
              })
            })          
          }
        }
      })
    } catch (reason) {
      console.error(reason)
    }
  }

  private async handleFormSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()

    if (!event.isTrusted) return

    await this.validateRecaptchaToken()
    if (!this.state.isRecaptchaTokenValidated) return

    const submitBody: SignUpFinish = {
      organization: {
        name: this.state.finishSignUpOrganizationName.value as string,
        identification: {
          type: this.state.finishSignUpOrganizationTaxIdType.value as string,
          number: this.state.finishSignUpOrganizationTaxId.value as string
        },
        socialReason: this.state.finishSignUpOrganizationSocialReason.value,
        employeesQuantity: this.state.finishSignUpOrganizationEmployeesQuantityRange.value,
        openingDate: this.state.finishSignUpOrganizationOpeningDate.value,
        anualSales: this.state.finishSignUpOrganizationAnualSales.value
          ? {
            amount: this.state.finishSignUpOrganizationAnualSales.value,
            currency: 'USD'
          }
          : undefined,
        billingAddress: {
          street: {
            name: this.state.finishSignUpBillingAddressStreetName.value as string,
            number: this.state.finishSignUpBillingAddressStreetNumber.value as string,
          },
          door: this.state.finishSignUpBillingAddressDoor.value,
          complement: this.state.finishSignUpBillingAddressComplement.value,
          neighborhood: this.state.finishSignUpBillingAddressNeighborhood.value,
          city: this.state.finishSignUpBillingAddressCity.value as string,
          state: this.state.finishSignUpBillingAddressState.value as string,
          postalCode: this.state.finishSignUpBillingAddressPostalCode.value,
          country: {
            name: this.getCurrentSelectedCountry(this.state.country as string)?.name as string,
            code: {
              alpha2: this.state.country as string,
            }
          }
        }
      },
      representative: {
        firstName: this.state.finishSignUpRepresentativeFirstName.value as string,
        lastName: this.state.finishSignUpRepresentativeLastName.value as string,
        identification: {
          type: this.state.finishSignUpRepresentativeTaxIdType.value as string,
          number: this.state.finishSignUpRepresentativeTaxId.value as string
        },
        contactData: {
          email: this.state.finishSignUpRepresentativeEmail.value as string,
          phone: this.state.finishSignUpRepresentativePhone.value
            ? {
              code: this.state.finishSignUpRepresentativePhonePrefix.value as string,
              number: this.state.finishSignUpRepresentativePhone.value as string
            }
            : undefined
        }
      }
    }
    this.setState({
      ...this.state,
      isSubmitting: true
    }, () => {
      AccountProvider.signUpFinish(submitBody, this.props.signUpToken).then(
        (response) => {
          if (!handleW2WAPIResponse(response)) return
          const authData = response.value
          const success = AccountProvider.setSessionData(authData)
          if (!success) {
            Swal.fire({
              icon: 'error',
              title: 'Unexpected error',
              text: 'Please try again later'
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Successful Sign Up',
            }).then(() => {
              window.location.reload()
            })
          }
        }
      ).catch(
        (errorReason) => {
          console.error(errorReason)
        }
      ).finally(() => {
        this.setState({
          ...this.state,
          isSubmitting: false
        })
      })
    })
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

  public render(): JSX.Element {
    return (
      <Form
        onChange={
          (event) => this.handleFormState(event)
        }
        onSubmit={
          (event) => this.handleFormSubmit(event)
        }>
        <GoogleReCaptcha action={ 'signupfinish' } onVerify={ (token) => { this.updateRecaptchaToken(token) } }/>
        <Form.Row>
          <Grid.Col>
            <h2 className="font-weight-bold">
              Finish the organization profile to continue
            </h2>
            <small className="text-muted">
              Finish your account profile to start using all We To World applications
            </small>
            <br />
            <small className="text-muted">
              This information is private and can be changed in the account profile settings
            </small>
          </Grid.Col>
        </Form.Row>
        <div className="py-3" />
        <Form.Row>
          <Grid.Col>
            <h4 className="font-weight-bold">
              Organization Billing Address
            </h4>
          </Grid.Col>
        </Form.Row>
        <div className="py-2" />
        <Form.Row>
          <Grid.Col xs="12" lg="3">
            <Form.Group>
              <Form.Label>
                Country
              </Form.Label>
              <Select
                inputId="country"
                name="country"
                options={ this._allowedCountriesOptions }
                onChange={
                  (event) => {
                    this.updateSelectedCountry(event?.value ?? '')
                  }
                }
                isSearchable={ false }
                placeholder="Select one to continue"
                styles={ defaultSelectStyles } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="9" className="mb-3">
            <Form.Label
              className="conditional"
              htmlFor="finishSignUpAddressSearch" >
              Search an address to autocomplete the fields bellow
            </Form.Label>
            <GooglePlacesAutocomplete
              apiKey={ ProvidersHelper.keys.google.places.autocomplete }
              autocompletionRequest={{
                componentRestrictions: {
                  country: this.state.country?.toLowerCase() ?? ''
                }
              }}
              onLoadFailed={ (error) => { console.error(error) } }
              minLengthAutocomplete={ 3 }
              selectProps={{
                onChange: (value) => { this.updateAddress(value) },
                isDisabled: !this.state.country,
                placeholder: this.state.country
                  ? 'Please type an address'
                  : 'Please select a country to start searching',
                components: {
                  Menu: showPoweredByGoogleHelper,
                  LoadingIndicator: loadingIndicatorPatch,
                },
                className: 'search-address-box',
                inputId: 'finishSignUpAddressSearch',
                name: 'finishSignUpAddressSearch',
                menuPortalTarget: document.body,
                styles: {
                  ...defaultSelectStyles,
                  menuPortal: (styles) => ({
                    ...styles,
                    zIndex: 12
                  }),
                  indicatorSeparator: (styles) => ({
                    ...styles,
                    display: 'none'
                  }),
                  dropdownIndicator: (styles) => ({
                    ...styles,
                    display: 'none'
                  }),
                  indicatorsContainer: (styles, { isDisabled, hasValue }) => ({
                    ...styles,
                    display: (isDisabled || hasValue) ? 'none' : 'flex',
                    color: '#ced4da',
                    marginRight: '.5rem'
                  }),
                }
              }} />
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpBillingAddressStreetName">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressStreetName.required ? '' : 'optional' } >
                Street Name / Route
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressStreetName"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressStreetName.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressStreetName.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpBillingAddressStreetNumber">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressStreetNumber.required ? '' : 'optional' } >
                Street Number
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressStreetNumber"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressStreetNumber.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressStreetNumber.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpBillingAddressDoor">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressDoor.required ? '' : 'optional' } >
                Door / Office / Apartment
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressDoor"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressDoor.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressDoor.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpBillingAddressNeighborhood">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressNeighborhood.required ? '' : 'optional' } >
                Neighborhood
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressNeighborhood"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressNeighborhood.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressNeighborhood.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpBillingAddressCity">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressCity.required ? '' : 'optional' } >
                City
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressCity"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressCity.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressCity.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpBillingAddressState">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressState.required ? '' : 'optional' } >
                State / Region / Province
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressState"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressState.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressState.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="4">
            <Form.Group controlId="finishSignUpBillingAddressPostalCode">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressPostalCode.required ? '' : 'optional' } >
                Postal Code
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressPostalCode"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressPostalCode.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressPostalCode.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="8">
            <Form.Group controlId="finishSignUpBillingAddressComplement">
              <Form.Label
                className={ this.state.finishSignUpBillingAddressComplement.required ? '' : 'optional' } >
                Complement
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpBillingAddressComplement"
                disabled={ !this.state.country }
                value={ this.state.finishSignUpBillingAddressComplement.value }
                onKeyUp={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) this.updateBillingAddressFragment(event.target as HTMLInputElement)
                  }
                }
                required={ this.state.finishSignUpBillingAddressComplement.required } />
            </Form.Group>
          </Grid.Col>
        </Form.Row>
        <div className="py-3">
          <hr />
        </div>
        <Form.Row>
          <Grid.Col>
            <h4 className="font-weight-bold">
              Organization Identification
            </h4>
            <small className="text-muted">
              This information will be used to identify the organization and provide a service focused in your business
            </small>
          </Grid.Col>
        </Form.Row>
        <div className="py-2" />
        <Form.Row>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpOrganizationName">
              <Form.Label
                className={ this.state.finishSignUpOrganizationName.required ? '' : 'optional' } >
                Name
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpOrganizationName"
                required={ this.state.finishSignUpOrganizationName.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpOrganizationSocialReason">
              <Form.Label
                className={ this.state.finishSignUpOrganizationSocialReason.required ? '' : 'optional' } >
                Social Reason
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpOrganizationSocialReason"
                required={ this.state.finishSignUpOrganizationSocialReason.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="2">
            <Form.Group controlId="finishSignUpOrganizationTaxIdType">
              <Form.Label
                className={ this.state.finishSignUpOrganizationTaxIdType.required ? '' : 'optional' } >
                Tax ID Type
              </Form.Label>
              <Select
                inputId="finishSignUpOrganizationTaxIdType"
                name="finishSignUpOrganizationTaxIdType"
                onChange={ (option) => {
                  this.setState({
                    ...this.state,
                    finishSignUpOrganizationTaxIdType: {
                      ...this.state.finishSignUpOrganizationTaxIdType,
                      value: option?.value
                    }
                  })
                } }
                isSearchable={ false }
                isDisabled={ this._allowedJuridicIDsOptions.length === 0 }
                options={ this._allowedJuridicIDsOptions }
                value={
                  this._allowedJuridicIDsOptions.find(
                    option => option.value === this.state.finishSignUpOrganizationTaxIdType.value
                  )
                }
                placeholder={ !this.state.country ? 'Select a country' : ' ' }
                styles={ defaultSelectStyles } />
              <Form.Text className="text-muted">
                {
                  this._allowedJuridicIDsOptions.find(
                    id => id.value === this.state.finishSignUpOrganizationTaxIdType.value
                  )?.helper ?? ''
                }
              </Form.Text>
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="4">
            <Form.Group controlId="finishSignUpOrganizationTaxId">
              <Form.Label
                className={ this.state.finishSignUpOrganizationTaxId.required ? '' : 'optional' } >
                Tax ID
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpOrganizationTaxId"
                disabled={ this._allowedJuridicIDsOptions.length === 0 }
                required={ this.state.finishSignUpOrganizationTaxId.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpOrganizationEmployeesQuantityRange">
              <Form.Label
                className={ this.state.finishSignUpOrganizationEmployeesQuantityRange.required ? '' : 'optional' } >
                Employees Quantity
              </Form.Label>
              <Select
                inputId="finishSignUpOrganizationEmployeesQuantityRange"
                name="finishSignUpOrganizationEmployeesQuantityRange"
                isSearchable={ false }
                onChange={
                  (option) => {
                    this.setState({
                      ...this.state,
                      finishSignUpOrganizationEmployeesQuantityRange: {
                        ...this.state.finishSignUpOrganizationEmployeesQuantityRange,
                        value: option?.value
                      }
                    })
                  } 
                }
                options={ this._employeesQuantityOptions }
                placeholder="Select a range"
                styles={ defaultSelectStyles } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="4">
            <Form.Group controlId="finishSignUpOrganizationOpeningDate">
              <Form.Label
                className={ this.state.finishSignUpOrganizationOpeningDate.required ? '' : 'optional' } >
                Opening Date
              </Form.Label>
              <DatePicker
                id="finishSignUpOrganizationOpeningDate"
                name="finishSignUpOrganizationOpeningDate"
                className="form-control"
                dateFormat="dd/MM/yyyy"
                selected={ new Date() }
                value={ this.state.finishSignUpOrganizationOpeningDate.value }
                maxDate={ new Date() }
                onChange={ (outerDate) => {
                  if (outerDate) {
                    const timestamp = (outerDate.valueOf() as number)
                    this.setState({
                      ...this.state,
                      finishSignUpOrganizationOpeningDate: {
                        ...this.state.finishSignUpOrganizationOpeningDate,
                        value: `${new Date(timestamp).getDate()}/${new Date(timestamp).getMonth()}/${new Date(timestamp).getFullYear()}`
                      }
                    })
                  }
                } }
                required={ this.state.finishSignUpOrganizationOpeningDate.required }
                strictParsing
                disabledKeyboardNavigation
                dropdownMode={ 'select' }
                showPopperArrow={ false }
                showYearDropdown />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="4">
            <Form.Label
              className={ this.state.finishSignUpOrganizationAnualSales.required ? '' : 'optional' }
              htmlFor="finishSignUpOrganizationAnualSales">
              Estimated Anual Sales Value
            </Form.Label>
            <InputGroup className="static">
              <InputGroup.Prepend>
                <InputGroup.Text id="finishSignUpOrganizationAnualSalesCurrency">USD</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="finishSignUpOrganizationAnualSales"
                name="finishSignUpOrganizationAnualSales"
                type="number"
                min={ 0 }
                step={ 0.01 }
                onKeyDown={
                  (event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.isTrusted) controlNumberInput(event)
                  }
                }
                required={ this.state.finishSignUpOrganizationAnualSales.required } />
            </InputGroup>
            {
              <Form.Text className="text-muted font-italic">
                {
                  this.state.finishSignUpOrganizationAnualSales.value
                    ? 'USD ' + (new Intl.NumberFormat()).format(this.state.finishSignUpOrganizationAnualSales.value)
                    : <wbr />
                }
              </Form.Text>
            }
          </Grid.Col>
        </Form.Row>
        <div className="py-3">
          <hr />
        </div>
        <Form.Row>
          <Grid.Col>
            <h4 className="font-weight-bold">
              Organization Representative Identification
            </h4>
            <small className="text-muted">
              By proceeding, you allow us to use this information for contact and legal purposes
            </small>
          </Grid.Col>
        </Form.Row>
        <div className="py-2" />
        <Form.Row>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpRepresentativeFirstName">
              <Form.Label
                className={ this.state.finishSignUpRepresentativeFirstName.required ? '' : 'optional' } >
                Name
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpRepresentativeFirstName"
                required={ this.state.finishSignUpRepresentativeFirstName.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpRepresentativeLastName">
              <Form.Label
                className={ this.state.finishSignUpRepresentativeLastName.required ? '' : 'optional' } >
                Surname
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpRepresentativeLastName"
                required={ this.state.finishSignUpRepresentativeLastName.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpRepresentativeCorporativePosition">
              <Form.Label
                className={ this.state.finishSignUpRepresentativeCorporativePosition.required ? '' : 'optional' } >
                Organization Position / Role
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpRepresentativeCorporativePosition"
                required={ this.state.finishSignUpRepresentativeCorporativePosition.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="2">
            <Form.Group controlId="finishSignUpRepresentativeTaxIdType">
              <Form.Label
                className={ this.state.finishSignUpRepresentativeTaxIdType.required ? '' : 'optional' } >
                ID Type
              </Form.Label>
              <Select
                inputId="finishSignUpRepresentativeTaxIdType"
                name="finishSignUpRepresentativeTaxIdType"
                onChange={ (option) => {
                  this.setState({
                    ...this.state,
                    finishSignUpRepresentativeTaxIdType: {
                      ...this.state.finishSignUpRepresentativeTaxIdType,
                      value: option?.value
                    }
                  })
                } }
                isSearchable={ false }
                isDisabled={ this._allowedNonJuridicIDsOptions.length === 0 }
                options={ this._allowedNonJuridicIDsOptions }
                value={
                  this._allowedNonJuridicIDsOptions.find(
                    option => option.value === this.state.finishSignUpRepresentativeTaxIdType.value
                  )
                }
                placeholder={ !this.state.country ? 'Select a country' : ' ' }
                styles={ defaultSelectStyles } />
              <Form.Text
                className="text-muted"
                title={
                  this._allowedNonJuridicIDsOptions.find(
                    id => id.value === this.state.finishSignUpRepresentativeTaxIdType.value
                  )?.description
                } >
                {
                  this._allowedNonJuridicIDsOptions.find(
                    id => id.value === this.state.finishSignUpRepresentativeTaxIdType.value
                  )?.helper
                }
              </Form.Text>
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="4">
            <Form.Group controlId="finishSignUpRepresentativeTaxId">
              <Form.Label
                className={ this.state.finishSignUpRepresentativeTaxId.required ? '' : 'optional' } >
                Identification Number
              </Form.Label>
              <Form.Control
                type="text"
                name="finishSignUpRepresentativeTaxId"
                disabled={ this._allowedNonJuridicIDsOptions.length === 0 }
                required={
                  this.state.finishSignUpRepresentativeTaxId.required
                  && Countries.find(
                    country => country.twoDigitCode === this.state.country
                  )?.identification?.required
                } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="6">
            <Form.Group controlId="finishSignUpRepresentativeEmail">
              <Form.Label
                className={ this.state.finishSignUpRepresentativeEmail.required ? '' : 'optional' } >
                Contact Mail
              </Form.Label>
              <Form.Control
                type="email"
                name="finishSignUpRepresentativeEmail"
                required={ this.state.finishSignUpRepresentativeEmail.required } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="2" className="pr-1 pr-lg-0">
            <Form.Group controlId="finishSignUpRepresentativePhonePrefix">
              <Form.Label 
                className={ this.state.finishSignUpRepresentativePhonePrefix.required ? '' : 'optional' } >
                Phone
              </Form.Label>
              <Select
                inputId="finishSignUpRepresentativePhonePrefix"
                name="finishSignUpRepresentativePhonePrefix"
                options={ this._allowedPhonesPrefixesOptions }
                isSearchable={ false }
                value={
                  this._allowedPhonesPrefixesOptions.find(
                    option => option.value === this.state.finishSignUpRepresentativePhonePrefix.value
                  )
                }
                isDisabled={ this._allowedPhonesPrefixesOptions.length === 0 }
                placeholder={ !this.state.country ? 'Select a country' : ' ' }
                tabSelectsValue={ true }
                styles={ defaultSelectStyles } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs="12" lg="4" className="pl-1 pl-lg-0">
            <Form.Group controlId="finishSignUpRepresentativePhone">
              <Form.Label
                className={ this.state.finishSignUpRepresentativePhone.required ? '' : 'conditional' } >
                <wbr />
              </Form.Label>
              <Form.Control
                type="tel"
                name="finishSignUpRepresentativePhone"
                disabled={ !this.state.country }
                required={ this.state.finishSignUpRepresentativePhone.required } />
            </Form.Group>
          </Grid.Col>
        </Form.Row>
        <div className="py-3">
          <hr />
        </div>
        <Form.Row className="mt-3">
          <Grid.Col className="text-center text-lg-right">
            <SubmitButton
              variant="warning"
              buttonText={ 'Finish' }
              isSubmitting={ this.state.isSubmitting }
              disableIf={ !this.state.isFormValid } />
          </Grid.Col>
        </Form.Row>
        <div className="py-2" />
      </Form>
    )
  }
}
