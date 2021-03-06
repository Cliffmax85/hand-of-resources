const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sock = require('../lib/models/Sock');
const Game = require('../lib/models/Game');
const Book = require('../lib/models/Book');
const Fish = require('../lib/models/Fish');
const Card = require('../lib/models/Card');
const { findById } = require('../lib/models/Card');

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

  it('creates a game', async () => {
    const expected = {
      name: 'Golden Tee',
      system: 'Arcade'
    };
    const res = await request(app).post('/api/v1/games').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected })
  });

  it('creates a book', async () => {
    const expected = {
      title: 'george of jungle',
      pages: 8888,
    };
    const res = await request(app).post('/api/v1/books').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected })
  });

  it('creates a card', async () => {
    const expected = {
      value: 'Q',
      color: 'red',
    };
    const res = await request(app)
      .post('/api/v1/cards')
      .send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected })
  });

  it('creates a fish', async () => {
    const expected = {
      name: 'fly',
      type: 'green',
    };
    const res = await request(app)
      .post('/api/v1/fish')
      .send(expected);
    
    expect(res.body).toEqual({ id: expect.any(String), ...expected })
  });

  it('gets a list of socks', async () => {
    const expected = await Sock.findAll();
    const res = await request(app).get('/api/v1/socks');
    expect(res.body).toEqual(expected);
  });

  it('gets a list of fish', async () => {
    const expected = await Fish.findAll();
    const res = await request(app).get('/api/v1/fish');
    expect(res.body).toEqual(expected);
  })

  it('gets a list of books', async () => {
    const expected = await Book.findAll();
    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual(expected);
  })

  it('gets a list of games', async () => {
    const expected = await Game.findAll();
    const res = await request(app).get('/api/v1/games');
    expect(res.body).toEqual(expected);
  });

  it('gets a list of cards', async () => {
    const  expected = await Card.findAll();
    const res = await request(app).get('/api/v1/cards');
    expect(res.body).toEqual(expected);
  });

  it('gets a sock by id', async () => {
    const expected = await Sock.findById(1);
    const res = await request(app).get(`/api/v1/socks/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('gets a fish by id', async () => {
    const expected = await Fish.findById(2);
    const res = await request(app).get(`/api/v1/fish/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('gets a game by id', async () => {
    const expected = await Game.findById(2);
    const res = await request(app).get(`/api/v1/games/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('gets a book by id', async () => {
    const expected = await Book.findById(1);
    const res = await request(app).get(`/api/v1/books/${expected.id}`);

    expect(res.body).toEqual({ ...expected }); 
  });

  it('gets a card by id', async () => {
    const expected = await findById(2);
    const res = await request(app).get(`/api/v1/cards/${expected.id}`);

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

  it('updates a fish by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'gary',
      type: 'tuna'
    };
    const res = await request(app)
      .patch('/api/v1/fish/1')
      .send({ type: 'tuna' });
    expect(res.body).toEqual(expected);
  })

  it('updates a game based on id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'super mario 3',
      system: 'game cube'
    };
    const res = await request(app)
      .patch('/api/v1/games/1')
      .send({ system: 'game cube' });
    expect(res.body).toEqual(expected);
  });

  it('updates a book based on id', async () => {
    const expected = {
      id: expect.any(String),
      title: 'star trek wars',
      pages: 101010
    };
    const res = await request(app)
      .patch('/api/v1/books/2')
      .send({ pages: 101010 });
    expect(res.body).toEqual(expected);
  });

  it('updates a card based on id', async () => {
    const expected = {
      id: expect.any(String),
      value: '3',
      color: 'pink'
    };
    const res = await request(app)
      .patch('/api/v1/cards/3')
      .send({ color: 'pink' });
    expect(res.body).toEqual(expected);
  });

  it('deletes a sock based on id', async () => {
    const expected = await Sock.findById(1);
    const res = await request(app).delete(`/api/v1/socks/${expected.id}`);
    expect(res.body).toEqual(expected); 
  });

  it('deletes a game by id', async () => {
    const expected = await Game.findById(1);
    const res = await request(app).delete(`/api/v1/games/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('deletes a game based on id', async () => {
    const expected = await Book.findById(2);
    const res = await request(app).delete(`/api/v1/books/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('deletes a card based on id', async () => {
    const expected = await Card.findById(1);
    const res = await request(app).delete(`/api/v1/cards/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('deletes a fish by id', async () => {
    const expected = await Fish.findById(1);
    const res = await request(app).delete(`/api/v1/fish/${expected.id}`);
    expect(res.body).toEqual(expected);
  })
});
