// src/app/page.tsx
"use client"

import { useState } from "react"
import { useFormik, FormikProvider } from "formik"
import * as yup from "yup"
import { calculateMonthlyInstallment } from "@/app/utils"
import { SavingTemplate } from "@/components/templates/SavingTemplate"

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
}

export type SavingFormValues = typeof INITIAL_VALUES

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
      const res = calculateMonthlyInstallment(
        value.period,
        value.money,
        value.rate
      )
      setRows(res)
    },
  })

  return (
    <FormikProvider value={formik}>
      <SavingTemplate rows={rows} />
    </FormikProvider>
  )
}

export default Page
