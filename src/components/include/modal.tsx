import { Component, FormEvent, ChangeEvent } from 'react'
import Grid from '../../helpers/grid.helper'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getControlValidationState } from '../../helpers/form.helper'
import { ContactsBFormFields, ContactsBookBody, EmptyProps, FormState } from '../../types'
import ContactBookProvider from '../../providers/contact-book.provider'

class EditModal extends Component<EmptyProps, ContactsBFormFields & FormState>{
  constructor(props: never){
    super(props)
    this.state= {
      isFormValid: false,
      isSubmitting: false,
      cBookLabel:{
        required: true,
        value: undefined
      },
      cBookStreetName:{
        required: true,
        value: undefined
      },
      cBookStreetNumber:{
        required: true,
        value: undefined
      },
      cBookCountry:{
        required: true,
        value: undefined
      },
      cBookComune:{
        required: true,
        value: undefined
      },
      cBookState:{
        required: true,
        value: undefined
      },
      cBookCity:{
        required: true,
        value: undefined
      },
      cBookName: {
        required: true,
        value: undefined
      },
      cBookEmail: {
        required: true,
        value: undefined
      },
      cBookIdentNumber: {
        required: true,
        value: undefined
      },
      cBookIdentType: {
        required: true,
        value: undefined
      },
      cBookPhoneNumber: {
        required: true,
        value: undefined
      },
      cBookPhonePrefix: {
        required: true,
        value: undefined
      },
    }
  }

  private updateStateFromInput(inputElement: HTMLInputElement): void {
    
    const isTextBox = (input = inputElement) => {
      return input.type === 'text' || input.type === 'number' || input.type === 'email'
    }
    this.setState(
      Object.assign(
        this.state,
        {
          [inputElement.id]: Object.assign(
            (this.state as ContactsBFormFields)[inputElement.id as keyof ContactsBFormFields],
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
        const fieldData = (this.state as ContactsBFormFields)[fieldId as keyof ContactsBFormFields]
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

  private async handleFormSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    console.log(event)
    if (!event.isTrusted) return

    const contactBookData: ContactsBookBody = {
      label: this.state.cBookLabel.value as string,
      street: {
        number: this.state.cBookStreetNumber.value as string,
        name: this.state.cBookStreetName.value as string
      },
      city: this.state.cBookCity.value as string,
      state: this.state.cBookState.value as string,
      commune: this.state.cBookComune.value as string,
      country: this.state.cBookCountry.value as string,
      contact: {
        name: this.state.cBookName.value as string,
        identification:{
          type: this.state.cBookIdentType.value as string,
          number: this.state.cBookIdentNumber.value as string
        },
        phone: {
          number: this.state.cBookPhoneNumber.value as string,
          code: this.state.cBookPhonePrefix.value as string
        },
        email: this.state.cBookEmail.value as string
      }
    }
    this.setState({
      ...this.state,
      isSubmitting: true
    }, () => {
      ContactBookProvider.postAddContact(contactBookData).then((response) => {
        console.log(contactBookData)  
        if (response.value) {
          return response.value
        }
      }).finally(() => {
        this.setState({
          ...this.state,
          isSubmitting: false
        })
      })
    })
  }
  render():JSX.Element {
    return(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col xs='12' md='12' lg='6'>
            <h3>Editar Despacho</h3>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='6'>
            <Button variant='warning' type='submit' size='lg'>Editar</Button>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='6' className='mt-5'>
            <Form.Group controlId='cBookLabel' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Nombre Dirección</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookLabel.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='4'>
            <Form.Group controlId='cBookStreetName'  className='mt-5' style={{ paddingBottom: '2rem' }} >
              <Form.Label>nombre de la calle</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookStreetName.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='2'>
            <Form.Group controlId='cBookStreetNumber' className='mt-5' style={{ paddingBottom: '2rem' }} >
              <Form.Label>número de la calle</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookStreetNumber.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='3'>
            <Form.Group controlId='cBookCountry' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Pais</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookCountry.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='3'>
            <Form.Group controlId='cBookComune' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Comuna</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookComune.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='3'>
            <Form.Group controlId='cBookState' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Región</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookState.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='3'>
            <Form.Group controlId='cBookCity' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookCity.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
        <hr style={{height: '1px', }}/>
        <Grid.Row>
          <Grid.Col xs='12' md='12' lg='6'className='mt=5'>
            <Form.Group controlId='cBookName' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Nombre del Contacto</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookName.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='6'>
            <Form.Group controlId='cBookEmail' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Correo de Contacto</Form.Label>
              <Form.Control
                type='email'
                required={ this.state.cBookEmail.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='6'>
            <Form.Group controlId='cBookIdentType' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Tipo de identificación</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookIdentType.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='6'>
            <Form.Group controlId='cBookIdentNumber' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Número de identificación</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookIdentNumber.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='2'>
            <Form.Group controlId='cBookPhonePrefix' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Prefijo telefónico</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookPhonePrefix.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='4'>
            <Form.Group controlId='cBookPhoneNumber' style={{ paddingBottom: '2rem' }} >
              <Form.Label>Número de teléfono</Form.Label>
              <Form.Control
                type='text'
                required={ this.state.cBookPhoneNumber.required}
                onChange={ (event) => { this.handleFormChange(event) } } />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}

export default EditModal
