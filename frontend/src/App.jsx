import { useState } from "react"
import { Button, ButtonGroup } from "@chakra-ui/react"

import "./App.css"
import { Routes, Route } from "react-router-dom"
import ChatPage from "./Pages/ChatPage"
import Homepage from "./Pages/Homepage"

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage></Homepage>}>
            {" "}
          </Route>
          <Route path="/chats" element={<ChatPage></ChatPage>}>
            {" "}
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
