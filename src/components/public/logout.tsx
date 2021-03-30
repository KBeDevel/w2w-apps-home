import { Component } from 'react'
import AccountProvider from '../../providers/account.provider'
import { EmptyProps } from '../../types'

export default class Logout extends Component<EmptyProps> {
  public render(): JSX.Element {
    AccountProvider.closeSession(true)
    return <></>
  }
}
