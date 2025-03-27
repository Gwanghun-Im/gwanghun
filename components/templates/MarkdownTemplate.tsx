"use client"
import { Box, Typography } from "@mui/material"
import { DepositTable } from "../organisms/DepositTable"
import BlogCard from "../organisms/BlogCard"
import { link } from "fs"
import { title } from "process"
import Link from "next/link"
import { useState, useEffect } from "react"

const rowsExample = [
  { title: "🏛 Zustand vs Redux", link: "zustand_vs_redux" },
  { title: "🏟️ yup vs joi vs zod", link: "yup_vs_joi_vs_zod" },
]
export type BlogType = (typeof rowsExample)[0]

async function getMarkdownPosts() {
  const res = await fetch(`/api/posts`, {
    next: { revalidate: 60 },
  })
  const posts = await res.json()
  return posts
}

export const MarkdownTemplate = () => {
  const [rows, setRows] = useState<BlogType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMarkdownPosts()
      .then((posts) => {
        setRows(posts)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <Typography variant="h5" gutterBottom>
        <Link href={"/md"}>Articles</Link>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          borderColor: "#191919",
          border: 1,
          padding: 3,
          borderRadius: 5,
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-full min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : rows.length ? (
          rows.map((row) => <BlogCard key={row.title} blog={row} />)
        ) : (
          <div className="text-center py-4 text-gray-500">
            게시물이 없습니다.
          </div>
        )}
      </Box>
    </>
  )
}
