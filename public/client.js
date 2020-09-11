//const { text } = require("express");

const socket = io();

const user = document.getElementById('username')
const buttonSend = document.getElementById('consultar')
const outputMessage = document.getElementById('respuesta');
const texto = document.getElementById('texto');

buttonSend.addEventListener('click', function(e){ 
    if(user.value === ''){
        texto.innerHTML  = 'Ingrese una cuenta correcta'
    }else{
        socket.emit('pais', user.value.trim().toLowerCase().replace(" ",""))
        texto.innerHTML  = ''
    }
});

socket.on('localizacion',data=>{
    
    if(data === 'El usuario no tiene registrado su Ubicacion'){
        texto.innerHTML = `${data}`;
    }else{
        outputMessage.value= `${data}`;
        texto.innerHTML  = ''
    }  
});
