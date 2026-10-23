import fs from "fs"
import path from "path"
import matter from "gray-matter"
import LessonContent from "./LessonContent"

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "markdown", "lessons")
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "markdown", "lessons", `${decodeURIComponent(slug)}.md`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { content } = matter(raw)

  return <LessonContent content={content} slug={slug} />
}
