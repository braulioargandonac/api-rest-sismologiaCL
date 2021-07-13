const { Pool } = require('pg');
const cheerio = require('cheerio');
const request = require('request-promise');


// arranca todo el script
const main = async (req, res) => {
    const resu = await request.get("http://www.sismologia.cl/links/ultimos_sismos.html");
    const $ = cheerio.load(resu);
    var array = [];
    $("tbody tr").each((index,element)=> {
        if(index===0){
            return true;
        }

        var sismo = {
            fecha_local: $($(element).find("td")[0]).text(),
            latitud: parseFloat($($(element).find("td")[2]).text()),
            longitud: parseFloat($($(element).find("td")[3]).text()),
            profundidad: parseInt($($(element).find("td")[4]).text()),
            magnitud: parseFloat($($(element).find("td")[5]).text()),
            referencia: $($(element).find("td")[7]).text()
        };
        array.push(sismo);
    });
    await updateSismos(array);
    try{
        const response = await pool.query('select * from sismo order by id;');
        await res.status(200).json(response.rows);
    }catch{
        res.status(401).json({
            message: 'Sin autorización',
        });
    }
}

 

const pool = new Pool({
    host: 'db',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: '5432'
});

const createUsers = async (req, res) => {
    try{
        const { nombre, email, pass } = req.body;
        const response = await pool.query('insert into users (nombre, email, pass) values ($1, $2, $3)', [nombre, email, pass]);
        console.log(response);
        res.json({
            message: 'Usuario creado con exito',
            body:{
                user: {nombre, email, pass}
            }
        })
    }catch{
        res.status(412).json({
            message: 'Precondición Fallida',
        });
    }
};

async function updateSismos(array){
    const response = await pool.query('select count(*) from sismo');
    if(response.rows[0].count > 14){
        for(let i=0; i<array.length; i++){
            const response1 = await pool.query('update sismo set fecha_local=$1, latitud=$2, longitud=$3, profundidad=$4, magnitud=$5, referencia=$6 where id=$7;', [array[i].fecha_local, array[i].latitud, array[i].longitud, array[i].profundidad, array[i].magnitud, array[i].referencia,i+1])
        }
    }else{
        for(let i=0; i<array.length; i++){
            const response2 = await pool.query('insert into sismo  (fecha_local, latitud, longitud, profundidad, magnitud, referencia) values ($1, $2, $3, $4, $5, $6)', [array[i].fecha_local, array[i].latitud, array[i].longitud, array[i].profundidad, array[i].magnitud, array[i].referencia ])
        }
    }
};

const getUsers = async (req, res) => {
    try{
        const response = await pool.query('select * from users');
        res.status(200).json(response.rows);
    }catch{
        res.status(401).json({
            message: 'Sin autorización',
        });
    }
}

const getSismosById = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await pool.query('select * from sismo where id = $1', [id]);
        res.status(200).json(response.rows);
    }catch{
        res.status(404).json({
            message: 'No se encuentra',
        });
    }
}

const getUsersById = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await pool.query('select * from users where id = $1', [id]);
        res.status(200).json(response.rows);
    }catch{
        res.status(404).json({
            message: 'No se encuentra',
        });
    }
}


module.exports = {
    getSismosById,
    createUsers,
    main,
    getUsers,
    getUsersById
}

