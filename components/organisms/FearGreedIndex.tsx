"use client"

import { useEffect, useState } from "react"
import { Box, Typography, Skeleton } from "@mui/material"

interface FearGreedData {
  data: Array<{
    value: string
    value_classification: string
    timestamp: string
    time_until_update: string
  }>
}

const CLASSIFICATION_COLOR: Record<string, string> = {
  "Extreme Fear": "#ef4444",
  Fear: "#f97316",
  Neutral: "#eab308",
  Greed: "#84cc16",
  "Extreme Greed": "#22c55e",
}

export function FearGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://api.alternative.me/fng/")
      .then((res) => res.json())
      .then((result: FearGreedData) => {
        setData(result)
        setIsLoading(false)
      })
      .catch(() => {
        setError("Failed to load data")
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
  }

  if (error || !data) {
    return (
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: "action.hover",
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">데이터를 불러오지 못했습니다.</Typography>
      </Box>
    )
  }

  const { value, value_classification } = data.data[0]
  const color = CLASSIFICATION_COLOR[value_classification] ?? "#6b7280"

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        bgcolor: color,
        textAlign: "center",
        color: "#fff",
      }}
    >
      <Typography variant="h3" fontWeight={800} sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body1" fontWeight={600}>
        {value_classification}
      </Typography>
    </Box>
  )
}
