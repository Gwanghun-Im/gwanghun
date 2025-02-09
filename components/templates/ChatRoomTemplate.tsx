import dayjs from "dayjs"
import ChatRoom from "../organisms/ChatRoom"
import { Box } from "@mui/material"

const ChatRoomTemplate = () => {
  const day = dayjs().format("YYYYMMDD")
  return (
    <>
      <Box sx={{ margin: 5 }}></Box>
      <ChatRoom roomId={day} />
    </>
  )
}

export default ChatRoomTemplate
