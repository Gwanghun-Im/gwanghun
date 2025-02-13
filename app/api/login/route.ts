import { NextResponse } from "next/server"
import useUserStore from "@/store/useUserStore"

// 메시지 조회 API (GET)
export async function GET(req) {
  const { userName, setUserName } = useUserStore()
  try {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get("userName")

    if (userName) {
      return NextResponse.json(
        { error: "로그인 된 고객입니다." },
        { status: 400 }
      )
    }
    setUserName(name)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "고객을 불러올 수 없습니다." },
      { status: 500 }
    )
  }
}
