import { printDev } from "@/utils/system"
import AWS from "aws-sdk"

// 환경 변수 확인 (디버깅)
printDev(
  "ACCESS_KEY_ID:",
  process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ? "OK" : "MISSING"
)
printDev(
  "SECRET_ACCESS_KEY:",
  process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ? "OK" : "MISSING"
)
printDev(
  "REGION:",
  process.env.NEXT_PUBLIC_AWS_REGION
    ? process.env.NEXT_PUBLIC_AWS_REGION
    : "MISSING"
)

// AWS SDK 설정
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
})

export default dynamoDb
