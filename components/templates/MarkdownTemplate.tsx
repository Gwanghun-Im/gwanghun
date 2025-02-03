import { Box } from "@mui/material"
import { DepositTable } from "../organisms/DepositTable"
import BlogCard from "../organisms/BlogCard"

const rows = [{ title: "🏛 Zustand vs Redux", link: "zustand_vs_redux" }]
export type BlogType = (typeof rows)[0]
export const MarkdownTemplate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {rows.length
        ? rows.map((row) => <BlogCard key={row.title} blog={row} />)
        : null}
    </Box>
  )
}
