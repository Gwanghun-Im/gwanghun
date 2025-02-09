import { NextResponse } from "next/server"
import dynamoDb from "@/lib/dynamodb"

// GET 요청을 받아 DynamoDB에서 데이터 조회
export async function GET() {
  const params = {
    TableName: "gwanghun_dynamo_db",
    Limit: 5,
  }

  try {
    const data = await dynamoDb.scan(params).promise()
    return NextResponse.json({ success: true, data: data.Items })
  } catch (error) {
    console.error("DynamoDB Error:", error)
    return NextResponse.json(
      { error: "Could not connect to DynamoDB" },
      { status: 500 }
    )
  }
}
