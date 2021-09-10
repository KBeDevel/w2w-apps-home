import axios from 'axios'
import { DefaultRequestHeaders, DefaultResponse, SessionData } from '../types'
import { CommonFunctions } from './common-functions.helper'

//#region Axios Interceptors
axios.interceptors.request.use(
  (config) => {
    if (config.url?.includes(W2WAPI.baseLink)) {
      config.headers = Object.assign(
        config.headers,
        ProvidersHelper.getRequestHeaders()
      )
    } else {
      config.headers = Object.assign(
        config.headers,
        ProvidersHelper.getDefaultRequestHeaders()
      )
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.resolve({
      error: {
        value: true,
        reason: error,
        message: 'Rejected Request',
        timestamp: Date.now()
      },
      value: undefined
    } as DefaultResponse<undefined>)
  }
)
//#endregion

export class W2WAPI {
  public static baseLink = 'https://api.luminant.cl/luminant'

  /**
   * Returns the complete api url
   * @param path Must start with a `/`
   */
  public static setPath(path: string): string {
    return W2WAPI.baseLink + path
  }
}

export default class ProvidersHelper {
  public static readonly HttpClient = axios

  public static readonly LocalStorage = {
    sessionData: 'session'
  }
  public static readonly LocalOrder = {
    orderData: 'order',
  }
  public static readonly LocalOrderResponse = {
    orderResponse: 'response'
  }

  public static readonly keys = {
    api: {
      publicKey: 'pAxSz04efZ0rOKnI1yJ7Zd5WE6sZc1qg57bq8sXkXrEWqL3McLXy1O8mMSPnhdK0pCLso2gVzqjBiOkToX8wg190jBiUi5PI5bd9dwZIYXxlGTo4mjQOueIGSLnCo5gp',
      privateKey: ProvidersHelper.getPrivateToken
    },
    hubspot: {
      tracking: process.env.REACT_APP_KEY_HUBSPOT_TRACKING_KEY
    },
    google: {
      places: {
        autocomplete: process.env.REACT_APP_KEY_PLACES_AUTOCOMPLETE_PUBLIC_TOKEN ?? '',
        details: process.env.REACT_APP_KEY_PLACES_AUTOCOMPLETE_PUBLIC_TOKEN ?? ''
      },
      recaptcha: {
        v2: process.env.REACT_APP_KEY_GRECAPTCHA_V2_PUBLIC_TOKEN ?? '',
        v3: process.env.REACT_APP_KEY_GRECAPTCHA_V3_PUBLIC_TOKEN ?? ''
      }
    }
  }

  private static _baseHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  }

  public static getRequestHeaders(): DefaultRequestHeaders {
    return {
      ...ProvidersHelper._baseHeaders,
      Lang: 'en-US',
      Environment: process.env.NODE_ENV
    }
  }

  public static getDefaultRequestHeaders(): (typeof ProvidersHelper._baseHeaders) {
    return ProvidersHelper._baseHeaders
  }

  public static getPrivateToken(): string | null {
    const rawSessionData = CommonFunctions.Base64.decode(localStorage.getItem(ProvidersHelper.LocalStorage.sessionData) ?? '')
    if (rawSessionData) {
      const sessionData = JSON.parse(rawSessionData) as SessionData
      return sessionData.token
    }
    return null
  }
}
