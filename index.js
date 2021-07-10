const cheerio = require('cheerio');
const request = require('request-promise');

// arranca todo el script
 async function init(){
    const $ = await request({
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)  
    });

    const websiteTitle = $('tbody tr td');
    console.log(websiteTitle.text());
}

init();