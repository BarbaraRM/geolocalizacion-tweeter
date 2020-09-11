//const { text } = require("express");

const socket = io();

const user = document.getElementById('username')
const buttonSend = document.getElementById('consultar')
const outputMessage = document.getElementById('respuesta');
const texto = document.getElementById('texto');

buttonSend.addEventListener('click', function(e){ 
    if(user.value === ""){
        texto.value = "Ingrese una cuenta correcta"
    }else{
        socket.emit('pais', user.value.trim().toLowerCase().replace(" ",""))
    }
});

socket.on('localizacion',data=>{
    
    if(data === "El usuario no tiene registrado su Ubicacion"){
        texto.value= `${data}`;
    }else{
        outputMessage.value= `${data}`;
    }
   

});