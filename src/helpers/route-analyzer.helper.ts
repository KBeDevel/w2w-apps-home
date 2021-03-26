export class RouteAnalyzerHelper {
  private static _currentPath = () => {
    return window.location.pathname
  }

  public static isPathEqualsTo(path: string): boolean {
    if (path.includes(':')) {
      const literalPath = path.split(':')[0]
      path = literalPath
    }
    return RouteAnalyzerHelper._currentPath().includes(path)
  }
}
