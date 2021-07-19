import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

import "./LoginPage.scss"


export default function LoginPage(props) {
    const history = useHistory();

    const setUser  = props.setUser
    const [ID, setID] = useState("");
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false);

    //테스트 데이터베이스 - 나중엔 데이터베이스와 연결!
    const db=[{
        id:"testuser",
        password:"1234"
    }]

    useEffect(()=>{
        document.getElementById("visibility").type = "password";

    },[])

    function handleVisible(){
        if(visible){
            document.getElementById("visibility").type = "password";
            setVisible(false);
        }
        else{
            document.getElementById("visibility").type = "text";
            setVisible(true);
        }
    }

    function login() {
        var found = 0;
        //ID or Password is missing
        if(!ID || !password){
            alert("아이디와 패스워드를 입력하세요")
            // return <SystemMessage message=" 아이디와 패스워드를 입력하세요 "/>
        }
        //find matching id and password from database
        db.map((info)=>{
            if(info.id === ID && info.password === password){
                found = 1;//아이디와 패스워드를 찾음
            }
        })
        if(found){
            //홈페이지로 돌아간다. 
            setUser(ID);
            return history.push("/home");
        }
        else{
            
            alert("잘못된 아이디 또는 패스워드 입니다");
        }
    }
    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="login-text">LOGIN</h1>
                <input  className="input-id" 
                        type="id" 
                        placeholder="아이디를 입력해주세요." 
                        onChange={(e) => setID(e.target.value)}>                            
                </input>
                <div className="password-box">
                    <input className="input-password" 
                            id="visibility" 
                            placeholder="비밀 번호를 입력해주세요."    
                            onChange={(e) => setPassword(e.target.value)}>
                    </input>
                    <button className={visible ? "password-visible" : "password-not-visible"}  onClick={handleVisible}></button>
                </div>
                <button className="login-btn" onClick={login}>LOGIN</button>
            </div>
        </div>
    )
}