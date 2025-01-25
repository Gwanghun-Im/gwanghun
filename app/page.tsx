"use client"

import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Main() {
  const [markdown, setMarkdown] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMarkdown(`# hi there`)
  }, [])

  const move = () => {
    router.push("/blog/intro")
  }

  if (!markdown) return <div>Loading...</div>

  return (
    <>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <img onClick={move} src="/pet.webp" alt="" />
    </>
  )
}
