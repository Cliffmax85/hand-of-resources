const { Router } = require('express');
const Sock = require('../models/Sock');

module.exports = Router()

  .post('/', async(req, res) => {
      const sock = await Sock.insert(req.body);
      res.send(sock);
  })
  
  .get('/', async (req, res) => {
      const socks = await Sock.findAll();
      res.send(socks);
  })
  
  .get('/:id', async (req, res, next) => {
      try {
          const sock = await Sock.findById(req.params.id);
          res.send(sock);
      } catch (error) {
          error.status = 404;
          next(error);
      }
  })

  .patch('/:id', async (req, res) => {
      const sock = await Sock.updateById(req.params.id, req.body);
      res.send(sock);
  })
  ;