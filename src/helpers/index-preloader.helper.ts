import { Logger } from './logger.helper'

export const preloadScripts: () => void = () => {

  const removeNoScriptElements = () => {
    const elementsCollection = window.document.body.getElementsByTagName('noscript')
    for (const element of Array.from(elementsCollection)) {
      window.document.body.removeChild(element)
    }
  }

  removeNoScriptElements()
  Logger.showConsoleMessages()
}
