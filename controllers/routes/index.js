const { Router } = require('express');
const router = Router();

const { createUsers, getUsers, getUsersById } = require('../index.controller')
//  router.get/'/users', (req, res) => {
//      res.send('users');

//  }

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get('/users/:id', getUsersById);

module.exports = router;