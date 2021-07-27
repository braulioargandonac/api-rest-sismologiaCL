const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { createUsers, getUsers, getUsersById, getSismosById, main} = require('../index.controller')

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get('/grupo-f/earthquakes', main);
router.get('/grupo-f/earthquakes/:id', getSismosById);
router.get('/users/:id', getUsersById);



app.use('/', router);

module.exports = app;
