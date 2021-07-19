import React, {useState, useEffect} from 'react'

export default function ChatInput({ socket, userName}) {
    const [ message, setMessage ] = useState("")

    const send =() => {
        socket.emit("message", { userName, message})
    }

    return (
        <div className="chat-input">
            <input placeholder="message 입력!" onChange={(e) => setMessage(e.target.value)}></input>
            <button onClick={send}>보내기</button>
        </div>
    )
}