class Functions {
  public static updateTitle(newTitle?: string, baseTitle = 'Apps - We to World | World Trade Center Fort Lauderdale'): void {
    document.title = `${newTitle ?? ''}${baseTitle ? ' - ' + baseTitle : ''}`;
  }

  public static getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Capitalize a `string`
   * @param stringToCapitalize `string` to be capitalized
   * @param mode Set `simple` to upper case the first letter or `full` to capitalize each word. By default is `simple`
   */
  public static capitalize(stringToCapitalize: string, mode: 'simple' | 'full' = 'simple'): string {
    if (mode === 'full') {
      const splitStr = stringToCapitalize.toLowerCase().split(' ');
      for (const word of splitStr) {
        splitStr[splitStr.indexOf(word)] = splitStr[splitStr.indexOf(word)].charAt(0).toUpperCase() + splitStr[splitStr.indexOf(word)].substring(1);
      }
      return splitStr.join(' ');
    } else {
      const lowerCaseText = stringToCapitalize.trim().toLowerCase(); // Remove empty characters
      return lowerCaseText[0].toUpperCase() + lowerCaseText.substr(1);
    }
  }
}

export default Functions;
