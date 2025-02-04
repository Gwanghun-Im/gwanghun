import { Box } from "@mui/material"
import { SavingTable } from "../organisms/SavingTable"
import SavingCard from "../organisms/SavingCard"

export const SavingTemplate = ({ rows }) => (
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
