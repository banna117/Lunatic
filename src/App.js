import React, {useState, useEffect} from "react";

import io  from "socket.io-client"
import "./App.scss"
import ChatFormat from "./components/ChatFormat";


const socket = io.connect("http://localhost:4000/")

function App() {
    const [ name, setName ] =useState("");
    const [ message, setMessage ] = useState("")
    const [ chat, setChat ] = useState([])

    useEffect(()=>{
        socket.on('onChat', (mess)=>{
            setChat([...chat, mess]);
            console.log("i am here")
            
        })
    })


    const send =() => {
        socket.emit("message", { name: name, message:message})
    }

    return (
        <div className="chatting-page">
            <div className="chat-log">
                {chat.map((mess, index) => {
                    
                    return <div key={index}>{mess}</div>
                   
                })}
            </div>
            <div className="chat-input">
                <input placeholder="name 입력!" onChange={(e) => setName(e.target.value)}></input>
                <input placeholder="message 입력!" onChange={(e) => setMessage(e.target.value)}></input>
                <button onClick={send}>보내기</button>
            </div>
        </div>
    )
}

export default App;
