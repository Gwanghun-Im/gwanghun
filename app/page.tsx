"use client"

import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const MARK_DOWN_PAGE = "md"

export default function Main() {
  const [markdown, setMarkdown] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMarkdown(`# hi there`)
  }, [])

  const move = () => {
    router.push(`/${MARK_DOWN_PAGE}/intro`)
  }

  if (!markdown) return <div>Loading...</div>

  return (
    <>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <img onClick={move} src="/pet.webp" alt="" />
    </>
  )
}
