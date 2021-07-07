import React from 'react';

export default function ChatFormat(props){
    const {mess} = props.mess;
    return(
        <div>
            <h1>{mess}</h1>
        </div>
    )
}