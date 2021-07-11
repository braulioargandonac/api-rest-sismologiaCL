const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'sismologia',
    port: '5432'
});

const createUsers = async (req, res) => {
    const { nombre, email, pass } = req.body;
    const response = await pool.query('insert into users (nombre, email, pass) values ($1, $2, $3)', [nombre, email, pass]);
    console.log(response);
    res.json({
        message: 'Usuario creado con exito',
        body:{
            user: {nombre, email, pass}
        }
    })
};

const getUsers = async (req, res) => {
   
    const response = await pool.query('select * from users');
    res.status(200).json(response.rows);
}

const getUsersById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * from users where id = $1', [id]);
    res.status(200).json(response.rows);
}

module.exports = {
    createUsers,
    getUsers,
    getUsersById
}

