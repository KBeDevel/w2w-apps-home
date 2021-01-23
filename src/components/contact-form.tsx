import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Functions from '../common/helpers/functions.helper';
import Swal from 'sweetalert2';
import '../styles/form.sass';

interface TextareaComponentState {
  fieldHeight: number
}

class ContactForm extends Component<Record<string, never>, TextareaComponentState> {
  private readonly DEFAULT_TEXTAREA_HEIGHT = 48;
  private readonly MESSAGE_MIN_LENGTH = 10;
  private readonly MESSAGE_MAX_LENGTH = 1500;
  private messageCharacterCounter = 0;

  constructor(
    props: never
  ) {
    super(props);
    this.state = {
      fieldHeight: this.DEFAULT_TEXTAREA_HEIGHT
    }
  }

  private capitalizeName(event: React.ChangeEvent): void {
    if (event.isTrusted) {
      const input = event.target as HTMLInputElement;
      input.value = input.value ? Functions.capitalize(input.value, 'full') : '';
    }
  }

  private handleMessageInputHeight(event: React.ChangeEvent): void {
    if (!(event.target as HTMLTextAreaElement).value) {
      this.setState({
        fieldHeight: this.DEFAULT_TEXTAREA_HEIGHT
      });
      return;
    }
    this.setState({
      fieldHeight: event.target.scrollHeight < this.DEFAULT_TEXTAREA_HEIGHT ? this.state.fieldHeight : event.target.scrollHeight
    });
  }
  
  private handleMessageTyping(event: React.ChangeEvent): void {
    if (event.isTrusted) {
      const input = event.target as HTMLTextAreaElement;
      this.messageCharacterCounter = input.value.length;
      input.value = input.value ? input.value[0].toLocaleUpperCase() + input.value.substr(1) : '';
    }
  }

  private handleFormSubmit(event: React.FormEvent): void {
    event.preventDefault();
    if (!(event.target as HTMLFormElement).reportValidity()) {
      const alert = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-warning rounded-0'
        },
        buttonsStyling: false
      });
      alert.fire({
        title: 'Please, fill the form',
        text: 'All the fields are required',
        icon: 'warning'
      });
    }
  }

  public render(): JSX.Element {
    return (
      <Container className="mb-5">
        <Row>
          <Col>
            <Form onSubmit={ this.handleFormSubmit }>
              <Form.Group controlId="contactName">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={ this.capitalizeName }
                  placeholder="John Doe"
                  required={ true } />
              </Form.Group>
              <Form.Group controlId="contactEmail">
                <Form.Label>Your email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="my@email.world"
                  required={ true } />
                <Form.Text className="text-muted">
                  We know your privacy is important, we will never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="contactMessage">
                <Form.Label>Type your message here</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={ 3 }
                  style={{ height: Math.floor(this.state.fieldHeight) }}
                  minLength={ this.MESSAGE_MIN_LENGTH }
                  maxLength={ this.MESSAGE_MAX_LENGTH }
                  onChange={ (event) => { this.handleMessageTyping(event); this.handleMessageInputHeight(event); } }
                  placeholder="I want to ask for..."
                  required={ true } />
                <Form.Text>
                  { this.messageCharacterCounter + `/${this.MESSAGE_MAX_LENGTH}` }
                </Form.Text>
              </Form.Group>
              <Button variant="dark" type="submit" disabled={ true }>
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ContactForm;
