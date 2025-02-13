"use client"

import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MarkdownTemplate } from "@/components/templates/MarkdownTemplate"
import { ToolsTemplate } from "@/components/templates/ToolsTemplate"
import ChatRoomTemplate from "@/components/templates/ChatRoomTemplate"

const MARK_DOWN_PAGE = "md"

export default function Main() {
  const [markdown, setMarkdown] = useState("")
  const router = useRouter()

  useEffect(() => {
    const introduce = `# hi there`
    setMarkdown(introduce)
  }, [])

  const move = () => {
    router.push(`/${MARK_DOWN_PAGE}/intro`)
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
