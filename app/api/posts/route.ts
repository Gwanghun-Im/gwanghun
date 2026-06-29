import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { BlogPost, ErrorResponse } from "@/types/api"

export async function GET(request: NextRequest): Promise<NextResponse<BlogPost[] | ErrorResponse>> {
  try {
    const dir = request.nextUrl.searchParams.get("dir")
    const subDir = dir === "private" ? "private" : ""
    const postsDirectory = path.join(process.cwd(), "markdown", subDir)

    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([])
    }

    const fileNames = fs.readdirSync(postsDirectory)

    const HIDDEN = subDir ? [] : ["how", "economies_700", "intro"]
    const ext = subDir === "private" ? ".html" : ".md"

    const posts: BlogPost[] = fileNames
      .filter((fileName) => fileName.endsWith(ext) && !HIDDEN.some((h) => fileName.includes(h)))
      .map((fileName) => ({
        title: fileName.replace(new RegExp(`\\${ext}$`), ""),
        link: fileName.replace(new RegExp(`\\${ext}$`), ""),
      }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error("파일 읽기 오류:", error)
    return NextResponse.json(
      { error: "포스트를 불러오는데 실패했습니다." },
      { status: 500 }
    )
  }
}
