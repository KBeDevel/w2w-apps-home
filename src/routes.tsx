import { Component } from 'react'
import RoutesMap from './helpers/routes-map.helper'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from './helpers/router.helper'
import { RouteConfig } from './types'

export default class Routes extends Component {

  private _routes: RouteConfig[] = []
  private _redirects: { from: string, to: string, strict?: boolean }[] = []

  constructor(
    props: never
  ) {
    super(props)
    this.getRoutesAndRedirects()
  }

  private getRoutesAndRedirects(): void {
    this._routes = []
    for (const routeId in RoutesMap) {
      const routeConfig = RoutesMap[routeId]
      this._routes.push(routeConfig)
      if (routeConfig.symlinks) {
        for (const symlink of routeConfig.symlinks) {
          this._redirects.push({
            from: symlink,
            to: routeConfig.path,
            strict: routeConfig.strict
          })
        }
      }
    }
  }

  private getRoutes(): JSX.Element[] {
    return this._routes.filter(
      route => route.path !== '**' // Prevents load of the default route. This allows the rendering of the redirects declared bellow
    ).map((route, index) => {
      if (route.strict) {
        return route.public
          ? <PublicRoute exact key={ index } path={ route.path } component={ route.component } />
          : <PrivateRoute exact key={ index } path={ route.path } component={ route.component } />
      }
      return <Route exact key={ index } path={ route.path } component={ route.component } />
    })
  }

  private getSymlinks(): JSX.Element[] {
    return this._redirects.map((redirect, index) => (
      <Redirect exact key={ index } from={ redirect.from } to={ redirect.to } strict={ redirect.strict } />
    ))
  }

  public render(): JSX.Element {
    return (
      <Switch>
        { this.getRoutes() }
        { this.getSymlinks() }
        <Route path={ RoutesMap.default.path } component={ RoutesMap.default.component } /> { /* Default route */ }
      </Switch>
    )
  }
}
