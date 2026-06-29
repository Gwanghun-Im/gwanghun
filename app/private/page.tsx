"use client"

import { Box, Typography, Skeleton, Pagination } from "@mui/material"
import BlogCard from "@/components/organisms/BlogCard"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "@/components/atoms/ErrorBoundary"
import type { BlogType } from "@/components/templates/MarkdownTemplate"

const PAGE_SIZE = 10

export default function PrivatePage() {
  const [posts, setPosts] = useState<BlogType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch("/api/posts?dir=private")
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setIsLoading(false))
  }, [])

  const totalPages = Math.ceil(posts.length / PAGE_SIZE)
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
        🔒 Private Notes
      </Typography>
      <ErrorBoundary>
        {isLoading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="text" width="60%" height={32} sx={{ bgcolor: "grey.500" }} />
            ))}
          </Box>
        ) : posts.length ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {paginated.map((post) => (
              <BlogCard key={post.title} blog={post} basePath="/private" />
            ))}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            문서가 없습니다.
          </Typography>
        )}
      </ErrorBoundary>
    </Box>
  )
}
