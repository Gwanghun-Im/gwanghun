import { create } from "zustand"
import { ChatMessageType } from "./types"

// 1. Zustand 스토어 생성
const useChatMessageStore = create<ChatMessageType>((set) => ({
  message: "",
  setMessage: (text: string) => set({ message: text }),
  messages: [],
  setMessages: (data) =>
    set((state) => ({
      messages:
        typeof data === "function"
          ? data(state.messages) // 함수형 업데이트
          : data, // 직접 값 할당
    })),
}))

export default useChatMessageStore
