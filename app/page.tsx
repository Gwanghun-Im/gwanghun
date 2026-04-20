"use client"

import { useEffect } from "react"
import { MarkdownTemplate } from "@/components/templates/MarkdownTemplate"
import { ToolsTemplate } from "@/components/templates/ToolsTemplate"
import { GreedFearIndexTemplate } from "@/components/templates/GreedFearIndexTemplate"
import ChatRoomTemplate from "@/components/templates/ChatRoomTemplate"
import { HeroTemplate } from "@/components/templates/HeroTemplate"
import { ProjectsTemplate } from "@/components/templates/ProjectsTemplate"
import useUserStore from "@/store/useUserStore"
import api from "@/lib/axios"

export default function Main() {
  const { setUserName } = useUserStore()

  useEffect(() => {
    const handleLogin = async (userName: string) => {
      try {
        const response = await api.get("/login", { params: { userName } })
        if (response.data.success) {
          setUserName(response.data.userName)
        }
      } catch (error) {
        console.error("로그인 중 오류 발생:", error)
      }
    }

    const stored = localStorage.getItem("userName")
    if (stored) handleLogin(stored)
  }, [setUserName])

  return (
    <>
      <HeroTemplate />
      <ProjectsTemplate />
      <MarkdownTemplate />
      <ToolsTemplate />
      <GreedFearIndexTemplate />
      <ChatRoomTemplate />
    </>
  )
}
