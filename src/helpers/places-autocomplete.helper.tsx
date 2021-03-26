/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'react-bootstrap/Image'
import { components } from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import PoweredByGoogle from '../assets/img/brands/powered_by_google_on_white_hdpi.png'

export const showPoweredByGoogleHelper = (props: any): JSX.Element => {
  return (
    <components.Menu { ...props } >
      { props.children }
      <div className="p-2 text-right bg-light">
        <small>
          <Image className="img-fluid" style={{ height: '1.2em' }} src={ PoweredByGoogle } />
        </small>
      </div>
    </components.Menu>
  )
}

export const loadingIndicatorPatch = (): JSX.Element => {
  return (
    <FontAwesomeIcon icon={ faSyncAlt } spin style={{ color: '#ced4da', marginRight: '.5rem' }} />
  )
}
