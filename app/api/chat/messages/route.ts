import { NextResponse } from "next/server"
import dynamoDb from "@/lib/dynamodb"

// 메시지 조회 API (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const roomId = searchParams.get("roomId")
    const lastTimestamp = searchParams.get("lastTimestamp") // 페이징용

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId가 필요합니다." },
        { status: 400 }
      )
    }

    const params = {
      TableName: "gwanghun_dynamo_db",
      KeyConditionExpression: "roomId = :roomId",
      ExpressionAttributeValues: {
        ":roomId": roomId,
      },
      ScanIndexForward: false, // 최신 메시지가 먼저 오도록 정렬 (DESC)
      Limit: 20, // 한 번에 불러올 메시지 개수
      ExclusiveStartKey: null,
    }

    if (lastTimestamp) {
      params.ExclusiveStartKey = {
        roomId,
        timestamp: Number(lastTimestamp),
      }
    }

    const data = await dynamoDb.query(params).promise()

    return NextResponse.json({ success: true, messages: data.Items })
  } catch (error) {
    console.error("DynamoDB Error:", error)
    return NextResponse.json(
      { error: "메시지를 불러올 수 없습니다." },
      { status: 500 }
    )
  }
}
