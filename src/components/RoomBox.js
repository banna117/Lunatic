import React from "react"
export default function RoomBox({ roomName }) {
    const users = ["기민수", "함창수", "김창민", "박세영"]
    const testF = () => {
        console.log(roomName);
    }
    return (
        <div onClick={testF} className="room-box">
            <div className="box-top">
                <h1>{roomName}</h1>
                <h1>{users[0] + " 외 " + (users.length - 1) + "명"}</h1>
            </div>
            <div className="box-bottom">
                <textarea ></textarea>
            </div>
        </div>
    )
}