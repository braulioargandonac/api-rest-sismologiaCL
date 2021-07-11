//const { urlencoded } = require("express");
const express = require("express");
//const jwt = require("jsonwebtoken");

const app = express();



// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));
/*app.get("/api", (req, res) => {
    res.json({
        mensaje: "Node and JWT"
    })
})

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "kevin",
        email: "kevin.salinasv@utem.cl"
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '32s'} ,(err, token) => {
        res.json({
            token
        })
    });

});

app.post("/api/posts", verifyToken, (req, res) => {
    
    jwt.verify(req.token, 'secretkey', (error, authData) =>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Post fue creado",
                authData
            })
        }
    })
})

//Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

/*app.listen(3000, function(){
    console.log("nodejs app running... ");
})*/

app.listen(3000);
console.log('puerto 3000');

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'sismologia',
    port: '5432'
});

const getUsers = async (req, res) => {
   
    const response = await pool.query('select * from users');
    console.log(response.rows);
    res.send('users');
    
    //res.status(200).json(response.row);
}

module.exports = {
    getUsers
}