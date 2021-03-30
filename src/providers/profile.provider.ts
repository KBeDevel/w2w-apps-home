import ProvidersHelper, { W2WAPI } from '../helpers/providers.helper'
import { DefaultResponse, Profile } from '../types'

export default class ProfileProvider {
  public static readonly EMPTY_PROFILE: Profile = {
    organization: {
      name: '',
      identification: {
        type: '',
        number: ''
      },
      billingAddress: {
        street: {
          name: ''
        },
        city: '',
        state: '',
        country: {
          name: '',
          code: {
            alpha2: ''
          }
        },
      }
    },
    representative: {
      firstName: '',
      lastName: '',
      contactData: {
        email: ''
      },
      identification: {
        number: '',
        type: ''
      }
    }
  }

  public static async getUserProfile(): Promise<DefaultResponse<Profile>> {
    const response = await ProvidersHelper.HttpClient.get(W2WAPI.setPath('/account/profile'), {
      headers: {
        Authorization: ProvidersHelper.keys.api.privateKey()
      }
    })
    return response.data
  }
}
