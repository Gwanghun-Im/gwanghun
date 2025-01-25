"use client"

import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"

export default function Main() {
  const [markdown, setMarkdown] = useState("")

  useEffect(() => {
    setMarkdown(`# hi`)
  }, [])

  if (!markdown) return <div>Loading...</div>

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "768px", width: "100%" }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}
