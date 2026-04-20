"use client"

import { Box, Typography, Chip, Stack, Button } from "@mui/material"
import Link from "next/link"

const AI_STACK = ["LangChain", "LangGraph", "RAG", "A2A", "MCP", "Claude Code", "Claude API"]
const TECH_STACK = ["Next.js", "React", "Vue.js", "Spring Boot", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"]

const STATS = [
  { value: "4+", label: "년 경력" },
  { value: "6", label: "프로젝트" },
  { value: "5", label: "금융권 고객사" },
  { value: "4", label: "자격증" },
]

export const HeroTemplate = () => {
  return (
    <Box sx={{ mb: 6, py: 4 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        AI Engineer & Full-Stack Developer
      </Typography>

      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        임광훈
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
        금융 도메인 AI 시스템 설계부터 프론트엔드·백엔드까지
        End-to-End 솔루션을 구현하는 풀스택 개발자입니다.
        LLM 기반 Multi-Agent 시스템과 RAG 파이프라인을 설계·구현하고 있습니다.
      </Typography>

      {/* Stats */}
      <Stack direction="row" gap={3} sx={{ mb: 3, flexWrap: "wrap" }}>
        {STATS.map(({ value, label }) => (
          <Box key={label}>
            <Typography variant="h6" fontWeight={700} color="primary.main">
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* AI Stack */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
          AI / LLM
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {AI_STACK.map((tool) => (
            <Chip key={tool} label={tool} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>
      </Box>

      {/* Tech Stack */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
          Tech Stack
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {TECH_STACK.map((tech) => (
            <Chip key={tech} label={tech} size="small" variant="outlined" />
          ))}
        </Stack>
      </Box>

      {/* Contact */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        lgh82229047@gmail.com · 010-8222-9047 · www.gwanghun.com
      </Typography>

      {/* CTAs */}
      <Stack direction="row" gap={2}>
        <Button component={Link} href="/md" variant="contained" size="medium">
          Articles
        </Button>
        <Button
          component="a"
          href="https://github.com/Gwanghun-Im"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="medium"
        >
          GitHub
        </Button>
      </Stack>
    </Box>
  )
}
