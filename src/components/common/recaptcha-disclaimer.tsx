import { Component } from 'react'
import { Link } from 'react-router-dom'
import { CommonFunctions } from '../../helpers/common-functions.helper'

export default class RecaptchaDisclaimer extends Component {
  public render(): JSX.Element {
    return (
      <small className="text-muted">
        This site is protected by reCAPTCHA and the 
        Google <Link to={ `/redirect/${CommonFunctions.Base64.encode('https://policies.google.com/privacy')}` } target='_blank'>Privacy Policy</Link>&nbsp;and 
        &nbsp;<Link to={ `/redirect/${CommonFunctions.Base64.encode('https://policies.google.com/terms')}` } target="_blank">Terms of Service</Link> apply.
      </small>
    )
  }
}
