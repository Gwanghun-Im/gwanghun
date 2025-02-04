import { Box } from "@mui/material"
import { DepositTable } from "../organisms/DepositTable"
import BlogCard from "../organisms/BlogCard"
import Link from "next/link"
import Button from "../atoms/Button"

const rows = [
  { title: "💸 예금계산기", link: "/calc/deposit" },
  { title: "💸 적금계산기", link: "/calc/saving" },
]
export const ToolsTemplate = () => {
  return (
    <Box
      sx={{
        gap: 3,
        display: "flex",
        margin: 2,
      }}
    >
      {rows.length
        ? rows.map((row) => (
            <Link key={row.title} href={"/tools" + row.link}>
              <Button label={row.title} />
            </Link>
          ))
        : null}
    </Box>
  )
}
