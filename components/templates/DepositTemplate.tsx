import { Box } from "@mui/material"
import { DepositTable } from "../organisms/DepositTable"
import DepositCard from "../organisms/DepositCard"

export const DepositTemplate = ({ rows }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
    }}
  >
    <DepositCard />
    {rows.length ? <DepositTable rows={rows} /> : null}
  </Box>
)
