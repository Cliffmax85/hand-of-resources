const { Router } = require('express');
const Fish = require('../models/Fish');

module.exports = Router()

  .post('/', async (req, res) => {
    const fish = await Fish.insert(req.body);
    res.send(fish);
  })

  .get('/', async (req, res) => {
      const fish = await Fish.findAll();
      res.send(fish);
  })
  
  .get('/:id', async (req, res, next) => {
      try {
          const fish = await Fish.findById(req.params.id);
          res.send(fish);
      } catch (error) {
          error.status = 404;
          next(error);
      }
  })


