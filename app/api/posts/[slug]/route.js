import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function GET(req, { params }) {
  const { slug } = params

  // Markdown 파일 경로
  const markdownPath = path.join(process.cwd(), "markdown", `${slug}.md`)

  try {
    // 파일 읽기
    const fileContent = fs.readFileSync(markdownPath, "utf-8")

    // YAML 메타데이터와 본문 분리
    const { data: frontMatter, content } = matter(fileContent)

    return new Response(JSON.stringify({ frontMatter, content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Markdown file not found" }), {
      status: 404,
    })
  }
}
