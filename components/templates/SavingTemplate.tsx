import { Box } from "@mui/material"
import { SavingTable } from "../organisms/SavingTable"
import SavingCard from "../organisms/SavingCard"

interface SavingRow {
  title: string
  b_interest: number
  a_interest: number
  total_money: number
  sum_mon: number
}

interface SavingTemplateProps {
  rows: SavingRow[]
}

export const SavingTemplate = ({ rows }: SavingTemplateProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
    }}
  >
    <SavingCard />
    {rows.length ? <SavingTable rows={rows} /> : null}
  </Box>
)
