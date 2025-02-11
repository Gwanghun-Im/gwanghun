"use client"
import { lazy, Suspense } from "react"
import { Container, Paper, Typography } from "@mui/material"
// import ChatMessages from "../molecules/ChatMessages"
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
    <Container>
      <Paper
        sx={{ height: "80vh", display: "flex", flexDirection: "column", p: 2 }}
      >
        {/* 채팅방 헤더 */}
        <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
          {roomId} 채팅방
        </Typography>

        {/* 채팅 메시지 리스트 */}
        <ChatMessages />

        {/* 입력 필드 및 전송 버튼 */}
        <ChatInput />
      </Paper>
    </Container>
  )
}
