const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Mock user database (in real app, use proper database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    name: 'Administrator',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMye/lo9FD7NZEv2M7QJA0TyREj0KAEgWb2', // userpass
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user'
  }
]

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username and password are required' 
      })
    }

    // Find user
    const user = users.find(u => u.username === username)
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    )

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      message: 'Internal server error' 
    })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key')
    const user = users.find(u => u.id === decoded.userId)
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const { password: _, ...userWithoutPassword } = user
    res.json(userWithoutPassword)

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

module.exports = router
