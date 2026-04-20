import fs from "fs"
import path from "path"
import matter from "gray-matter"
import MarkdownContent from "@/components/molecules/MarkdownContent"

export function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "markdown")
  const filenames = fs.readdirSync(contentDir)

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    })) as { slug: string }[]
}

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const filePath = path.join(
    process.cwd(),
    "markdown",
    `${decodeURIComponent(slug)}.md`
  )
  const raw = fs.readFileSync(filePath, "utf-8")
  const { content } = matter(raw)

  return <MarkdownContent content={content} />
}
