"use client"

import { Box, Typography, Card, CardContent, Stack } from "@mui/material"
import Link from "next/link"

const TOOLS = [
  { title: "💸 예금계산기", description: "예금 이자 및 만기금액 계산", link: "/tools/calc/deposit" },
  { title: "💸 적금계산기", description: "월 납입금 기반 적금 계산", link: "/tools/calc/saving" },
  { title: "🟡 키워드 팝업", description: "react-detect-popup 라이브러리 데모", link: "/tools/detect-pop" },
  { title: "⚾️ KBO Logos", description: "KBO 10개 구단 로고 컴포넌트", link: "/tools/react-kbo-logos" },
]

export const ToolsTemplate = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
        🛠 Tools
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {TOOLS.map((tool) => (
          <Card
            key={tool.title}
            component={Link}
            href={tool.link}
            sx={{
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 8px 16px 0 rgba(0,0,0,0.4)"
                    : "0 8px 16px 0 rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                {tool.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {tool.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
