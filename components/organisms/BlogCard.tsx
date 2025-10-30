import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { useRouter } from "next/navigation"
import { BlogType } from "../templates/MarkdownTemplate"
import { ArrowForward } from "@mui/icons-material"

const BlogCard = (blog: { blog: BlogType }) => {
  const router = useRouter()

  return (
    <Card
      onClick={() => {
        router.push("/md/" + blog.blog.link)
      }}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 8px 16px 0 rgba(0,0,0,0.4)"
              : "0 8px 16px 0 rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2" fontWeight={600}>
              {blog.blog.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              자세히 보기
            </Typography>
          </Box>
          <ArrowForward sx={{ color: "primary.main", ml: 2 }} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default BlogCard
