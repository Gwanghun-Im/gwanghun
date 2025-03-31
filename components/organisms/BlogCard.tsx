import { Card, CardHeader, CardContent, CardActions } from "@mui/material"
import { useRouter } from "next/navigation"
import { BlogType } from "../templates/MarkdownTemplate"

const BlogCard = (blog: { blog: BlogType }) => {
  const router = useRouter()
  return (
    <Card
      onClick={() => {
        router.push("/md/" + blog.blog.link)
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <CardHeader title={blog.blog.title} />
      </CardContent>
    </Card>
  )
}

export default BlogCard
