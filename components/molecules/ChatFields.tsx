import { useWebSocket } from "@/hooks/useWebSocket"
import useChatMessageStore from "@/store/useChatMessageStore"
import useUserStore from "@/store/useUserStore"
import { inputStyles } from "@/styles/atoms/input"
import { buttonStyles } from "@/styles/atoms/button"
import { chatFieldsStyles } from "@/styles/molecules/chatFields"
import clsx from "clsx"

export default function ChatFields() {
  const { message, setMessage } = useChatMessageStore()
  const { userName } = useUserStore()
  const { sendMessage } = useWebSocket()

  if (!userName) {
    return (
      <div>
        <h2 className="text-xl font-semibold">로그인을 수행해주세요!</h2>
      </div>
    )
  }

  return (
    <div className="flex gap-2 p-4 border-t border-gray-200">
      <input
        className="flex-1 px-4 py-2 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
          }
        }}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={sendMessage}
        disabled={!message.trim()}
      >
        전송
      </button>
    </div>
  )
}
