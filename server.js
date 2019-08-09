const json = require('./teammates');
const http = require('http');
const fs = require('fs');
const path = require('path');
const urls = [{
        ruta: '',
        salida: 'index.html'
    },
    {
        ruta: 'aboutUs',
        salida: 'aboutUs.html'

    },
    {
        ruta: 'contactUs',
        salida: 'contactUs.html'

    },
    {
        ruta: 'danielSalgado',
        jsonData: '1',
        salida: 'persons.html'

    }
    ,
    {
        ruta: 'adiela',
        jsonData: '2',
        salida: 'persons.html'

    }
    ,
    {
        ruta: 'uriel',
        jsonData: '3',
        salida: 'persons.html'

    }
    ,
    {
        ruta: 'juanAlirio',
        jsonData: '4',
        salida: 'persons.html'

    }

    
];
const people = [
    {   "id":"1",
        "names": "Daniel",
        "lastName": "Salgado",
        "address": "Cr 76 # 5-33",
        "phone": "3133049099",
        "email": "angiecortes29@gmail.com",
        "hobbies": ['Jugar futbol', 'video juegos', 'leer'],
        "favoriteColors": ['azul todos', 'negro', 'magenta']
    },
     {
        "id":"2",
        "names": "Adiela",
        "lastName": "lopez peña",
        "address": "Cr 95a #138-65",
        "phone": "9303010",
        "email": "lumos.solem15@gmail.com",
        "hobbies": ['cantar', 'cazar moscas'],
        "favoriteColors": ['rosa', 'negro', 'purpura']
    },
     {
        "id":"3",
        "names": "Uriel",
        "lastName": "Ardila Gomez",
        "address": "tr 14 m bis # 68a - 21 sur",
        "phone": "7682545",
        "email": "urielardila@hotmail.com",
        "hobbies": ['leer', 'baloncesto', 'programar'],
        "favoriteColors": ['rojo', 'verde', 'negro']
    },
     {
        "id":"4",
        "names": "Juan Alirio",
        "lastName": "Gomez",
        "address": "Carretera central del norte km 17",
        "phone": "6763097",
        "email": "juanaliriogomez@gmail.com",
        "hobbies": ['jardineria', 'artesanias', 'manualidades'],
        "favoriteColors": ['no prioridad por algún color']
    }
];

console.log("Before createServer()");
// console.log(http);
http.createServer((req, res) => {
    console.log("req :" +  req);
    console.log("res :" + res.toString());

    console.log("Listening to port 3000");
    //console.log(JSON.stringify(req))

    let router = path.basename(req.url) //identifica la ruta de acceso -  tododlo q venga depues del /
    console.log("wtf : " +req.url)
    urls.forEach((posicion) => {
        console.log(posicion.ruta == router);
        console.log(JSON.stringify(posicion).toString())
        let htmlText = ""
        let newData = ""

        if ((posicion.ruta.toString()) == router.toString()) {
            flag = true;
            fs.readFile(posicion.salida, (er, data) => {
                htmlText = data.toString();

             
                people.forEach((daa) => {
                    if( daa.id.toString() == posicion.jsonData.toString()) {
                        console.log(daa)
                        //res.write(daa);
                         newData = data.toString();

                        let interpolation = newData.match(/[^\{\}]+(?=\})/g);
                        let name = daa.names;
                        let lastname = daa.lastName;
                        let address = daa.address;
                        let phone = daa.phone;
                        let email = daa.email;
                        let hobbies = daa.hobbies;
                        let favoriteColors = daa.favoriteColors;

                        console.log(interpolation);
                        for(let i = interpolation.length - 1; i >=0; i--) {
                            let value = eval(interpolation[i]);
                            newData = newData.replace("{"+ interpolation[i] + "}",value);
                        }
       
                    } 

                    // console(people)
                })

                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                        
                    })
                    console.log(newData);
                    res.end(newData ? newData: htmlText);

            })

        }   

    })
}).listen(3000);
