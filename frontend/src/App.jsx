import './App.css'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io.connect("http://localhost:5000")

function App() {

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault()
    if (!message) return;
    socket.emit("chat", { message })
    setMessage('')
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload])
    })
  })

  return (
    <>
      <h1>Hello World</h1>
      <h4>The Universal Chat Room!</h4>
      {chat.map((payload, index) => (
        <p key={index}>{payload.message}</p>
      ))}

      <form className='chat-form' onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <button type='submit'> Send </button>
      </form>
    </>
  )
}

export default App
