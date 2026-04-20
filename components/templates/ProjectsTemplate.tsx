"use client"

import { Box, Typography, Card, CardContent, Chip, Stack } from "@mui/material"
import Link from "next/link"

type Achievement = { metric: string; description: string }

type Project = {
  title: string
  period: string
  role: string
  client?: string
  description: string
  tags: string[]
  achievements?: Achievement[]
  articleLink?: string
  badge?: string
}

const MAIN_PROJECTS: Project[] = [
  {
    title: "Multi-Agent Robo Advisor 시스템",
    period: "2025.11 ~ 2026.04",
    role: "아키텍처 설계 및 전체 구현",
    client: "KT DS",
    description:
      "금융 시장 데이터 수집 → 분석 → 포트폴리오 추천 → 리포트 생성까지 End-to-End로 동작하는 Multi-Agent 시스템. 비동기 병렬 실행으로 응답 지연 50% 감소, Prompt Caching으로 API 비용 절감, LangGraph + A2A 기반 HITL 구현.",
    tags: ["LangGraph", "A2A", "LangSmith", "FastMCP", "PostgreSQL", "Redis", "Docker", "AWS", "Next.js"],
    achievements: [
      { metric: "50% ↓", description: "응답 지연" },
      { metric: "Prompt Caching", description: "API 비용 절감" },
      { metric: "HITL", description: "Human-in-the-Loop" },
    ],
    articleLink: "/md/lesson-learned",
    badge: "AI",
  },
  {
    title: "KB국민은행 코드 어시스턴트 PoC",
    period: "2025.08 ~ 2025.10",
    role: "AI 엔지니어",
    client: "KB국민은행",
    description:
      "LLM 기반 AI 코드 어시스턴트 PoC. COBOL → Spring Boot MVC 변환 성공률 50%→90%, RAG 검색 정확도 30%→70% 향상. MCP 서버로 500줄 COBOL 컨텍스트 분할·압축 문제 해결.",
    tags: ["Python", "LangChain", "LangGraph", "OpenAI API", "Vector DB", "MCP", "A2A"],
    achievements: [
      { metric: "50% → 90%", description: "변환 성공률" },
      { metric: "30% → 70%", description: "RAG 정확도" },
      { metric: "MCP 서버", description: "컨텍스트 최적화" },
    ],
    badge: "AI",
  },
  {
    title: "하나은행 아이부자 채널구축",
    period: "2024.01 ~ 2024.12",
    role: "프론트엔드/백엔드 개발자",
    client: "하나은행",
    description:
      "어린이 금융서비스 Admin 시스템 신규 구축 및 API 개발. React 기반 SPA 아키텍처 설계, 콘텐츠·회원·통계·미션 관리 CMS 단독 구현, 하나은행 내부인증 SSO DNS 이슈 해결.",
    tags: ["Next.js", "React", "TypeScript", "Spring Boot", "PostgreSQL", "Redis"],
    achievements: [
      { metric: "CMS", description: "단독 구현" },
      { metric: "SSO", description: "DNS 이슈 해결" },
      { metric: "Admin UI", description: "전체 설계" },
    ],
  },
  {
    title: "Kbank 개인화마트 구축",
    period: "2025.01 ~ 2025.07",
    role: "데이터 엔지니어",
    client: "Kbank",
    description:
      "케이뱅크 데이터 분석 플랫폼 개인화마트 구축. 고객 데이터 ETL 파이프라인 설계·구현, 데이터 정합성 검증 스크립트 개발, 배치 스케줄링 및 모니터링 체계 구축.",
    tags: ["Terastream", "SQL", "Shell Script", "ETL Pipeline"],
    achievements: [
      { metric: "ETL", description: "파이프라인 구축" },
      { metric: "정합성 검증", description: "스크립트 개발" },
      { metric: "배치 모니터링", description: "체계 구축" },
    ],
  },
]

const SI_PROJECTS: Project[] = [
  {
    title: "라이나생명 채널 차세대",
    period: "2022.05 ~ 2023.06",
    role: "프론트엔드/백엔드 개발자",
    client: "라이나생명",
    description: "Nuxt.js 기반 랜딩페이지 시스템 구축, 보장분석 서비스 프론트엔드 개발, 랜딩페이지 관리 API 개발.",
    tags: ["Nuxt.js", "Vue.js", "Spring Boot", "PostgreSQL"],
  },
  {
    title: "한화저축은행 Mymo 3.0",
    period: "2023.08 ~ 2024.01",
    role: "프론트엔드 개발자",
    client: "한화저축은행",
    description: "Mymo PC 채널 웹 UI 개발, 웹 표준 및 웹 접근성(K-WCAG) 적용, PC 공동인증서 모듈 연계 개발.",
    tags: ["JSP", "Spring Boot", "Oracle DB", "jQuery", "JavaScript"],
  },
]

const ProjectCard = ({ project }: { project: Project }) => (
  <Card
    component={project.articleLink ? Link : "div"}
    {...(project.articleLink ? { href: project.articleLink } : {})}
    sx={{
      cursor: project.articleLink ? "pointer" : "default",
      transition: "all 0.3s ease",
      textDecoration: "none",
      "&:hover": project.articleLink
        ? {
            transform: "translateY(-4px)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 8px 16px 0 rgba(0,0,0,0.4)"
                : "0 8px 16px 0 rgba(0,0,0,0.1)",
          }
        : {},
    }}
  >
    <CardContent>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant="h6" component="h2" fontWeight={600}>
              {project.title}
            </Typography>
            {project.badge && (
              <Chip label={project.badge} size="small" color="primary" />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {project.period}
            {project.client && ` · ${project.client}`}
            {` · ${project.role}`}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.7 }}>
        {project.description}
      </Typography>

      {/* Achievements */}
      {project.achievements && (
        <Stack direction="row" gap={1} sx={{ mb: 1.5, flexWrap: "wrap" }}>
          {project.achievements.map(({ metric, description }) => (
            <Box
              key={metric}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: "action.hover",
                textAlign: "center",
              }}
            >
              <Typography variant="caption" fontWeight={700} color="primary.main" display="block">
                {metric}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {description}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}

      {/* Tags */}
      <Stack direction="row" flexWrap="wrap" gap={0.5}>
        {project.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" />
        ))}
      </Stack>
    </CardContent>
  </Card>
)

export const ProjectsTemplate = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
        🚀 Projects
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {MAIN_PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Box>

      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, mt: 4 }}>
        SI 프로젝트
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {SI_PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Box>
    </Box>
  )
}
