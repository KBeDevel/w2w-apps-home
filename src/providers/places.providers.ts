import ProvidersHelper from '../helpers/providers.helper'

class PlacesProviderHelper {
  private static verifyLibraryLoad(): boolean {
    if (!window.google) return false
    if (!window.google.maps) return false
    if (!window.google.maps.places) return false
    return true
  }

  private static async libraryInjection(apiKey = ProvidersHelper.keys.google.places.details): Promise<void> {
    if (!PlacesProviderHelper.verifyLibraryLoad()) {
      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true

      const onScriptLoad = () => {
        if (!PlacesProviderHelper.verifyLibraryLoad()) {
          throw new Error('Library not loaded')
        }
        script.removeEventListener('load', onScriptLoad)        
      }

      script.addEventListener('load', onScriptLoad)
      document.body.appendChild(script)
    }
  }

  public static async initializeService(): Promise<void> {
    await PlacesProviderHelper.libraryInjection()
  }
}

export default class PlacesProvider {
  public readonly rawAddress: { [name: string]: { tag: 'short_name' | 'long_name', value: string | undefined } } = {
    street_number: {
      tag: 'long_name',
      value: undefined
    },
    route: {
      tag: 'long_name',
      value: undefined
    },
    sublocality_level_1: {
      tag: 'long_name',
      value: undefined
    },
    locality: {
      tag: 'long_name',
      value: undefined
    },
    administrative_area_level_1: {
      tag: 'long_name',
      value: undefined
    },
    administrative_area_level_2: {
      tag: 'long_name',
      value: undefined
    },
    postal_code: {
      tag: 'long_name',
      value: undefined
    }
  }
  
  public static async getDetailsByPlaceId(placeId: string): Promise<google.maps.places.PlaceResult> {
    await PlacesProviderHelper.initializeService()
    return await new Promise((resolve, reject) => {

      const auxiliarWrapper = document.createElement('div') // Create a hidden HTMLDivElement for PlacesService
      auxiliarWrapper.id = 'aux-places-wrapper-' + Date.now()
      auxiliarWrapper.hidden = true
      document.body.appendChild(auxiliarWrapper)

      const placesClient = new google.maps.places.PlacesService(auxiliarWrapper)
      placesClient.getDetails({
        placeId
      }, (result, status) => {
        if (status === 'OK' && result) {
          resolve(result)
        } else {
          reject(status)
        }
      })

      document.body.removeChild(auxiliarWrapper) // Remove hidden HTMLDIvElement
    })
  }
}
