import { Component } from 'react'
import Button, { ButtonProps } from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { SubmitButtonProps } from '../../helpers/form.helper'

type SubmitButtonState = {
  isSubmitting: boolean | undefined
}

export default class SubmitButton extends Component<SubmitButtonProps & ButtonProps, SubmitButtonState> {

  private _buttonProps: ButtonProps | undefined = undefined

  constructor(
    props: (SubmitButtonProps & ButtonProps) | Readonly<SubmitButtonProps & ButtonProps>
  ) {
    super(props)
    this.state = this.initState()
    this.filterButtonProps()
  }

  private initState(): SubmitButtonState {
    return {
      isSubmitting: this.props.isSubmitting
    }
  }

  private filterButtonProps(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isSubmitting, disableIf, buttonText, ...buttonProps } = this.props
    this._buttonProps = buttonProps as ButtonProps
  }

  public componentDidUpdate(prevProps: (SubmitButtonProps & ButtonProps) | Readonly<SubmitButtonProps & ButtonProps>): void {
    if(prevProps.isSubmitting !== this.props.isSubmitting) {
      this.setState({
        ...this.state,
        isSubmitting: this.props.isSubmitting
      })
    }
  }

  public render(): JSX.Element {
    return (
      <Button
        { ...this._buttonProps }
        disabled={ this.props.isSubmitting || this.props.disableIf }
        type="submit" >
        {
          this.state.isSubmitting
            ? <FontAwesomeIcon icon={ faSyncAlt } spin={ true }></FontAwesomeIcon>
            : this.props.buttonText
        }
      </Button>
    )
  }
}
