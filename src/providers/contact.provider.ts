import ProvidersHelper, { W2WAPI } from '../helpers/providers.helper'
import { ContactForm, DefaultResponse } from '../types'

export default class ContactProvider {
  public static async sendMessage(form: ContactForm): Promise<DefaultResponse<{ sent: boolean }>> {
    return await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/contact'), form)
  }
}
