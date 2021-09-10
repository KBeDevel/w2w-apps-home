import {  Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Grid from '../../helpers/grid.helper'
import ProvidersHelper from '../../helpers/providers.helper'
import CalculatorProvider from '../../providers/calculator.provider'
import '../../styles/dashboard.sass'
import { Order as OrderType, EmptyProps, OrderResponse, PaymentResponse } from '../../types'

type OrderState = {
  orderModel : OrderType
  orderResponse: OrderResponse
}


export default class DetailOrder extends Component<EmptyProps, OrderState & PaymentResponse> {
  
  constructor(props: never) {
    super(props)
    if(ProvidersHelper.LocalOrder.orderData === 'order'){
      // window.location.replace('/calculator')
    }
    this.state = this.initState()
  }

  private initState(): OrderState & PaymentResponse {
    return {
      orderModel: JSON.parse(localStorage.getItem(ProvidersHelper.LocalOrder.orderData) as string),
      orderResponse: JSON.parse(localStorage.getItem(ProvidersHelper.LocalOrderResponse.orderResponse) ?? ''),
      name: '',
      url: ''
    } as OrderState & PaymentResponse
  }

  public onHandleSubmit(event: React.MouseEvent): void {
    const payment: OrderResponse = {
      operation: this.state.orderResponse.operation,
      createOrder: this.state.orderResponse.createOrder,
      tracking: this.state.orderResponse.tracking
    }
    this.setState({
      ...this.state
    }),()=>
      CalculatorProvider.postPayment(payment).then((response) => {
        console.log(payment) 
        if(response){
          console.log(response)
          this.setState({
            ...this.state,
            name: (response.value.name),
            url: (response.value.url)
          })
          // window.location.replace('/detail-order')
        }
      })
  }

  render():JSX.Element{
    return(
      <Grid.Container>
        <Grid.Row className='mt-5'>
          <Grid.Col xs='12' md='12' lg='6'>
            <h3>Detalle de orden</h3>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='6'>
            <LinkContainer to='/calculator'>
              <Button variant='warning' type='button' size='lg' className='ml-2'>Volver a Cotizar</Button>
            </LinkContainer>
          </Grid.Col>
        </Grid.Row >
        <hr style={{height: '1px', }}/>
        <Grid.Row className='dflex justify-content-center'>
          <Grid.Col xs='12' md='12' lg='12'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Courier</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.orderModel.origin.street.name + ' ' + this.state.orderModel.origin.street.number }</td>
                  <td>{this.state.orderModel.destination.street.name + ' ' + this.state.orderModel.destination.street.number }</td>
                  <td>{this.state.orderModel.service.courier}</td>
                  <td>{this.state.orderResponse.operation}</td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
          <Grid.Col xs='12' md='6' lg='2' className='mt-3'>
            <Button variant='warning' type='button' role='button' onClick={(event) => this.onHandleSubmit(event)}>ir a pagar</Button>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
