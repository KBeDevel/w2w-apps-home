import { DefaultResponse, FormField, ReactSelectStyles, SelectOption } from '../types'
import Swal from 'sweetalert2'

/**
 * @deprecated in favor of `FormState` & `SecuredFormState`
 */
export interface StandardForm {
  isRecaptchaTokenValidated: boolean | undefined
  isFormValid: boolean | undefined
  isSubmitting: boolean
}

export interface SubmitButtonProps {
  buttonText: string
  isSubmitting?: boolean
  disableIf?: boolean
}

export function getControlValidationState(fieldData: FormField | undefined): boolean {
  return fieldData?.required ? (
    fieldData.value !== undefined && (typeof fieldData.value === 'boolean' ? fieldData.value : fieldData.value !== '')
  ) : true
}

export function handleW2WAPIResponse(response: DefaultResponse<unknown>): boolean {
  if (response.error?.value) {
    Swal.fire({
      icon: 'warning',
      title: response.error?.message ?? 'Unexpected error',
      text: 'Trace time: ' + (response.error?.timestamp ?? Date.now())
    })
    return false
  }
  return true
}

export function controlNumberInput(event: React.KeyboardEvent<HTMLInputElement>): void {
  const control = event.target as HTMLInputElement
  const isNumberRegExpChar = /^[0-9]+$/
  const isNumberRegExp = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/
  const bypassCharacters = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Shift',
    '.',
  ]
  const enteredCharacter = event.key

  if (!bypassCharacters.includes(enteredCharacter) && !enteredCharacter.match(isNumberRegExpChar))
    if (!(control.value ?? enteredCharacter).match(isNumberRegExp))
      event.preventDefault()
}

export const getControlRef = (controlId: string): HTMLInputElement => {
  return document.getElementById(controlId) as HTMLInputElement
}

export const employeesQuantityRange: SelectOption[] = [
  { value: '1-10', label: '1-10' },
  { value: '11-30', label: '11-30' },
  { value: '31-50', label: '31-50' },
  { value: '50+', label: 'More than 50' },
]

export const defaultSelectStyles: ReactSelectStyles = {
  placeholder: (styles) => ({
    ...styles,
    fontSize: '.8em'
  }),
  container: (styles, { isDisabled }) => {
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'auto',
    }
  },
  control: (styles, { isFocused, isDisabled }) => {
    return {
      ...styles,
      boxShadow: 'none',
      borderColor: isFocused ? 'orange' : '#ced4da',
      borderRadius: 0,
      borderWidth: '2px',
      ':hover': {
        borderColor: isFocused ? 'orange' : '#ced4da',
        cursor: isDisabled ? 'not-allowed' : 'auto',
      },
      ':focus': {
        borderColor: isFocused ? 'orange' : '#ced4da',
        cursor: isDisabled ? 'not-allowed' : 'auto',
      },
      cursor: isDisabled ? 'not-allowed' : 'auto',
      height: 'calc(1.5em + 0.75rem + 2px)',
    }
  },
  option: (styles, { isSelected, isDisabled }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? 'orange' : 'white',
      ':hover': {
        backgroundColor: 'orange',
        cursor: isDisabled ? 'not-allowed' : 'auto',
      },
      cursor: isDisabled ? 'not-allowed' : 'auto',
    }
  }
}
