const express = require("express");
const app = express(); // se ejecuta la funcion express
const jwt = require("jsonwebtoken"); // importamos a jsonwebtoken
const moment = require('moment');
let os = require('os');
const cors = require('cors');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

let respuesta = () => {
    let fecha = moment().format('MMMM Do YYYY, h:mm:ss a');
    let texto = `Nombre host: ${os.hostname()}, Os: ${os.type()}, Version Node.js: ${process.version}, Fecha: ${fecha}`;
    return texto;
}

app.get('/', function(req, res){
    let mensaje = respuesta();
    res.send(mensaje);
})

// ruta de los datos obtenidos de sismologia
app.use(require('./controllers/routes/index'));




//ruta del usuario

/**
 * @param request
 * @param response
 */
app.get("/api", (req, res) => {
    res.json({
        mensaje: "Nodejs and JWT"
    })
})

app.post("/api/login", (req, res) => {
    const user = {    // se crea el objeto usuario
        id: 1,
        nombre: "kevin",
        email: "kevin.salinasv@utem.cl"
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '60s'} ,(err, token) => { // expiresIn hace que el token expire en un determinado tiempo
        res.json({
            token // token: token
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
                authData // authData: authData
            })
        }
    })
})


//Authorization: Bearer <token>
function verifyToken(req, res, next){ // encargada de verificar si realmente el usuario esta enviando un token o no
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){ // verificamos si el token existe
        const bearerToken = bearerHeader.split(" ")[1]; // accedemos al elemento token
        req.token = bearerToken; // almacenamos el token
        next(); // se ejecuta la funcion next() cuando todo lo anterior resulta exitoso
    }else{
        res.sendStatus(403); // si el token es invalido se muestra la respuesta 403 "Forbidden"
    }
}

app.listen(3000, function(){ // utilizamos el puerto 3000
    console.log("nodejs app running... ");
})



