"use client"

import { Paper, Typography } from "@mui/material"
import ChatInput from "../molecules/ChatFields"
import useRoomStore from "@/store/useRoomStore"
import ChatMessages from "../molecules/ChatMessages"

export type MessageResponse = {
  roomId: string
  sender: string
  message: string
  timestamp: number
}

export default function ChatRoom() {
  const { roomId } = useRoomStore()

  return (
    <Paper
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
        {roomId} 채팅방
      </Typography>
      <ChatMessages />
      <ChatInput />
    </Paper>
  )
}
