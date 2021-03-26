import { RouteConfig } from '../types'
import Home from '../components/public/home'
import Services from '../components/public/services'
import ContactUs from '../components/public/contact-us'
import TermsOfService from '../components/public/terms-of-service'
import PrivacyPolicy from '../components/public/privacy-policy'
import SignIn from '../components/public/sign-in'
import SignUp from '../components/public/sign-up'
import FinishSignUp from '../components/public/finish-sign-up'
import Redirector from '../components/public/redirect'
import Forbidden from '../components/errors/403'
import NotFound from '../components/errors/404'
import Profile from '../components/private/profile'
import Dashboard from '../components/private/dashboard'
import SessionPrinter from '../components/public/session'

const RoutesMap: { [routeId: string]: RouteConfig } = {
  home: {
    path: '/home',
    public: true,
    component: Home,
    strict: true,
    symlinks: [
      '/'
    ]
  },
  session: {
    path: '/session',
    public: true,
    component: SessionPrinter
  },
  services: {
    path: '/services',
    public: true,
    component: Services,
  },
  contact: {
    path: '/contact',
    public: true,
    component: ContactUs
  },
  termsOfService: {
    path: '/terms-of-service',
    public: true,
    component: TermsOfService,
    symlinks: [
      '/tos'
    ]
  },
  privacyPolicy: {
    path: '/privacy-policy',
    public: true,
    component: PrivacyPolicy,
    symlinks: [
      '/pp'
    ]
  },
  signIn: {
    path: '/sign-in',
    public: true,
    component: SignIn,
    strict: true
  },
  signUp: {
    path: '/create-account',
    public: true,
    component: SignUp,
    strict: true,
    symlinks: [
      '/sign-up'
    ]
  },
  signUpFinish: {
    path: '/finish-sign-up/:token',
    public: true,
    component: FinishSignUp,
    strict: true,
    symlinks: [
      '/sign-up-finish/:token',
      '/complete-profile/:token',
      '/confirm-sign-up/:token'
    ]
  },
  redirect: {
    path: '/redirect/:destinationHash',
    public: true,
    component: Redirector
  },
  profile: {
    path: '/profile',
    public: false,
    component: Profile,
    strict: true
  },
  dashboard: {
    path: '/dashboard',
    public: false,
    component: Dashboard,
    strict: true
  },
  forbidden: {
    path: '/forbidden',
    public: true,
    component: Forbidden
  },
  default: {
    path: '**', // Wildcard to receive any string as inner value
    public: true,
    component: NotFound
  },
}

export default RoutesMap
