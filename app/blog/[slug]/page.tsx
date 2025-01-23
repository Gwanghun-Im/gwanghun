"use client"

import { use, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params) // Promise를 언랩
  const { slug } = resolvedParams
  const [post, setPost] = useState<null | { frontMatter: any; content: any }>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${slug}`)
        if (!response.ok) throw new Error("Failed to fetch the post")

        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (!post) return <div>Post not found.</div>

  return (
    <div>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  )
}
