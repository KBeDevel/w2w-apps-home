import { Component } from 'react'
import AccountProvider from '../../providers/account.provider'

/**
 * Empty page. This should be used to import a W2W session
 */
export default class Session extends Component {
  public render(): JSX.Element {
    AccountProvider.sendSessionToParent()
    return <></>
  }
}
