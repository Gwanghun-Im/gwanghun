import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import { use } from "react"
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
  const { content } = matter(fileContent)

  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
