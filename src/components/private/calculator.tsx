import { ChangeEvent, Component, FormEvent } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'
import { getControlValidationState } from '../../helpers/form.helper'
import { ContactNotebook as NotebookType ,CalculatorBody, CalculatorFormFields, EmptyProps, CalculatorResponse, OrderBody ,FormState, TrackingType, OrderResponse } from '../../types'
import Table from 'react-bootstrap/esm/Table'
import CalculatorProvider from '../../providers/calculator.provider'
import ProvidersHelper from '../../helpers/providers.helper'
import ContactBookProvider from '../../providers/contact-book.provider'
import { LinkContainer } from 'react-router-bootstrap'

type BookState = {
  contactBook: NotebookType[]
}

export default class Calculator extends Component <EmptyProps, CalculatorFormFields & FormState & CalculatorResponse & OrderResponse & BookState> {

  constructor(props: never) {
    super(props)
    this.state = this.InitState(),
    this.onClickDetail = this.onClickDetail.bind(this)
  }

  private InitState (): CalculatorFormFields & FormState & CalculatorResponse & OrderResponse & BookState{
    return {
      isFormValid: false,
      isSubmitting: false,
      cost: 0,
      courier: TrackingType.chilexpress,
      contactBook: ContactBookProvider.EMPTY_CONTACTBOOK,
      serviceCode: 0,
      weight: 0,
      createOrder: true,
      operation: '',
      tracking: '',
      calcWeight: {
        required: true,
        value: undefined
      },
      calcLenght: {
        required: true,
        value: undefined
      },
      calcHeight: {
        required: true,
        value: undefined
      },
      calcWidth: {
        required: true,
        value: undefined
      },
      calcPrice: {
        required: true,
        value: undefined
      },
      origin:{
        required: true,
        value: undefined
      },
      destination:{
        required: true,
        value: undefined
      },

    } as CalculatorFormFields & FormState & CalculatorResponse & OrderResponse & BookState 
  }

  public async componentDidMount() {
    this.setState( {contactBook: (await ContactBookProvider.getUserContactBook()).value} )
  }

  private updateStateFromInput(inputElement: HTMLInputElement): void {
    const isTextBox = (input = inputElement) => {
      return input.type === 'text' || input.type === 'number' || input.type === 'index' || input.type === 'object' 
    }
    this.setState(
      Object.assign(
        this.state,
        {
          [inputElement.id]: Object.assign(
            (this.state as CalculatorFormFields)[inputElement.id as keyof CalculatorFormFields],
            { value: isTextBox() ? inputElement.value : inputElement.checked }
          )
        }
      )
    )
  }
  private UpdateStateFromSelect(selectElement: HTMLSelectElement): void {
    const isTextBox = ( select = selectElement) => {
      return select.type === 'number' || select.type === 'select-one'
    }
    this.setState(
      Object.assign(
        this.state,
        {
          [selectElement.id]: Object.assign(
            (this.state as CalculatorFormFields)[selectElement.id as keyof CalculatorFormFields],
            {value: isTextBox() ? selectElement.value : selectElement.click }
          )
        }
      )
    )
  }

  private checkFieldsValidity(): void {
    let valid = true
    for (const fieldId in this.state) {
      if (valid) {
        const fieldData = (this.state as CalculatorFormFields)[fieldId as keyof CalculatorFormFields]
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
    console.log(event.target)
    if (event.target instanceof HTMLSelectElement) {
      console.log(event.target.type)
      this.UpdateStateFromSelect(event.target)
      this.checkFieldsValidity()
    }else if(event.target instanceof HTMLInputElement){
      this.updateStateFromInput(event.target)
      this.checkFieldsValidity()
    }
    console.log(this.state.origin, this.state.destination )
  }

  private onClickDetail () {
    const orderData: OrderBody = {
      service: {
        courier: this.state.courier,
        value: this.state.cost,
        code: this.state.serviceCode
      },
      origin: this.state.contactBook[this.state.origin.value ?? 0],
      destination: this.state.contactBook[this.state.destination.value ?? 0],
      packages:[{
        dims:{
          height: this.state.calcHeight.value ?? 0,
          length: this.state.calcLenght.value ?? 0,
          width: this.state.calcWidth.value ?? 0,
        },
        weight: {
          value: this.state.calcWeight.value ?? 0,
        },
        price: {
          value: this.state.calcPrice.value ?? 0,
        }
      }],
    }
    this.setState({
      ...this.onClickDetail
    })
    console.log(orderData)
    ,()=>
      console.log(this.onClickDetail)
    CalculatorProvider.postOrder(orderData).then((response)=>{
      if(response){
        console.log(response)
        this.setState({
          ...this.state,
          createOrder: (response.value.createOrder),
          operation: (response.value.operation),
          tracking: (response.value.tracking)
        })
        localStorage.setItem(ProvidersHelper.LocalOrder.orderData, JSON.stringify(orderData))
        localStorage.setItem(ProvidersHelper.LocalOrderResponse.orderResponse, JSON.stringify(response.value))
        window.location.replace('/detail-order')
      }
    })
  }

  private async handleFormSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    if (!event.isTrusted) return
  
    const calculatorData: CalculatorBody = {
      origin: this.state.contactBook[this.state.origin.value ?? 0],
      destination: this.state.contactBook[this.state.destination.value ?? 0],
      package:{
        dims:{
          height: this.state.calcHeight.value ?? 0,
          length: this.state.calcLenght.value ?? 0,
          width: this.state.calcWidth.value ?? 0,
        },
        weight: {
          value: this.state.calcWeight.value ?? 0,
        },
        price: {
          value: this.state.calcPrice.value ?? 0,
        }
      },
    }
    this.setState({
      ...this.state,
      isSubmitting: true
    }, () => {
      CalculatorProvider.postCalculator(calculatorData).then((response) => {
        console.log(calculatorData)
        if (response.value) {
          this.setState({
            ...this.state,
            cost: (response.value.cost),
            courier: (response.value.courier),
            serviceCode: (response.value.serviceCode)
          })
        }
      }).finally(() => {
        this.setState({
          ...this.state,
          isSubmitting: false
        })
      })
    })
  }

  render(): JSX.Element {
    return RouterOutline.set(
      <Grid.Container className='pt-5 pb-5'>
        <Form id="calculatorForm" name="calculatorForm" onSubmit={ (event) => { this.handleFormSubmit(event) } }>
          <Grid.Row>
            <Grid.Col xs='12' md='12' lg='6'>
              <h3>Cotizacion</h3>
            </Grid.Col>
            <Grid.Col xs='12' md='12' lg='6'>
              <Button variant='warning' type='submit' size='lg'>Cotizar</Button>
              <LinkContainer to='/contacts-form'>
                <Button variant='warning' type='button' size='lg' className='ml-2'>Nueva Dirección</Button>
              </LinkContainer>
            </Grid.Col>
          </Grid.Row>
          <hr style={{height: '1px', }}/>
          <Grid.Row>
            <Grid.Col xs='12' md='12' lg='12' className='mb-2'>
              <h5>Direccion</h5>
            </Grid.Col>
            {/* origin Inir */}
            <Grid.Col xs='12' md='12' lg='6'>
              <Form.Group controlId='origin' style={{ paddingBottom: '2rem' }} >
                <Form.Label>Dirección de origen</Form.Label>
                <Form.Control as='select' onChange={ (event) => { this.handleFormChange(event) } }>
                  { this.state.contactBook.map((item, index)=>(
                    <option value={index} key={index}>{item.street.name + ' ' + item.street.number }</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Grid.Col>
            {/* destination init */}
            <Grid.Col xs='12' md='12' lg='6'>
              <Form.Group controlId='destination' style={{ paddingBottom: '2rem' }} >
                <Form.Label>Dirección de destino</Form.Label>
                <Form.Control as='select' type="text" required={ this.state.destination.required} onChange={ (event) => { this.handleFormChange(event) } }>
                  { this.state.contactBook.map((item, index)=>(
                    <option value={index} key={index}>{item.street.name + ' ' + item.street.number }</option>
                  )) }
                </Form.Control>
              </Form.Group>
            </Grid.Col>
            {/* rest of optin */}
          </Grid.Row>
          <hr style={{height: '1px', }}/>
          <Grid.Row>
            <Grid.Col xs='12' md='12' lg='12' className='mb-2'>
              <h5>Datos de la solicitud</h5>
            </Grid.Col>
            <Grid.Col xs='12' md='12' lg='3'>
              <Form.Group controlId='calcWeight' style={{ paddingBottom: '2rem' }} >
                <Form.Label>Peso</Form.Label>
                <Form.Control  
                  type="number"
                  required={ this.state.calcWeight.required}
                  onChange={ (event) => { this.handleFormChange(event) } } />
              </Form.Group>
            </Grid.Col>
            <Grid.Col xs='12' md='12' lg='3'>
              <Form.Group controlId='calcLenght' style={{ paddingBottom: '2rem' }} >
                <Form.Label>Largo</Form.Label>
                <Form.Control 
                  type="number"
                  required={ this.state.calcLenght.required}
                  onChange={ (event) => { this.handleFormChange(event) } } />
              </Form.Group>
            </Grid.Col>
            <Grid.Col xs='12' md='12' lg='3'>
              <Form.Group controlId='calcHeight' style={{ paddingBottom: '2rem' }} >
                <Form.Label>Alto</Form.Label>
                <Form.Control 
                  type="number"
                  required={ this.state.calcHeight.required}
                  onChange={ (event) => { this.handleFormChange(event) } } />
              </Form.Group>
            </Grid.Col>
            <Grid.Col xs='12' md='12' lg='3'>
              <Form.Group controlId='calcWidth' style={{ paddingBottom: '2rem' }} >
                <Form.Label>Ancho</Form.Label>
                <Form.Control 
                  type="number"
                  required={ this.state.calcWidth.required}
                  onChange={ (event) => { this.handleFormChange(event) } } />
              </Form.Group>
            </Grid.Col>
            <Grid.Col xs='12' md='12' lg='3'>
              <Form.Group controlId='calcPrice' style={{ paddingBottom: '2rem' }} >
                <Form.Label>Precio</Form.Label>
                <Form.Control 
                  type="number"
                  required={ this.state.calcPrice.required}
                  onChange={ (event) => { this.handleFormChange(event) } } />
              </Form.Group>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Table>
              <thead>
                <tr>
                  <th>Valor</th>
                  <th>Courier</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.cost}</td>
                  <td>{this.state.courier}</td>
                  <td>{this.state.operation}</td>
                  <td>
                    <Button variant='warning' onClick={ this.onClickDetail }>Generar OC</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid.Row>
        </Form>
      </Grid.Container>
    )
  }
}
