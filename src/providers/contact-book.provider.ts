import ProvidersHelper, { W2WAPI } from '../helpers/providers.helper'
import { ContactNotebook, ContactBookResponse, ContactsBookBody, DefaultResponse } from '../types'

export default class ContactBookProvider {
  public static readonly EMPTY_CONTACTBOOK: ContactNotebook[] = [{
    label: '',
    user: '',
    street: {
      number: '',
      name: '',
    },
    city: '',
    state: '',
    commune: '',
    country: '',
    contact:{
      name: '',
      email: '',
      identification:{
        number: '',
        type: ''
      },
      phone:{
        number: '',
        code: '',
      },
    }
  }]

  public static async postAddContact(body: ContactsBookBody): Promise<DefaultResponse<ContactBookResponse>> {
    const response = await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/address'), body ,{
      headers: {
        Authorization: ProvidersHelper.keys.api.privateKey()
      }
    })
    return response.data
  }

  public static async putContact(body: ContactsBookBody): Promise<DefaultResponse<ContactBookResponse>> {
    const response = await ProvidersHelper.HttpClient.put(W2WAPI.setPath('/address'), body ,{
      headers: {
        Authorization: ProvidersHelper.keys.api.privateKey()
      }
    })
    return response.data
  } 
  // patch investigar che

  
  // public static async popContact(body: ContactsBookBody): Promise<DefaultResponse<ContactBookResponse>> {
  //   const response = await ProvidersHelper.HttpClient.put(W2WAPI.setPath('/address'), body ,{
  //     headers: {
  //       Authorization: ProvidersHelper.keys.api.privateKey()
  //     }
  //   })
  //   return response.data
  // } 

  public static async getUserContactBook(): Promise<DefaultResponse<ContactNotebook[]>> {
    const response = await ProvidersHelper.HttpClient.get(W2WAPI.setPath('/address'), {
      headers: {
        Authorization: ProvidersHelper.keys.api.privateKey()
      }
    })
    return response.data
  }
}
