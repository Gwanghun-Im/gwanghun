"use client"

import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/atoms/ErrorBoundary"
import { FearGreedIndex } from "@/components/organisms/FearGreedIndex"
import { Skeleton } from "@mui/material"

export const GreedFearIndexTemplate = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
        <Link href="/stock" style={{ textDecoration: "none", color: "inherit" }}>
          📊 Fear & Greed Index
        </Link>
      </Typography>
      <ErrorBoundary>
        <Suspense fallback={<Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />}>
          <FearGreedIndex />
        </Suspense>
      </ErrorBoundary>
    </Box>
  )
}
