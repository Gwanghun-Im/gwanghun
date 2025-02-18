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
    <div className={chatFieldsStyles.container}>
      <input
        className={clsx(inputStyles.base, inputStyles.states)}
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
        className={clsx(
          buttonStyles.base,
          buttonStyles.primary,
          buttonStyles.states,
          buttonStyles.disabled
        )}
        onClick={sendMessage}
        disabled={!message.trim()}
      >
        전송
      </button>
    </div>
  )
}
