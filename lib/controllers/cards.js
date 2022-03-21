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