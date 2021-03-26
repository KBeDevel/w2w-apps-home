import Crypto from 'crypto-js'

export enum PasswordStatus {
  invalid = 'invalid',
  weak = 'weak',
  enough = 'enough',
  secure = 'secure'
}

export const Default = {
  INPUT_MIN_LENGTH: 8,
  ENABLED_CHARS: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-'
}

export class CommonFunctions {
  public static readonly Base64 = {
    /**
     * Alias for JavaScript function `btoa()`
     */
    encode: (dataToEncode: string): string => {
      return btoa(dataToEncode)
    },
    /**
     * Alias for JavaScript function `atob()`
     */
    decode: (encodedData: string): string => {
      return atob(encodedData)
    }
  }

  public static readonly SHA512 = {
    create: (content: string): string => {
      return Crypto.SHA512(content).toString()
    }
  }

  /**
   * Update the document title
   * @param newTitle Specific document title to update
   * @param baseTitle Common document title (optional)
   */
  public static updatePathTitle(newTitle?: string, baseTitle = process.env.REACT_APP_BASE_TITLE): void {
    for (const titleElement of Array.from(document.getElementsByTagName('title'))) {
      titleElement.remove()
    }
    document.title = `${newTitle ?? ''}${baseTitle ? ' - ' + baseTitle : ''}`
  }

  public static injectQueryParams(params: { [param: string]: string | number }): string {
    let queryParams = ''
    for (const key in params) {
      const queryParam = `${key}=${params[key]}`
      let unionCharacter = '&'
      if (queryParams.length === 0) {
        unionCharacter = '?'
      }
      queryParams += unionCharacter + queryParam
    }
    return queryParams
  }

  public static getCurrentYear(): number {
    return new Date().getFullYear()
  }

  /**
   * Capitalize a `string`
   * @param stringToCapitalize `string` to be capitalized
   * @param mode Set `simple` to upper case the first letter or `full` to capitalize each word. By default is `simple`
   */
  public static capitalize(stringToCapitalize: string, mode: 'simple' | 'full' = 'simple'): string {
    if (mode === 'full') {
      const words = stringToCapitalize.toLowerCase().split(' ')
      for (const word of words) {
        const newWord = word.charAt(0).toUpperCase() + word.substring(1)
        words[words.indexOf(word)] = newWord
      }
      return words.join(' ')
    } else {
      const lowerCaseText = stringToCapitalize.trim().toLowerCase() // Remove empty characters
      return lowerCaseText[0].toUpperCase() + lowerCaseText.substr(1)
    }
  }

  public static isTextBox(input: HTMLInputElement): boolean {
    return input.type === 'text' || input.type === 'email' || input.type === 'number' || input.type === 'password'
  }

  /**
   * Evaluate the password security level returning a `PasswordStatus` enumerator value
   * @param password A password string to be evaluated
   */
  public static checkPasswordSecurity(password: string): PasswordStatus {
    const strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
    const mediumRegex = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g')
    const enoughRegex = new RegExp('(?=.{6,}).*', 'g')
    if (strongRegex.test(password) && password.length >= Default.INPUT_MIN_LENGTH) {
      return PasswordStatus.secure
    }
    if (mediumRegex.test(password) && password.length >= Default.INPUT_MIN_LENGTH) {
      return PasswordStatus.enough
    }
    if (enoughRegex.test(password) && password.length >= Default.INPUT_MIN_LENGTH) {
      return PasswordStatus.weak
    }
    return PasswordStatus.invalid
  }

  /**
   * Return a random string
   * @param length Length of the string to be returned
   * @param allowedChars String which contains the allowed characters to be assigned to the final returned string
   */
  public static randomString(length = 6, allowedChars = Default.ENABLED_CHARS): string {
    let str = ''
    while (length > 0) {
      str += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
      length--
    }
    return str
  }
}
