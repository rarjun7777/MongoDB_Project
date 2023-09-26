// tests/auth.test.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const Session = require('../src/models/Session');

describe('Authentication API', () => {
  let user;
  let authToken;

  before(async () => {
    // Create a test user
    user = new User({
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
    });
    await user.save();

    // Log in the test user and get the authentication token
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });
    authToken = loginResponse.body.token;
  });

  after(async () => {
    // Clean up test data
    await User.deleteMany({});
    await Session.deleteMany({});
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'newuser@example.com', password: 'password', name: 'New User' });

    expect(response.status).to.equal(201);
    expect(response.body.token).to.exist;
  });

  it('should not allow duplicate user registration', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'password', name: 'Duplicate User' });

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('User already exists');
  });

  it('should log in a user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.exist;
  });

  // Add more test cases for logout, session management, and error scenarios
});
