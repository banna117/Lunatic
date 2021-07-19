import React, {useEffect, useState} from "react";

import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.scss"
import ChatRooms from "./pages/ChatRooms";
import UserCreate from "./pages/UserCreate";

import { io } from "socket.io-client"

const URL = "http://localhost:4000";
const socket = io(URL, {autoConnect: false});


function App() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
    const [initRooms, setInitRooms] = useState([])

    //input을 통해 입력받은 username을 현재 클라이언트의 user변수에 집어넣고
    //username이 선택됐음을 알려 CharRooms가 렌더링되도록 한다.
    //현재 socket에 username을 넣어 서버에 알려준다. 서버에 연결한다.
    const addUser=(username)=> {
        setUser(username);

        setUsers((users)=>[...users, username]);
        setUsernameAlreadySelected(true);
        socket.auth = {username};
        socket.connect();
    }
    useEffect(()=>{
        socket.on("connect_error", (err)=>{
            if(err.message === "invalid username"){
                setUsernameAlreadySelected(false);
            }
        })

    }, [socket])
    
    return( 
    <div>
        <Router>
            <Route exact path="/">
                {!usernameAlreadySelected && <UserCreate addUser={addUser}/>}
                {usernameAlreadySelected && <ChatRooms user={user} initRooms={initRooms} socket={socket}/>}
            </Route>

        </Router>
    </div>
    )
}

export default App;
