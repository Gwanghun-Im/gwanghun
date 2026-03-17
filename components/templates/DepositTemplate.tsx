import { Box } from "@mui/material"
import { DepositTable } from "../organisms/DepositTable"
import DepositCard from "../organisms/DepositCard"
import DepositSliderCard from "../organisms/DepositSliderCard"

interface DepositRow {
  title: string
  b_interest: number
  a_interest: number
  total_money: number
  sum_mon: number
}

interface DepositTemplateProps {
  rows: DepositRow[]
}

export const DepositTemplate = ({ rows }: DepositTemplateProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
    }}
  >
    <DepositCard />
    <DepositSliderCard />
    {rows.length ? <DepositTable rows={rows} /> : null}
  </Box>
)
