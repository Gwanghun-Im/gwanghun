"use client"

import { Box, Typography, Skeleton, Pagination } from "@mui/material"
import BlogCard from "../organisms/BlogCard"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "../atoms/ErrorBoundary"

const rowsExample = [
  { title: "🏛 Zustand vs Redux", link: "zustand_vs_redux" },
  { title: "🏟️ yup vs joi vs zod", link: "yup_vs_joi_vs_zod" },
]
export type BlogType = (typeof rowsExample)[0]

const PAGE_SIZE = 5

const LoadingSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    {[1, 2, 3].map((i) => (
      <Box key={i} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Skeleton
          variant="text"
          width="60%"
          height={32}
          sx={{ bgcolor: "grey.500" }}
        />
        <Skeleton
          variant="text"
          width="40%"
          height={24}
          sx={{ bgcolor: "grey.500" }}
        />
      </Box>
    ))}
  </Box>
)

const BlogList = ({ posts }: { posts: BlogType[] }) => {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(posts.length / PAGE_SIZE)
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {posts.length ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {paginated.map((post) => (
              <BlogCard key={post.title} blog={post} />
            ))}
          </Box>
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", py: 4 }}
        >
          게시물이 없습니다.
        </Typography>
      )}
    </Box>
  )
}

export const MarkdownTemplate = () => {
  const [posts, setPosts] = useState<BlogType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts`)
        const data = await res.json()
        setPosts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Failed to fetch posts:", error)
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
        <Link
          href={"/md"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          📝 Articles
        </Link>
      </Typography>
      <ErrorBoundary>
        {isLoading ? <LoadingSkeleton /> : <BlogList posts={posts} />}
      </ErrorBoundary>
    </Box>
  )
}
