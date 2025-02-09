"use client"
import { useEffect, useState } from "react"

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

export default function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [socket, setSocket] = useState(null)
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
    fetchMessages()

    // 🟢 WebSocket 연결 설정
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL)

    ws.onopen = () => console.log("✅ WebSocket Connected")
    ws.onmessage = (event) => {
      console.log("✅ WebSocket Messages")

      try {
        const data: WebSocketResponse = JSON.parse(event.data)
        setMessages((prev) => [data, ...prev]) // 최신 메시지를 추가
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
    <div>
      <button onClick={fetchMessages} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
      <ul>
        {messages.map((msg) => (
          <li key={msg.timestamp}>
            <strong>{msg.sender}: </strong> {msg.message}
          </li>
        ))}
      </ul>
      {/* <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div> */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  )
}
