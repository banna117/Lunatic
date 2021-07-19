const express = require('express');
const cors = require('cors')
const http = require('http');
const app =  express();
const PORT = 4000;
const server = http.createServer(app);
const io = require("socket.io")(server
    ,{
    cors: {
        origin: "http://localhost:3000",
        credentials:true
    }
});

var rooms = [];

io.use((socket, next)=>{
    const username = socket.handshake.auth.username;
    if(!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
})

io.on("connection", (socket) => {
    //처음 들어왔을 때 현재 서버에 존재하는 room들을 클라이언트로 보내 알려준다.
    io.emit("onInit", rooms);
    //방을 만들면 rooms에 방 이름을 추가
    socket.on("addRoom", roomName => {
        if(!(roomName in rooms))
        rooms.push(roomName);
        io.emit("addRoom", rooms)
    })
})


// app.get('/', (req, res)=>{
//     res.send("Hello World!")
// })

// io.on('connection', (socket)=> {
//     console.log('사용자 접속:', socket.client.id)

//     socket.on("onJoin", ({ room, userName } )=> {
//         socket.join(room);
//         io.to(room).emit("onConnect", `${userName} entered.`)
//         console.log(userName +"is connected")

//         socket.on("message", (msgItem)=>{
        
//             io.to(room).emit("onChat", msgItem)
//             console.log(msgItem);
//         })
//         socket.on("disconnect",()=>{
//             socket.leave(room)
//             io.to(room).emit("onDisconnect", `${userName} left.`)
//         })
//     })

// })

server.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
