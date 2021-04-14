import { Logger } from './logger.helper'
import ProvidersHelper from './providers.helper'

export const preloadScripts: () => void = () => {

  const injectHubspotTracking = (): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const hsScript = document.createElement('script')
      hsScript.id = 'hs-script-loader'
      hsScript.type = 'text/javascript'
      hsScript.async = true
      hsScript.defer = false
      hsScript.src = `//js.hs-scripts.com/${ProvidersHelper.keys.hubspot.tracking}.js`
      hsScript.onload = resolve
      if (document.getElementById('hs-script-loader')) {
        reject('Script already injected')
      } else {
        document.body.appendChild(hsScript)
      }
    })
  }

  const removeNoScriptElements = () => {
    const elementsCollection = window.document.body.getElementsByTagName('noscript')
    for (const element of Array.from(elementsCollection)) {
      window.document.body.removeChild(element)
    }
  }

  injectHubspotTracking()
  removeNoScriptElements()
  Logger.showConsoleMessages()
}
