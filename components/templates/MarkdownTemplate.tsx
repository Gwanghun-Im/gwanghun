import { Box, Typography } from "@mui/material"
import { DepositTable } from "../organisms/DepositTable"
import BlogCard from "../organisms/BlogCard"
import { link } from "fs"
import { title } from "process"
import Link from "next/link"

const rows = [
  { title: "🏛 Zustand vs Redux", link: "zustand_vs_redux" },
  { title: "🏟️ yup vs joi vs zod", link: "yup_vs_joi_vs_zod" },
]
export type BlogType = (typeof rows)[0]
export const MarkdownTemplate = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        <Link href={"/md"}>Articles</Link>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          borderColor: "#191919",
          border: 1,
          padding: 3,
          borderRadius: 5,
        }}
      >
        {rows.length
          ? rows.map((row) => <BlogCard key={row.title} blog={row} />)
          : null}
      </Box>
    </>
  )
}
