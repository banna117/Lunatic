import React,  {useState} from "react"

export default function UserCreate({addUser}){
    const [userName, setUserName]=useState("");


    return(
        <div>
            <input placeholder="닉네임을 입력하세요" onChange={(e)=>setUserName(e.target.value)}></input>
            <button onClick={()=>addUser(userName)}>입장하기</button>
        </div>
    )
}