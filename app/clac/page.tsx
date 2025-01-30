"use client"

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import * as yup from "yup"
import { FormikConfig, useFormik } from "formik"
import { calculateDeposit } from "../utils"
import { Input } from "../atoms/input"
import { useState } from "react"

const signInSchema = yup.object({
  period: yup.number().required(),
  money: yup.number().required(),
  rate: yup.number().required(),
})

export type depositResult = {
  title: string
  b_interest: number
  a_interest: number
  total_money: number
  sum_mon: number
}

const Page = () => {
  const [rows, setRows] = useState<depositResult[]>([])
  const formik = useFormik({
    initialValues: {
      // 각 input의 초기값
      period: 0,
      money: 0,
      rate: 0,
      depositType: "1",
    },
    validationSchema: signInSchema, // 유효성 검사
    onSubmit: (value) => {
      // alert(JSON.stringify(value, null, 2))
      const res = calculateDeposit(
        value.period,
        value.money,
        value.rate,
        value.depositType
      )
      setRows(res)
      // submit 함수 (input값들을 객체로 받는다)
      // mutate({
      //     userId: form.userId,
      //     password: form.password,
      // });
      return
    },
  })

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <CardHeader title="예금계산기" />
            <Input
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">만원</InputAdornment>
                  ),
                },
              }}
              label="예치금"
              name="money"
              formik={formik}
            />
            <Input
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">개월</InputAdornment>
                  ),
                },
              }}
              label="예치기간"
              name="period"
              formik={formik}
            />
            <Input
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                },
              }}
              label="금리"
              name="rate"
              formik={formik}
            />
            <FormControl>
              <FormLabel id="depositTypeControl">예금 방식</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="depositType"
                value={formik.values["depositType"]}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="복리" />
                <FormControlLabel value="1" control={<Radio />} label="단리" />
              </RadioGroup>
            </FormControl>
            <CardActions>
              <Button type="submit">submit</Button>
            </CardActions>
          </CardContent>
        </form>
      </Card>
      {rows.length ? (
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
      ) : null}
    </Box>
  )
}

export default Page
