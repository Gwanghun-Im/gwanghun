import { Card, CardHeader, CardContent, CardActions } from "@mui/material"
import { Input } from "../atoms/Input"
import { DepositFormControl } from "../molecules/DepositFormControl"
import { Button } from "@mui/material"
import { useFormikContext } from "formik"
const DepositCard = () => {
  const formik = useFormikContext()
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <CardHeader title="적금계산기" />
          <Input
            label="월 납입금"
            name="money"
            unit="만원"
            inputMode="decimal"
          />
          <Input
            label="적금 기간"
            name="period"
            unit="개월"
            inputMode="decimal"
          />
          <Input label="금리" name="rate" unit="%" inputMode="decimal" />
          <CardActions>
            <Button type="submit">submit</Button>
          </CardActions>
        </CardContent>
      </Card>
    </form>
  )
}

export default DepositCard
