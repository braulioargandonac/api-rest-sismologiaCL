const { Router } = require('express');
const router = Router();

const { createUsers, getUsers, getUsersById, getSismosById, main} = require('../index.controller')

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get('/earthquakes', main);
router.get('/earthquakes/:id', getSismosById);
router.get('/users/:id', getUsersById);

module.exports = router;