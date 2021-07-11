const cheerio = require('cheerio');
const request = require('request-promise');

// arranca todo el script
async function main(){
    const res = await request.get("http://www.sismologia.cl/links/ultimos_sismos.html");
    const $ = cheerio.load(res);
    var array = [];
    $("tbody tr").each((index,element)=> {
        if(index===0){
            return true;
        }

        //se me ocurrió guardar todo en un objeto "sismo"
        //en el formato en el que debería ser guardado
        //cada objeto se guarda en el Array pero podría directamente
        //guardarse en una base de datos, sería ideal...
        //probar con npm run devb

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
    console.log(array);
}
 
main();