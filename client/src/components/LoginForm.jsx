import React, { useState } from 'react'

const LoginForm = ({ onLogin, loading }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(credentials)
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>🔐 Login</h2>
      
      <div className="credentials-hint">
        <h4>Demo Credentials:</h4>
        <p><strong>Username:</strong> admin</p>
        <p><strong>Password:</strong> password123</p>
        <p><strong>Username:</strong> user</p>
        <p><strong>Password:</strong> userpass</p>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="login-btn"
        disabled={loading}
      >
        {loading ? '🔄 Logging in...' : '🚀 Login'}
      </button>
    </form>
  )
}

export default LoginForm
