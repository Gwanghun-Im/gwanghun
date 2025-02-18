import { useCallback, useEffect, useState } from "react"
import useChatMessageStore from "@/store/useChatMessageStore"
import { MessageResponse } from "@/components/organisms/ChatRoom"
import useRoomStore from "@/store/useRoomStore"
import { printDev } from "@/utils/system"
import useUserStore from "@/store/useUserStore"

type ChatMessage = {
  action: "sendmessage" // ✅ API Gateway에서 설정한 routeKey와 동일해야 함
  roomId: string
  sender: string
  message: string
}

export function useWebSocket() {
  const { message, setMessage, setMessages } = useChatMessageStore()
  const { userName } = useUserStore()
  const { roomId } = useRoomStore()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isSending, setIsSending] = useState(false)

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
    if (socket && message.trim() && !isSending) {
      setIsSending(true)
      printDev("🛜 Send Messages", { roomId })

      const payload: ChatMessage = {
        action: "sendmessage",
        roomId, // ✅ 최신 roomId 사용
        sender: userName,
        message,
      }

      socket.send(JSON.stringify(payload))
      setMessage("")

      // 메시지 전송 후 짧은 딜레이 동안 추가 전송 방지
      setTimeout(() => {
        setIsSending(false)
      }, 100)
    }
  }, [socket, message, roomId, setMessage, isSending])

  return { socket, sendMessage }
}
