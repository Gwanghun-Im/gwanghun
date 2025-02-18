"use client"

import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MarkdownTemplate } from "@/components/templates/MarkdownTemplate"
import { ToolsTemplate } from "@/components/templates/ToolsTemplate"
import ChatRoomTemplate from "@/components/templates/ChatRoomTemplate"
import useUserStore from "@/store/useUserStore"
import api from "@/lib/axios"

const MARK_DOWN_PAGE = "md"

export default function Main() {
  const [markdown, setMarkdown] = useState("")
  const router = useRouter()
  const { setUserName } = useUserStore()

  useEffect(() => {
    const introduce = `# hi there`
    setMarkdown(introduce)
  }, [])

  const move = () => {
    router.push(`/${MARK_DOWN_PAGE}/intro`)
  }

  const handleLogin = async (userName: string) => {
    try {
      const response = await api.get("/login", {
        params: {
          userName: userName,
        },
      })

      if (response.data.success) {
        setUserName(response.data.userName)
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error)
    }
  }

  if (!markdown) return <div>Loading...</div>

  return (
    <>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <img onClick={move} src="/pet.webp" alt="" />
      <ToolsTemplate />
      <MarkdownTemplate />
      <ChatRoomTemplate />
    </>
  )
}
