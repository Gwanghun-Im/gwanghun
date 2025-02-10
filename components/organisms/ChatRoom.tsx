"use client"
import { lazy, Suspense, useEffect, useState } from "react"
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material"
// import ChatMessages from "../molecules/ChatMessages"
import ChatInput from "../molecules/ChatFields"
import useChatMessageStore from "@/store/useChatMessageStore"

const ChatMessages = lazy(() => import("../molecules/ChatMessages"))

type ChatMessage = {
  action: "sendmessage" // ✅ API Gateway에서 설정한 routeKey와 동일해야 함
  roomId: string
  sender: string
  message: string
}

export type MessageResponse = {
  roomId: string
  sender: string
  message: string
  timestamp: number
}

export default function ChatRoom({ roomId }: { roomId: string }) {
  const { message, setMessage, messages, setMessages } = useChatMessageStore()
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    // 🟢 WebSocket 연결 설정
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL)

    ws.onopen = () => console.log("✅ WebSocket Connected")
    ws.onmessage = (event) => {
      console.log("✅ WebSocket Messages")

      try {
        if (event.data) {
          const data: MessageResponse = JSON.parse(event.data)
          setMessages([data])
        }
      } catch (error) {
        console.error("🚨 메시지 파싱 오류:", error)
      }
    }
    ws.onclose = () => console.log("🔴 WebSocket Disconnected")

    setSocket(ws)
    return () => ws.close() // 🔌 컴포넌트 언마운트 시 WebSocket 해제
  }, [])

  const sendMessage = () => {
    if (socket && message.trim()) {
      console.log("🛜 Send Messages")
      const payload: ChatMessage = {
        action: "sendmessage",
        roomId,
        sender: "user1",
        message,
      }

      socket.send(JSON.stringify(payload))

      setMessage("")
    }
  }

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
        <Suspense fallback={<div>...Loading</div>}>
          <ChatMessages roomId={roomId} />
        </Suspense>

        {/* 입력 필드 및 전송 버튼 */}
        <ChatInput sendMessage={sendMessage} />
      </Paper>
    </Container>
  )
}
