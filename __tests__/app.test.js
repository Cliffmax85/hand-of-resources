const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a sock', async () => {
    const expected = {
      brand: 'Gold toe',
      condition: 'mostly useless',
      isPaired: true,
    };
    const res = await request(app).post('/api/v1/socks').send(expected);
    
    expect(res.body).toEqual({
      id: expect.any(String), ...expected })
  })
});
