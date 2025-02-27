import { GET, POST } from '@/app/api/user/route'
import { connectTestDB, closeTestDB } from '../utils/testDb'
import User from '@/models/User'
import { createMocks } from 'node-mocks-http'

jest.setTimeout(30000);

// Mock connectDB to avoid connecting to a real database
jest.mock('@/lib/connect-db', () => jest.fn())

// Mock the `auth()` function behavior
jest.mock('@/auth', () => ({
  auth: (handler) => async (req) => {
    req.auth = req.headers.authorization === 'Bearer valid-token' ? { user: { email: 'test@example.com' } } : null
    return handler(req)
  }
}))

describe('GET /api/user', () => {
  beforeAll(async () => {
    await connectTestDB()
    await User.create({ email: 'test@example.com' })
  })

  afterAll(async () => {
    await closeTestDB()
  })

  it('should return 401 if not authenticated', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    
    const response = await GET(req, res)

    const responseBody = await response.text()
    const responseJson = JSON.parse(responseBody)

    expect(response.status).toBe(401)
    expect(responseJson).toEqual({ message: 'Unauthorized' })
  })

  it('should return user data if authenticated', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        Authorization: 'Bearer valid-token',
      },
    })
    
    const response = await GET(req, res)

    const responseBody = await response.text()
    const responseJson = JSON.parse(responseBody)

    expect(response.status).toBe(200)
    expect(responseJson).toMatchObject({
      email: "test@example.com",
      group: 0,
          })
  })
})

describe('POST /api/user', () => {
  beforeAll(async () => {
    await connectTestDB()
    await User.create({ email: 'test@example.com', username: 'oldName' })
  })

  afterAll(async () => {
    await closeTestDB()
  })

  it('should return 401 if not authenticated', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    })
    
    req.json = jest.fn().mockResolvedValue({ name: 'newName' })

    const response = await POST(req, res)

    const responseBody = await response.text()
    const responseJson = JSON.parse(responseBody)

    expect(response.status).toBe(401)
    expect(responseJson).toEqual({ message: 'Unauthorized' })
  })

  it('should update user data if authenticated', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        Authorization: 'Bearer valid-token',
      },
    })
    
    req.json = jest.fn().mockResolvedValue({ name: 'newName' })

    const response = await POST(req, res)

    const responseBody = await response.text()
    const responseJson = JSON.parse(responseBody)

    expect(response.status).toBe(200)
    expect(responseJson).toEqual({ message: 'User POST request successful' })

    const updatedUser = await User.findOne({ email: 'test@example.com' })
    expect(updatedUser.username).toBe('newName')
  })
})
