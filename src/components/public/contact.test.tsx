import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import ContactUs from './contact-us'

describe('test contact form', () => {
  test('check form controls', () => {
    render(
      <Router>
        <ContactUs />
      </Router>
    )
    expect(screen.getByText('Your name')).toBeInTheDocument
    expect(screen.getByRole('textbox', {
      name: 'Your name'
    })).toBeInTheDocument

    expect(screen.getByText('Your email')).toBeInTheDocument
    expect(screen.getByRole('textbox', {
      name: 'Your email'
    })).toBeInTheDocument

    expect(screen.getByText('Type your message')).toBeInTheDocument
    expect(screen.getByRole('textbox', {
      name: 'Type your message'
    })).toBeInTheDocument

    expect(screen.getByText('Send', {
      exact: true
    })).toBeInTheDocument
  })
})
