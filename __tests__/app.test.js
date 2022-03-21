const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sock = require('../lib/models/Sock');

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
  });

  it('gets a list of socks', async () => {
    const expected = await Sock.findAll();
    const res = await request(app).get('/api/v1/socks');
    expect(res.body).toEqual(expected);
  });

  it('gets a sock by id', async () => {
    const expected = await Sock.findById(1);
    const res = await request.agent(app).get(`/api/v1/socks/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a sock by id', async () => {
    const expected = {
      id: expect.any(String),
      brand: 'kroger',
      condition: 'whack',
      isPaired: false
    };
    const res = await request(app)
      .patch('/api/v1/socks/1')
      .send({ condition: 'whack' });
    expect(res.body).toEqual(expected);
  });

  it('deletes a sock based on id', async () => {
    const expected = await Sock.findById(1);
    const res = await request(app).delete(`/api/v1/socks/${expected.id}`);
    expect(res.body).toEqual(expected); 
  });

  
});
