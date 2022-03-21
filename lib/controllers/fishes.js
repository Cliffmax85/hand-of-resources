const { Router } = require('express');
const Fish = require('../models/Fish');

module.exports = Router()

  .get('/', async (req, res) => {
      const fish = await Fish.findAll();
      res.send(fish);
  })