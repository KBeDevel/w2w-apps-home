export class Logger {
  private static displayDevInfo(): void {
    console.info('%cEnsure what you will do, any action executed here could expose your data and/or break the application', 'background: orange; color: black; font-size: x-large')
    console.info('%cIf you want to make a report or feedback, please go to https://gitlab.com/eclprojects/w2w-apps-home', 'background: black; color: white; font-size: large;')
  }

  public static showConsoleMessages(): void {
    Logger.displayDevInfo()
  }
}
