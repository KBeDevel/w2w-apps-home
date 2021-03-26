import ProvidersHelper, { W2WAPI } from '../helpers/providers.helper'
import { DefaultResponse } from '../types'

export default class CommonProvider {
  public static async validateRecaptchaToken(token: string): Promise<DefaultResponse<{ valid: boolean }>> {
    return (await ProvidersHelper.HttpClient.get(W2WAPI.setPath(`/validate/recaptcha/${token}`), {
      headers: {
        Authorization: ProvidersHelper.keys.api.publicKey
      }
    })).data
  }
}
