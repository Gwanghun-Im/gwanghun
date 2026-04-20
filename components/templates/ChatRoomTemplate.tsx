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
  }, [setRoomId, day])

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
        <Link href="/chat" style={{ textDecoration: "none", color: "inherit" }}>
          💬 방명록
        </Link>
      </Typography>
      <ChatRoom />
    </Box>
  )
}

export default ChatRoomTemplate
