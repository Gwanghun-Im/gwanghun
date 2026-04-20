"use client"

import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"
import { Box } from "@mui/material"

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    background: "#1e1e1e",
    primaryColor: "#2d5a8e",
    primaryTextColor: "#e0e0e0",
    primaryBorderColor: "#4a7ab5",
    lineColor: "#888888",
    secondaryColor: "#1a3a5c",
    tertiaryColor: "#0d2137",
  },
})

let idCounter = 0

export default function MermaidChart({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const id = `mermaid-${++idCounter}`
    mermaid
      .render(id, chart)
      .then(({ svg }) => setSvg(svg))
      .catch((e) => setError(String(e)))
  }, [chart])

  if (error) {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: "error.light",
          borderRadius: 1,
          color: "error.contrastText",
          fontSize: "0.85rem",
          fontFamily: "monospace",
        }}
      >
        Mermaid 렌더링 오류: {error}
      </Box>
    )
  }

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 2,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        overflowX: "auto",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
