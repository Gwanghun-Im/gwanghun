"use client"
import dayjs from "dayjs"
import ChatRoom from "../organisms/ChatRoom"
import { Box } from "@mui/material"
import useRoomStore from "@/store/useRoomStore"
import { useEffect } from "react"

const ChatRoomTemplate = () => {
  const { setRoomId } = useRoomStore()
  const day = dayjs().format("YYYYMMDD")

  useEffect(() => {
    setRoomId(day)
  }, [setRoomId, day]) // ✅ 의존성 배열 추가

  return (
    <>
      <Box sx={{ margin: 5 }}></Box>
      <ChatRoom />
    </>
  )
}

export default ChatRoomTemplate
