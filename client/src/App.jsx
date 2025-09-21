import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (credentials) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        localStorage.setItem('token', userData.token)
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert(`Login failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Starter Kit App</h1>
        {user && (
          <div className="user-info">
            Welcome, {user.name}! 
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </header>
      
      <main className="App-main">
        {user ? (
          <Dashboard user={user} />
        ) : (
          <LoginForm onLogin={handleLogin} loading={loading} />
        )}
      </main>
    </div>
  )
}

export default App
