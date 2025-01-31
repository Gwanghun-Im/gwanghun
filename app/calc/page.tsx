// src/app/page.tsx
"use client"

import { useState } from "react"
import { useFormik, FormikProvider } from "formik"
import * as yup from "yup"
import { calculateDeposit } from "../utils"
import { DepositTemplate } from "@/components/templates/DepositTemplate"

export type DepositResult = {
  title: string
  b_interest: number
  a_interest: number
  total_money: number
  sum_mon: number
}

const INITIAL_VALUES = {
  period: 0,
  money: 0,
  rate: 0,
  depositType: "1",
}

export type FormValues = typeof INITIAL_VALUES

const VALIDATION_SCHEMA = yup.object({
  period: yup.number().required(),
  money: yup.number().required(),
  rate: yup.number().required(),
})

const Page = () => {
  const [rows, setRows] = useState<DepositResult[]>([])

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (value) => {
      const res = calculateDeposit(
        value.period,
        value.money,
        value.rate,
        value.depositType
      )
      setRows(res)
    },
  })

  return (
    <FormikProvider value={formik}>
      <DepositTemplate rows={rows} />
    </FormikProvider>
  )
}

export default Page
