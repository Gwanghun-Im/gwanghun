"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import breaks from "remark-breaks"
import rehypePrism from "rehype-prism-plus"
import { Box } from "@mui/material"
import MermaidChart from "../atoms/MermaidChart"
import type { Components } from "react-markdown"

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children)
  }
  return ""
}

const components: Components = {
  code({ className, children, ...props }) {
    const language = /language-(\w+)/.exec(className || "")?.[1]

    if (language === "mermaid") {
      const code = extractText(children).replace(/\n$/, "")
      return <MermaidChart chart={code} />
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  img() {
    return null
  },
}

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <Box className="mark-down">
      <ReactMarkdown
        remarkPlugins={[breaks, remarkGfm]}
        rehypePlugins={[rehypePrism]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}
