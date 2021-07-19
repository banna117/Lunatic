import React, {useEffect, useState} from "react";
import RoomBox from "../components/RoomBox";


export default function ChatRooms({user, socket}){
    const [rooms, setRooms] = useState([])
    const [roomName, setRoomName] = useState("");

    const addRoom = ()=> {
        socket.emit("addRoom", roomName)
    }

    useEffect(()=>{
        //onInit을 통해 받은 현재 서버에 존재하는 room들의 리스트를 받아
        //이를 초기 값으로 설정한다.
        socket.on("onInit", rooms=>{
            setRooms(rooms);
        })
        socket.on("addRoom", rooms => {
            setRooms(rooms);
        })
    },[socket])

    return (
        <div className="rooms-list">
            <h1>{user}</h1>
            <div className="add-room-button">
                <button onClick={addRoom}>방 만들기</button>
                <input onChange={(e)=>setRoomName(e.target.value)}></input>
            </div>
            {rooms.map((room,idx) => {
                return <RoomBox key ={idx} roomName={room}/>;
            })}
        </div>
    )
}