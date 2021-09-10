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
import Session from '../components/public/session'
import Logout from '../components/public/logout'
import { Quotation } from '../components/include/quotation'
import Calculator from '../components/private/calculator'
import ContactsForm from '../components/include/contacts-form'
import ContactsBook from '../components/private/contact-book'
import Quote from '../components/private/quote'
import Modal from '../components/include/modal'
import DetailOrder from '../components/private/detail-order'
import ShipmentSearcher from '../components/public/shipments-searcher'
import QuotationGrid from '../components/public/quotation-grid'
import PaymentAccepted from '../components/private/payment-accepted'
import PaymentRejected from '../components/private/payment-rejected'

const RoutesMap: { [routeId: string]: RouteConfig } = {
  home: {
    path: '/home',
    public: true,
    component: Home,
    strict: true,
  },
  session: {
    path: '/session',
    public: true,
    component: Session
  },
  logout: {
    path: '/logout',
    public: true,
    component: Logout
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
    strict: true,
    symlinks: [
      '/'
    ]
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
  quotation: {
    path: '/quotation',
    public: false,
    component: Quotation
  },
  calculator: {
    path: '/calculator',
    public: false,
    component: Calculator
  },
  contacts: {
    path: '/contacts-form',
    public: false,
    component: ContactsForm
  },
  contactBook: {
    path: '/contacts-book',
    public: false,
    component: ContactsBook
  },
  logisticOrder: {
    path: '/logistic-order',
    public: false,
    component: Quote
  },
  modal: {
    path: '/modal',
    public: false,
    component: Modal
  },
  detailOrder: {
    path: '/detail-order',
    public: false,
    component: DetailOrder
  },
  shipmentSearcher: {
    path: '/shipment-searcher',
    public: true,
    component: ShipmentSearcher
  },
  quotationGrid: {
    path: '/quotation/grid',
    public: true,
    component: QuotationGrid
  },
  rejectedPayment: {
    path: '/order/payment/rejected',
    public: true,
    component: PaymentRejected
  },
  aceptedPayment: {
    path: '/order/payment/accepted',
    public: true,
    component: PaymentAccepted
  },
  default: {
    path: '**', // Wildcard to receive any string as inner value
    public: true,
    component: NotFound
  },
}

export default RoutesMap
