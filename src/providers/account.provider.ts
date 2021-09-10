import ProvidersHelper, { W2WAPI } from '../helpers/providers.helper'
import { AuthenticationResponse, Credentials, DefaultResponse, SessionData, SignUpFinish, SignUpInit } from '../types'
import { CommonFunctions } from '../helpers/common-functions.helper'
import RoutesMap from '../helpers/routes-map.helper'
import jwt from 'jsonwebtoken'
import Swal from 'sweetalert2'

export default class AccountProvider {
  private static async auth(credentials: Credentials): Promise<DefaultResponse<AuthenticationResponse>> {
    const response = await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/account/sign-in'), credentials, {
      headers: {
        Authorization: ProvidersHelper.keys.api.publicKey
      }
    })
    console.log(response.config)
    return response.data
  }

  public static sendSessionToParent(): void {
    if (AccountProvider.readSessionData())
      window.parent.postMessage(
        CommonFunctions.Base64.encode(
          JSON.stringify(
            AccountProvider.readSessionData()
          )
        ),
        '*'
      )
  }

  public static setSessionData(data: SessionData): boolean {
    localStorage.setItem(ProvidersHelper.LocalStorage.sessionData, CommonFunctions.Base64.encode(JSON.stringify(data)))
    return AccountProvider.isAuthenticated()
  }

  public static isAuthenticated(): boolean {
    const sessionDataRaw = localStorage.getItem(ProvidersHelper.LocalStorage.sessionData)
    if (!sessionDataRaw) {
      return false
    }
    const sessionData = JSON.parse(CommonFunctions.Base64.decode(localStorage.getItem(ProvidersHelper.LocalStorage.sessionData) as string)) as SessionData
    try {
      const decodedToken = jwt.decode(CommonFunctions.Base64.decode(sessionData.token))
      const currentTimestamp = parseInt((Date.now() / 1000).toFixed(0))
      const tokenExpirationTimestamp = (decodedToken as { [key: string]: unknown })?.exp as number
      if (tokenExpirationTimestamp <= currentTimestamp) {
        AccountProvider.closeSession(true)
      }
      return !!decodedToken
    } catch (reason) {
      console.error('JWT decoding error:', reason)
      return false
    }
  }

  public static readSessionData(): SessionData | null {
    if (!AccountProvider.isAuthenticated()) {
      return null
    }
    return JSON.parse(CommonFunctions.Base64.decode(localStorage.getItem(ProvidersHelper.LocalStorage.sessionData) as string)) as SessionData
  }

  public static closeSession(redirect = false): boolean {
    localStorage.removeItem(ProvidersHelper.LocalStorage.sessionData)
    if (redirect) {
      window.location.href = RoutesMap.signIn.path
    }
    return !localStorage.getItem(ProvidersHelper.LocalStorage.sessionData)
  }

  public static async signIn(credentials: Credentials): Promise<boolean> {
    if (!AccountProvider.isAuthenticated()) {
      try {
        const response = await AccountProvider.auth(credentials)
        if (response.error?.value) {
          await Swal.fire({
            icon: 'warning',
            title: response.error?.message ?? response.error?.reason ?? 'Unexpected error',
            allowEscapeKey: false,
            allowOutsideClick: false
          })
          return false
        }
        const authentication = response.value
        if (authentication.token) {
          return AccountProvider.setSessionData(authentication)
        }
      } catch (err) {
        console.error(err)
        return false
      }
    }
    return true
  }

  public static async signUpInit(signUpInitData: SignUpInit): Promise<DefaultResponse<{ status: 'OK' | null }>> {
    return (await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/account/sign-up/init'), signUpInitData, {
      headers: {
        Authorization: ProvidersHelper.keys.api.publicKey
      }
    })).data
  }

  public static async signUpFinish(signUpFinishData: SignUpFinish, signUpToken = ProvidersHelper.keys.api.publicKey): Promise<DefaultResponse<AuthenticationResponse>> {
    return (await ProvidersHelper.HttpClient.post(W2WAPI.setPath('/account/sign-up/finish'), signUpFinishData, {
      headers: {
        Authorization: signUpToken
      }
    })).data
  }

  public static async validateSignUpToken(temporalToken: string): Promise<DefaultResponse<{ valid: boolean }>> {
    return (await ProvidersHelper.HttpClient.get(W2WAPI.setPath(`/validate/sign-up/${temporalToken}`), {
      headers: {
        Authorization: ProvidersHelper.keys.api.publicKey
      }
    })).data
  }
}
