
import io  from "socket.io-client"
import ChatInput from "../components/ChatInput";
import ChatLog from "../components/ChatLog"
import React, {useState, useEffect} from "react";

export default function ChatPage(){
    const [userName, setUserName] = useState("기민수");
    const [ room, setRoom ] = useState("testRoom")
 
    const [ currentSocket, setCurrentSocket ] = useState("")

    useEffect(()=>{
        setCurrentSocket(io.connect("http://localhost:4000/"));
    },[])

    useEffect(()=>{
        if(currentSocket){
            currentSocket.on("connect", () => {
                currentSocket.emit("onJoin", {room, userName})
            });
        }
    },[currentSocket])


    return (
        <div className="chatting-page">
            {currentSocket ? 
            <>
                <ChatLog    
                    socket = {currentSocket}
                   />
                <ChatInput 
                    socket ={currentSocket}
                    userName = {userName}
                    />
            </>:
            <h1>Loading</h1>}

        </div>
    )
}