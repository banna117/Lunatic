const express = require('express');
const http = require('http');
const app =  express();
const PORT = 4000;
const server = http.createServer(app);
const io = require("socket.io")(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


io.on('connection', (socket)=> {
    socket.on("message", ({name, message})=>{
        socket.join(name);
        io.to(name).emit("onConnect", `${name} 은 ${message}`)
        console.log(name + message);
    })
    console.log("a is connected")
    socket.on("disconnection",()=>{
        socket.leave(room);
        console.log("a is disconnected")
    })
})

server.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
