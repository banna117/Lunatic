import React from 'react';

export default function ChatFormat(props){
    const {messFromServer} = props.messFromServer;
    return(
        <div>
            <text>{messFromServer}</text>
        </div>
    )
}