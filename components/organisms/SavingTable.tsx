// src/components/organisms/DepositTable.tsx
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material"

interface SavingRow {
  title: string
  b_interest: number
  a_interest: number
  total_money: number
  sum_mon: number
}

interface SavingTableProps {
  rows: SavingRow[]
}

export const SavingTable = ({ rows }: SavingTableProps) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>구분</TableCell>
          <TableCell align="right">세전이자&nbsp;(만원)</TableCell>
          <TableCell align="right">세후이자&nbsp;(만원)</TableCell>
          <TableCell align="right">합계&nbsp;(만원)</TableCell>
          <TableCell align="right">예치금&nbsp;(만원)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.title}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.title}
            </TableCell>
            <TableCell align="right">{row.b_interest}</TableCell>
            <TableCell align="right">{row.a_interest}</TableCell>
            <TableCell align="right">{row.total_money}</TableCell>
            <TableCell align="right">{row.sum_mon}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
