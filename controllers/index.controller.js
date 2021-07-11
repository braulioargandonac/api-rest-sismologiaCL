const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'sismologia',
    port: '5432'
});

const getUsers = async (req, res) => {
   
    const response = await pool.query('select * from users');
    res.status(200).json(response.row);
}

module.exports = {
    getUsers
}

