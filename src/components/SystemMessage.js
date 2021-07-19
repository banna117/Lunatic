import React from "react"
import { Style } from "util"

export default  function SystemMessage({message}){
    return <h1 style="z-index = 10" className="system-message">{message}</h1>
}