import {Component} from 'react'
import { Table } from 'react-bootstrap'
import Grid from '../../helpers/grid.helper'
import ProvidersHelper from '../../helpers/providers.helper'
import RouterOutline from '../../helpers/router.helper'
import CalculatorProvider from '../../providers/calculator.provider'
import '../../styles/dashboard.sass'
import { Order as OrderType, EmptyProps } from '../../types'

type OrderState = {
  orderModel : OrderType
}

export default class Quote extends Component<EmptyProps, OrderState > {

  constructor(props: never) {
    super(props)
    this.state = this.initState()
  }

  private initState(): OrderState {
    return {
      orderModel: CalculatorProvider.EMPTY_ORDER
    } as OrderState
  }

  public getOrder(): void {
    // const order = localStorage.getItem(ProvidersHelper.LocalOrder.orderData) as string
    console.log(JSON.parse(localStorage.getItem(ProvidersHelper.LocalOrder.orderData) as string))
  //   localStorage.removeItem(order)
  //   return true
  }

  public render(): JSX.Element {
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col xs='12' md='12' lg='12'>
            <Table>
              <thead>
                <tr>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Courier</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.orderModel.origin.street.name + ' ' + this.state.orderModel.origin.street.number }</td>
                  <td>{this.state.orderModel.destination.street.name + ' ' + this.state.orderModel.destination.street.number }</td>
                  <td>{this.state.orderModel.service.courier}</td>
                  <td>{this.state.orderModel.service.value}</td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
