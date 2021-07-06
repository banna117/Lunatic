import React, {useState, useEffect} from "react";

import io from "socket.io-client"
import socketIOClient from "socket.io-client"
import ChatFormat from "./components/ChatFormat";



function App() {
    const [ name, setName ] =useState("");
    const [ message, setMessage ] = useState("")
    var [ socket, setSocket ] = useState()
    const [ messFromServer, setMessFromServer]=useState('');

    useEffect(()=>{
        socket= io("/", { transports: ['websocket']})
        setSocket(socket);
    },[])

    const send =() => {
        socket.emit("message", {name: name, message:message})
        socket.on("onConnect",(mess)=>{
            // return <ChatFormat message={mess}/>
            return <p>{mess}</p>
        })
    }

    return (
        <div>
            <input placeholder="name 입력!" onChange={(e) => setName(e.target.value)}></input>
            <input placeholder="message 입력!" onChange={(e) => setMessage(e.target.value)}></input>
            <button onClick={send}>보내기</button>
        </div>
    )
}

export default App;
