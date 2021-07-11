const { Router } = require('express');
const router = Router();

const { getUsers } = require('../index.controller')
//  router.get/'/users', (req, res) => {
//      res.send('users');

//  }

router.get('/users', getUsers);

module.exports = router;