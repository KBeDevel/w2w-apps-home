import { Component } from 'react'
import RouterOutline from '../../helpers/router.helper'
// import CalculatorProvider from '../../providers/calculator.provider'
import { EmptyProps, FormState, Order as OrderType } from '../../types'

type OrderState = {
  orderType: OrderType
} & FormState

export default class Calculator extends Component <EmptyProps, OrderState > {
  constructor(props: never) {
    super(props)
    // this.state = this.initState()
  }

  // private initState(): OrderState {
  //   return {
  //     isFormValid: false,
  //     isSubmitting: false,
  //     contactBook: CalculatorProvider.EMPTY_ORDER
  //   } as OrderState
  // }
  public render(): JSX.Element {
    return RouterOutline.set(
      <h1>holas</h1>
    )}
}
