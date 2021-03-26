import React, { Component, MouseEvent} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormControlProps } from 'react-bootstrap/FormControl'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../styles/password-field.sass'

type PasswordState = {
  visible: boolean
}

export default class PasswordField extends Component<FormControlProps & React.HTMLProps<HTMLInputElement>, PasswordState> {

  constructor(
    props: (FormControlProps & React.HTMLProps<HTMLInputElement>) | Readonly<FormControlProps & React.HTMLProps<HTMLInputElement>>
  ) {
    super(props)
    this.state = {
      visible: false
    }
  }

  public toggleVisibility(event: MouseEvent): void {
    if (event.isTrusted) {
      this.setState({
        ...this.state,
        visible: !this.state.visible
      })
    }
  }

  public render(): JSX.Element {
    return (
      <InputGroup>
        <Form.Control
          { ...this.props }
          type={ this.state.visible ? 'text' : 'password' } />
        <Button
          className="password-toggler"
          variant="outline-secondary"
          disabled={ this.props.disabled }
          title={
            (this.state.visible
              ? 'Hide'
              : 'Show') + ' password'
          }
          onClick={ (event) => { this.toggleVisibility(event) } } >
          {
            this.state.visible
              ? <FontAwesomeIcon icon={ faEyeSlash } />
              : <FontAwesomeIcon icon={ faEye } />
          }
        </Button>
      </InputGroup>
    )
  }
}
