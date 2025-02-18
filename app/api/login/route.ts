import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// 메시지 조회 API (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get("userName")

    if (!name) {
      return NextResponse.json(
        { error: "사용자 이름이 필요합니다." },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      userName: name,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "처리 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
