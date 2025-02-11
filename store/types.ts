import { MessageResponse } from "@/components/organisms/ChatRoom"

export type ChatMessageType = {
  message: string
  setMessage: (data: string) => void
  messages: MessageResponse[]
  setMessages: (data: MessageResponse[]) => void
}

export type RoomType = {
  roomId: string
  setRoomId: (data: string) => void
}
