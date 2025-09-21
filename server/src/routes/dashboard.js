const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

// Get dashboard stats
router.get('/stats', authenticateToken, (req, res) => {
  try {
    // Mock data - in real app, fetch from database
    const stats = {
      totalUsers: Math.floor(Math.random() * 1000) + 100,
      totalPosts: Math.floor(Math.random() * 500) + 50,
      totalViews: Math.floor(Math.random() * 10000) + 1000
    }

    res.json(stats)
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
})

// Get user activity
router.get('/activity', authenticateToken, (req, res) => {
  try {
    const activities = [
      {
        id: 1,
        action: 'User logged in',
        timestamp: new Date().toISOString(),
        user: req.user.username
      },
      {
        id: 2,
        action: 'Dashboard accessed',
        timestamp: new Date().toISOString(),
        user: req.user.username
      }
    ]

    res.json(activities)
  } catch (error) {
    console.error('Activity error:', error)
    res.status(500).json({ message: 'Failed to fetch activity' })
  }
})

module.exports = router
