const { Router } = require('express');
const Card = require('../models/Card');

module.exports = Router()

  .post('/', async (req, res) => {
      const card = await Card.insert(req.body);
      res.send(card);
  })

  .get('/', async (req, res) => {
      const cards = await Card.findAll();
      res.send(cards);
  })

  .get('/:id', async (req, res, next) => {
      try {
          const card = await Card.findById(req.params.id);
          res.send(card);
      } catch (error) {
          error.status = 404;
          next(error);
      }
  })