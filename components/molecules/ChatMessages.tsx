"use client"
import { useRouterChange } from "@/hooks/useRouterChange"
import useChatMessageStore from "@/store/useChatMessageStore"
import useRoomStore from "@/store/useRoomStore"
import useUserStore from "@/store/useUserStore"
import { printDev } from "@/utils/system"
import dayjs from "dayjs"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

export default function ChatMessages() {
  const { messages, setMessages } = useChatMessageStore()
  const { userName } = useUserStore()
  const [lastKey, setLastKey] = useState(null)
  const { roomId } = useRoomStore()
  const { main } = useRouterChange()
  const messageEndRef = useRef(null)

  const fetchMessages = async () => {
    let url = `/api/chat/messages?roomId=${roomId}&limit=10`
    if (lastKey) url += `&lastKey=${encodeURIComponent(lastKey)}`
    const res = await fetch(url)
    const data = await res.json()
    printDev("InitMessages::", data)
    setMessages(data.messages)
    setLastKey(data.lastKey)
  }

  useEffect(() => {
    if (!roomId) return
    if (!messages.length) {
      fetchMessages()
    }
  }, [roomId])

  useEffect(() => {
    if (!main) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, main])

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto w-full">
      {/* 메시지 영역 */}
      <div className="flex-1 p-4 space-y-4">
        {messages.map((msg, idx) => {
          const isMine = msg.sender === userName
          return (
            <div
              key={idx}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              {!isMine && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                  {msg.sender.charAt(0)}
                </div>
              )}

              <div className="flex flex-col">
                {!isMine && (
                  <span className="text-xs text-gray-500 ml-2 mb-1">
                    {msg.sender}
                  </span>
                )}

                <div className="flex items-end gap-2">
                  {isMine && (
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {dayjs(msg.timestamp).format("HH:mm")}
                    </span>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[300px] shadow-sm
                      ${
                        isMine
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }
                    `}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {msg.message}
                    </div>
                  </div>

                  {!isMine && (
                    <span className="text-xs text-gray-400">
                      {dayjs(msg.timestamp).format("HH:mm")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messageEndRef} />
      </div>
    </div>
  )
}
