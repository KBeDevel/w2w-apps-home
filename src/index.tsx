import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import Routes from './routes'
import ProvidersHelper from './helpers/providers.helper'
import { BrowserRouter as Router } from 'react-router-dom'
import { preloadScripts } from './helpers/index-preloader.helper'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
/**
 * Polyfill to enforce the smooth scroll behavior.
 * Specially usefull when the browser have this flag disabled
 */
import 'scroll-js'
import './styles/index.sass'

ReactDOM.render(
  <StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={ ProvidersHelper.keys.google.recaptcha.v3 }
      useEnterprise={ false }
      useRecaptchaNet={ false }
      scriptProps={{ appendTo: 'head' }} >
      <Router>
        <Routes />
      </Router>
    </GoogleReCaptchaProvider>
  </StrictMode>,
  document.getElementById('root')
)

preloadScripts()
reportWebVitals()
