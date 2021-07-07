const express = require('express');
const cors = require('cors')
const http = require('http');
const app =  express();
const PORT = 4000;
const server = http.createServer(app);
const io = require("socket.io")(server
    ,{
    cors: {
        origin: "*",
        credentials:true
    }
});


io.on('connection', (socket)=> {
    console.log('사용자 접속:', socket.client.id)
    socket.on("message", ({ name, message }) => {

        io.emit("onChat", `${name}: ${message}`)
        console.log(name + message);
    })
    // socket.on("onJoin", ({ room, userName } )=> {
    //     socket.join(room);
    //     io.to(room).emit("onConnect", `${userName} entered ${room}`)
    //     console.log(userName +"is connected")

    //     socket.on("message", ({ name, message})=>{
        
    //         io.to(room).emit("onChat", `${name}: ${message}`)
    //         console.log(name + message);
    //     })
    //     socket.on("disconnect",()=>{
    //         socket.leave(room)
    //         io.to(room).emit("onDisconnect", `${userName} left ${room}`)
    //     })
    // })

})

server.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
