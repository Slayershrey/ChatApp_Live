import React, { useState } from "react"
import SideDrawer from "../Components/miscellaneous/SideDrawer"
import MyChats from "../Components/MyChats"
import Chatbox from "../Components/Chatbox"
import { ChatState } from "../Context/ChatProvider"
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"

function ChatPage() {
  const { user } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}

export default ChatPage
