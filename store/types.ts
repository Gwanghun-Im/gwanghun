import { MessageResponse } from "@/components/organisms/ChatRoom"

export type ChatMessageType = {
  message: string
  setMessage: (data: string) => void
  messages: MessageResponse[]
  setMessages: (
    data: MessageResponse[] | ((prev: MessageResponse[]) => MessageResponse[])
  ) => void
}

export type RoomType<T> = {
  roomId: T
  setRoomId: (data: T) => void
}

export type UserType = {
  connectionId: string
  userName: string
  setConnectionId: (text: string) => void
  setUserName: (text) => void
}
