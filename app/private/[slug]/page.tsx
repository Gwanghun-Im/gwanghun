import fs from "fs"
import path from "path"

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "markdown", "private")
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .map((f) => ({ slug: f.replace(/\.html$/, "") }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PrivatePost({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "markdown", "private", `${decodeURIComponent(slug)}.html`)
  const html = fs.readFileSync(filePath, "utf-8")

  return (
    <div className="mark-down" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
