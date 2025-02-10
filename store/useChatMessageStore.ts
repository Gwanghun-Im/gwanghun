import { create } from "zustand"
import { ChatMessageType } from "./types"

// 1. Zustand 스토어 생성
const useChatMessageStore = create<ChatMessageType>((set) => ({
  message: "",
  setMessage: (text) => set({ message: text }),
  messages: [],
  setMessages: (data) =>
    set((state) => ({
      messages: [...state.messages, ...data],
    })),
}))

export default useChatMessageStore
