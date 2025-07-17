import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { socket } from '../lib/socket'
const SocketContext= createContext()



function SocketContextProvider({children}) {

useEffect(()=>{
  console.log(socket);
  
socket.on('connect',()=>{
  console.log('connected to socket io server',socket.id);
  
})
 

},[socket])

const value={
  socket
}
  return (
    <SocketContext.Provider value={value} >
      {
        children
      }
    </SocketContext.Provider>
  )
}

export default SocketContextProvider