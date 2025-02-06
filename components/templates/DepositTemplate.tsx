import { Box } from "@mui/material"
import { DepositTable } from "../organisms/DepositTable"
import DepositCard from "../organisms/DepositCard"
import DepositSliderCard from "../organisms/DepositSliderCard"

export const DepositTemplate = ({ rows }) => (
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
