import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from './home'

describe('test home view layout load', () => {

  test('try simple load', () => { // Important for first user experience
    render(
      <Router>
        <Home />
      </Router>
    )
  })

  test('should have banner', () => {
    render(
      <Router>
        <Home />
      </Router>
    )
    expect(Array.from(document.getElementsByClassName('main-banner')).length).toBeGreaterThan(0)
  })

  test('should have direct links', () => {
    render(
      <Router>
        <Home />
      </Router>
    )
    expect(screen.getByText('Direct links')).toBeInTheDocument
  })

  test('should show create account links', () => {
    render(
      <Router>
        <Home />
      </Router>
    )
    const createAccountButtonsQuantity = screen.getAllByText('Create Free Account').length
    expect(createAccountButtonsQuantity).toBeGreaterThanOrEqual(2)
  })
  
  test('try route component layout', () => {
    render(
      <Router>
        <Home />
      </Router>
    )
    expect(document.getElementsByTagName('nav')).toBeTruthy
    expect(document.getElementsByTagName('footer')).toBeTruthy
  })
})
