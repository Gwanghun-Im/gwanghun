"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import breaks from "remark-breaks"
import rehypePrism from "rehype-prism-plus"
import { Box } from "@mui/material"
import MermaidChart from "../atoms/MermaidChart"
import type { Components } from "react-markdown"

const components: Components = {
  code({ className, children, ...props }) {
    const language = /language-(\w+)/.exec(className || "")?.[1]
    const code = String(children).replace(/\n$/, "")

    if (language === "mermaid") {
      return <MermaidChart chart={code} />
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
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
