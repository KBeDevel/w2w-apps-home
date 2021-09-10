import ProvidersHelper, { W2WAPI } from '../helpers/providers.helper'
import { CalculatorBody, CalculatorResponse, DefaultResponse, OrderBody, OrderResponse, PaymentResponse, TrackingType, } from '../types'

export default class CalculatorProvider {
  
  public static readonly EMPTY_ORDER: OrderBody = {
    service: {
      value: 0,
      courier: TrackingType.chilexpress,
      code: 0,
    },
    origin: {
      label: ' ',
      user: ' ',
      street: {
        number: '',
        name: ' ',
      },
      contact: {
        name: '',
        email: '',
        identification:{
          number: '',
          type: ''
        },
      },
      country:' ',
      city:' ',
      state:' ',
      commune: ' ',
    },
    destination: {
      label: ' ',
      user: ' ',
      street: {
        number: '',
        name: ' ',
      },
      contact: {
        name: '',
        email: '',
        identification:{
          number: '',
          type: ''
        },
      },
      country:' ',
      city:' ',
      state:' ',
      commune: ' ',
    },
    packages: [{
      dims: {
        height: 0,
        length: 0,
        width: 0,
      },
      weight: {
        value: 0,
        unit: '',
      },
      price: {
        value: 0,
        currency: '',
      },
    }]
  }


  public static async postOrder(body: OrderBody): Promise<DefaultResponse<OrderResponse>> {
    // console.table(body)
    const response = await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/order'), body ,{
      headers: {
        Authorization: ProvidersHelper.keys.api.privateKey()
      }
    })
    // console.log(response.data)
    return response.data
  }

  public static async postCalculator(body: CalculatorBody): Promise<DefaultResponse<CalculatorResponse>> {
    const response = await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/service/calculate'), body ,{
      headers: {
        Authorization: ProvidersHelper.keys.api.privateKey()
      }
    })
    console.log(response.data)
    return response.data
  }
  public static async postPayment(body: OrderResponse): Promise<DefaultResponse<PaymentResponse>> {
    const response = await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/order/payment'), body, {
      headers: {
        Authorization: ProvidersHelper.keys.api.privateKey()
      }
    })
    console.log(response.data)
    return response.data
  }
}
