import { NextResponse } from "next/server"
import dynamoDb from "@/lib/dynamodb"

// 메시지 저장 API (POST)
export async function POST(req) {
  try {
    const { roomId, sender, message } = await req.json()

    if (!roomId || !sender || !message) {
      return NextResponse.json(
        { error: "필수 필드가 없습니다." },
        { status: 400 }
      )
    }

    const timestamp = Date.now() // 현재 시간 (정렬 키)

    const params = {
      TableName: "gwanghun_dynamo_db",
      Item: {
        roomId, // 채팅방 ID (파티션 키)
        timestamp, // 메시지 생성 시간 (정렬 키)
        sender, // 보낸 사람
        message, // 메시지 내용
      },
    }

    await dynamoDb.put(params).promise()

    return NextResponse.json({
      success: true,
      message: "메시지가 저장되었습니다.",
    })
  } catch (error) {
    console.error("DynamoDB Error:", error)
    return NextResponse.json(
      { error: "메시지를 저장할 수 없습니다." },
      { status: 500 }
    )
  }
}
