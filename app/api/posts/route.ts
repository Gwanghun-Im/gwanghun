import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { BlogPost, ErrorResponse } from "@/types/api"

export async function GET(): Promise<NextResponse<BlogPost[] | ErrorResponse>> {
  try {
    const postsDirectory = path.join(process.cwd(), "markdown")
    const fileNames = fs.readdirSync(postsDirectory)

    const posts: BlogPost[] = fileNames
      .filter((fileName) => !fileName.includes("how"))
      .map((fileName) => {
        return {
          title: fileName.replace(/\.md$/, ""),
          link: fileName.replace(/\.md$/, "").toLowerCase(),
        }
      })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("파일 읽기 오류:", error)
    return NextResponse.json(
      { error: "포스트를 불러오는데 실패했습니다." },
      { status: 500 }
    )
  }
}
