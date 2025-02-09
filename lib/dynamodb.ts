import AWS from "aws-sdk"

// 환경 변수 확인 (디버깅)
console.log(
  "AWS_ACCESS_KEY_ID:",
  process.env.AWS_ACCESS_KEY_ID ? "OK" : "MISSING"
)
console.log(
  "AWS_SECRET_ACCESS_KEY:",
  process.env.AWS_SECRET_ACCESS_KEY ? "OK" : "MISSING"
)
console.log(
  "AWS_REGION:",
  process.env.AWS_REGION ? process.env.AWS_REGION : "MISSING"
)

// AWS SDK 설정
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export default dynamoDb
