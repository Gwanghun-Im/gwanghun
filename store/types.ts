import { MessageResponse } from "@/components/organisms/ChatRoom"
import { Dispatch, SetStateAction } from "react"

export type ChatMessageType = {
  message: string
  setMessage: (data: string) => void
  messages: MessageResponse[]
  setMessages: (data: MessageResponse[]) => void
}
