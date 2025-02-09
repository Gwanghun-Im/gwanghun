"use client"
import { useEffect, useState } from "react"
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

type ChatMessage = {
  action: "sendmessage" // ✅ API Gateway에서 설정한 routeKey와 동일해야 함
  roomId: string
  sender: string
  message: string
}

type WebSocketResponse = {
  roomId: string
  sender: string
  message: string
  timestamp: number
}

export default function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [lastKey, setLastKey] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchMessages = async () => {
    if (loading) return
    setLoading(true)

    let url = `/api/chat/messages?roomId=${roomId}&limit=10`
    if (lastKey) url += `&lastKey=${encodeURIComponent(lastKey)}`

    const res = await fetch(url)
    const data = await res.json()
    setMessages((prev) => [...prev, ...data.messages])
    setLastKey(data.lastKey)
    setLoading(false)
  }

  useEffect(() => {
    // 메세지 가져오기
    if (!messages.length) {
      fetchMessages()
    }

    // 🟢 WebSocket 연결 설정
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL)

    ws.onopen = () => console.log("✅ WebSocket Connected")
    ws.onmessage = (event) => {
      console.log("✅ WebSocket Messages")

      try {
        if (event.data) {
          const data: WebSocketResponse = JSON.parse(event.data)
          setMessages((prev) =>
            prev.some((msg) => msg.timestamp === data.timestamp)
              ? prev
              : [data, ...prev]
          )
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
        <List sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
          {messages.map((msg, idx) => (
            <ListItem
              key={idx}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "user1" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  bgcolor:
                    msg.sender === "user1" ? "primary.light" : "grey.300",
                }}
              >
                <>
                  <ListItemText
                    primary={
                      <Typography variant="body1">{msg.message}</Typography>
                    }
                    secondary={
                      <Typography variant="caption">{msg.sender}</Typography>
                    }
                  />
                </>
              </Paper>
            </ListItem>
          ))}
        </List>

        {/* 입력 필드 및 전송 버튼 */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            전송
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
