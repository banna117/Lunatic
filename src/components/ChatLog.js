import React, {useState, useEffect} from "react";

import io from "socket.io-client";

export default function ChatLog({ socket }) {
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        // messsgeItem : {msg: String, name: String, timeStamp: String}
        socket.on("onChat", (messageItem) => {
          setMsgList((msgList) => [...msgList, messageItem]);
          console.log(messageItem);
          console.log(msgList);
        });
        socket.on("onConnect", (systemMessage) => {
          setMsgList((msgList) => [...msgList, { message: systemMessage }]);
        });
        socket.on("onDisconnect", (systemMessage) => {
          setMsgList((msgList) => [...msgList, { message: systemMessage }]);
        });
        return () => {
          socket.disconnect();
        };
    }, [socket]);

    return (
        <div>
            {msgList.map((msg, idx) => (
                <div key={idx}>
                    <div>{msg.userName}</div>
                    <div>{msg.message}</div>
                </div>
            ))}
        </div>
    );

}

