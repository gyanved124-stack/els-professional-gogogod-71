const request = require('supertest')
const { app } = require('../server')

describe('Auth Endpoints', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'password123'
        })

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Login successful')
      expect(response.body.user.username).toBe('admin')
      expect(response.body.token).toBeDefined()
      expect(response.body.user.password).toBeUndefined()
    })

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrongpassword'
        })

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Invalid credentials')
    })

    it('should reject missing credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('Username and password are required')
    })
  })

  describe('GET /api/health', () => {
    it('should return server health status', async () => {
      const response = await request(app).get('/api/health')

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('OK')
      expect(response.body.message).toBe('Server is running!')
    })
  })
})
