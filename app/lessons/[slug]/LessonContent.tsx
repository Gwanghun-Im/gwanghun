"use client"

import { Box, Button } from "@mui/material"
import { Print } from "@mui/icons-material"
import MarkdownContent from "@/components/molecules/MarkdownContent"

export default function LessonContent({ content, slug }: { content: string; slug: string }) {
  return (
    <>
      <style>{`
        nav.fixed { display: none !important; }
        main { padding-top: 0 !important; }

        @media print {
          .lesson-toolbar { display: none !important; }
          .lesson-page {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20mm 15mm !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* 툴바 */}
      <Box
        className="lesson-toolbar"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box component="span" sx={{ fontSize: "0.85rem", opacity: 0.6 }}>
          Lesson Learned · {slug}
        </Box>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Print />}
          onClick={() => window.print()}
        >
          PDF 저장
        </Button>
      </Box>

      {/* PDF 스타일 본문 */}
      <Box
        className="lesson-page"
        sx={{
          mt: "48px",
          mx: "auto",
          maxWidth: "794px",   /* A4 너비 px 기준 */
          minHeight: "1123px", /* A4 높이 */
          bgcolor: "background.paper",
          boxShadow: 4,
          p: { xs: "24px 20px", md: "48px 64px" },
        }}
      >
        <MarkdownContent content={content} />
      </Box>
    </>
  )
}
