"use client"
import dayjs from "dayjs"
import ChatRoom from "../organisms/ChatRoom"
import { Box, Typography } from "@mui/material"
import useRoomStore from "@/store/useRoomStore"
import { useEffect } from "react"
import Link from "next/link"

const ChatRoomTemplate = () => {
  const { setRoomId } = useRoomStore()
  const day = dayjs().format("YYYYMMDD")

  useEffect(() => {
    setRoomId(day)
  }, [setRoomId, day]) // ✅ 의존성 배열 추가

  return (
    <>
      <Typography variant="h5" gutterBottom>
        <Link href={"/chat"}>방명록(WebSocket)</Link>
      </Typography>
      <Box sx={{ margin: 5 }}></Box>
      <ChatRoom />
    </>
  )
}

export default ChatRoomTemplate
