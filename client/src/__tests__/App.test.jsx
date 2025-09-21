import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App'

// Mock fetch
global.fetch = vi.fn()

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear()
    localStorage.clear()
  })

  it('renders login form initially', () => {
    render(<App />)
    expect(screen.getByText('🔐 Login')).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows demo credentials', () => {
    render(<App />)
    expect(screen.getByText('Demo Credentials:')).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText('password123')).toBeInTheDocument()
  })

  it('handles successful login', async () => {
    const mockResponse = {
      user: { name: 'Test User', email: 'test@example.com', role: 'admin' },
      token: 'fake-token'
    }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    render(<App />)
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'admin' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByText('🚀 Login'))

    await waitFor(() => {
      expect(screen.getByText('📊 Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Welcome, Test User!')).toBeInTheDocument()
    })
  })

  it('handles failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid credentials' })
    })

    // Mock alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<App />)
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wrong' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong' }
    })
    
    fireEvent.click(screen.getByText('🚀 Login'))

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Login failed: Invalid credentials')
    })

    alertSpy.mockRestore()
  })
})
