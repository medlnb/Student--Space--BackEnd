const http = require("http")
const express = require("express")

const app01 = express();  
const server = http.createServer(app01);

const io = require('socket.io')(server, { origins: '*:*'});


io.on("connection", () => {
    console.log("Connected!");
});

server.listen(3001);

module.exports = io;
