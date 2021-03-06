const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/socks', require('./controllers/socks'));
app.use('/api/v1/games', require('./controllers/games'));
app.use('/api/v1/books', require('./controllers/books'));
app.use('/api/v1/cards', require('./controllers/cards'));
app.use('/api/v1/fish', require('./controllers/fishes'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
