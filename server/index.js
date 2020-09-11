const path = require('path');
var Twitter = require('twitter');
const express = require('express');
const {usuario} = require('./keys');
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "../public")));

const server = app.listen(app.get("port"), () =>{

    console.log("Server en el puerto", app.get("port"));
});

const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", (socket)=>{
    
    console.log("nueva conexion", socket.handshake.address);
    
    socket.on('pais',data=>{
        console.log("aqui");
        var client = new Twitter({            
            consumer_key: usuario.consumer_key,
            consumer_secret: usuario.consumer_secret,
            access_token_key: usuario.access_token_key,
            access_token_secret: usuario.access_token_secret
        });
        console.log("aqui1");
        var params = {screen_name: data};
        
        client.get('/users/show', params, function(error, data) {
            if (!error) {       
                socket.emit('localizacion', data['location'] || 'El usuario no tiene registrado su Ubicacion');
            }
        });
    
    });
});
