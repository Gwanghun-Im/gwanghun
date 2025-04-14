import { Card, CardHeader, CardContent, CardActions } from "@mui/material"
import { useRouter } from "next/navigation"
import { BlogType } from "../templates/MarkdownTemplate"

const BlogCard = (blog: { blog: BlogType }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push("/md/" + blog.blog.link)
      }}
      className="cursor-pointer hover:bg-gray-100 hover:text-black rounded-md"
    >
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{blog.blog.title}</h1>
      </div>
    </div>
  )
}

export default BlogCard
