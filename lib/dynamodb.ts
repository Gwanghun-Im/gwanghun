import AWS from "aws-sdk"

// 환경 변수 확인 (디버깅)
console.log("ACCESS_KEY_ID:", process.env.ACCESS_KEY_ID ? "OK" : "MISSING")
console.log(
  "SECRET_ACCESS_KEY:",
  process.env.SECRET_ACCESS_KEY ? "OK" : "MISSING"
)
console.log("REGION:", process.env.REGION ? process.env.REGION : "MISSING")

// AWS SDK 설정
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
})

export default dynamoDb
