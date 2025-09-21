const request = require('supertest')
const jwt = require('jsonwebtoken')
const { app } = require('../server')

describe('Dashboard Endpoints', () => {
  let authToken

  beforeEach(() => {
    // Create a valid token for testing
    authToken = jwt.sign(
      { userId: 1, username: 'admin', role: 'admin' },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1h' }
    )
  })

  describe('GET /api/dashboard/stats', () => {
    it('should return stats with valid token', async () => {
      const response = await request(app)
        .get('/api/dashboard/stats')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.totalUsers).toBeDefined()
      expect(response.body.totalPosts).toBeDefined()
      expect(response.body.totalViews).toBeDefined()
      expect(typeof response.body.totalUsers).toBe('number')
    })

    it('should reject request without token', async () => {
      const response = await request(app).get('/api/dashboard/stats')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Access token required')
    })

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/dashboard/stats')
        .set('Authorization', 'Bearer invalid-token')

      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Invalid or expired token')
    })
  })
})
