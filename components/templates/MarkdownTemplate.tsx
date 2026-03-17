"use client"

import { Box, Typography, Skeleton } from "@mui/material"
import BlogCard from "../organisms/BlogCard"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { ErrorBoundary } from "../atoms/ErrorBoundary"

const rowsExample = [
  { title: "🏛 Zustand vs Redux", link: "zustand_vs_redux" },
  { title: "🏟️ yup vs joi vs zod", link: "yup_vs_joi_vs_zod" },
]
export type BlogType = (typeof rowsExample)[0]

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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {posts.length ? (
        posts.map((post) => <BlogCard key={post.title} blog={post} />)
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
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
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
