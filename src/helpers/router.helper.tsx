import { Component } from 'react'
import MainNavbar from '../components/common/navbar'
import MainFooter from '../components/common/footer'
import AccountProvider from '../providers/account.provider'
import RoutesMap from './routes-map.helper'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { CommonFunctions } from './common-functions.helper'
import '../styles/route-layout.sass'

export default class RouterOutline {
  public static set(children: JSX.Element, className?: string | undefined): JSX.Element {
    return (
      <>
        <MainNavbar></MainNavbar>
        <div className={ 'router-component ' + className }>{ children }</div>
        <MainFooter></MainFooter>
      </>
    )
  }
}

export class PublicRoute extends Component<RouteProps> {
  public render(): JSX.Element {
    if (AccountProvider.isAuthenticated()) {
      return <Redirect to={ RoutesMap.dashboard.path } />
    }
    return <Route { ...this.props } />
  }
}

export class PrivateRoute extends Component<RouteProps> {
  public render(): JSX.Element {
    if (!AccountProvider.isAuthenticated()) {
      return <Redirect to={ RoutesMap.forbidden.path + CommonFunctions.injectQueryParams({
        resource: CommonFunctions.Base64.encode(this.props.path as string)
      }) } />
    }
    return <Route { ...this.props } />
  }
}
