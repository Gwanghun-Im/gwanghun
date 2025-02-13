import { useCallback, useEffect, useState } from "react"
import useChatMessageStore from "@/store/useChatMessageStore"
import { MessageResponse } from "@/components/organisms/ChatRoom"
import useRoomStore from "@/store/useRoomStore"
import { printDev } from "@/utils/system"

type ChatMessage = {
  action: "sendmessage" // ✅ API Gateway에서 설정한 routeKey와 동일해야 함
  roomId: string
  sender: string
  message: string
}

export function useWebSocket() {
  const { message, setMessage, setMessages } = useChatMessageStore()
  const { roomId } = useRoomStore()
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    // 🟢 WebSocket 연결 설정
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL)

    ws.onopen = () => printDev("✅ WebSocket Connected")
    ws.onmessage = (event) => {
      printDev("✅ WebSocket Messages")

      try {
        if (event.data) {
          const data: MessageResponse = JSON.parse(event.data)
          setMessages([data])
        }
      } catch (error) {
        console.error("🚨 메시지 파싱 오류:", error)
      }
    }
    ws.onclose = () => printDev("🔴 WebSocket Disconnected")

    setSocket(ws)
    return () => ws.close() // 🔌 컴포넌트 언마운트 시 WebSocket 해제
  }, [])

  // 🔥 최신 roomId를 참조하는 sendMessage
  const sendMessage = useCallback(() => {
    if (socket && message.trim()) {
      printDev("🛜 Send Messages", { roomId })

      const payload: ChatMessage = {
        action: "sendmessage",
        roomId, // ✅ 최신 roomId 사용
        sender: "user1",
        message,
      }

      socket.send(JSON.stringify(payload))
      setMessage("")
    }
  }, [socket, message, roomId, setMessage])

  return { socket, sendMessage }
}
