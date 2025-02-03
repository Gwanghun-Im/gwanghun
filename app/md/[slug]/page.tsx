import fs from "fs"
import path from "path"
import matter from "gray-matter"
import breaks from "remark-breaks"
import ReactMarkdown from "react-markdown"
import remarkSlug from "remark-slug"
import remarkGfm from "remark-gfm"
import remark2rehype from "remark-rehype"
import katex from "rehype-katex"
import raw from "rehype-raw"
import remarkParse from "remark-parse"
import stringify from "rehype-stringify"
import rehypePrism from "rehype-prism-plus"
import { Box } from "@mui/material"
import { PageProps } from "@/.next/types/app/page"

export function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "markdown") // 'markdown' 디렉토리 지정
  const filenames = fs.readdirSync(contentDir)

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  })) as { slug: string }[] // 강제 타입 지정
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "markdown", `${slug}.md`) // 'markdown' 경로 설정
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const content = fileContent // matter(fileContent).content

  return (
    <Box className="mark-down">
      <ReactMarkdown
        remarkPlugins={[breaks, remarkGfm, remarkSlug, remarkParse]}
        rehypePlugins={[remark2rehype, rehypePrism, katex, stringify, raw]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}
