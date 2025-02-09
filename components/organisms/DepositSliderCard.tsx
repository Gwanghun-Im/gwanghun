import { Card, CardHeader, CardContent, CardActions } from "@mui/material"
import { Input } from "../atoms/Input"
import { DepositFormControl } from "../molecules/DepositFormControl"
import { Button } from "@mui/material"
import { useFormikContext } from "formik"
import { Slider } from "../atoms"
const DepositSliderCard = () => {
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
          <CardHeader title="예금계산기" />
          <Slider
            label="예치금"
            name="money"
            max={10000}
            unit="만원"
            step={5}
            inputMode="decimal"
          />
          <Slider
            label="예치기간"
            name="period"
            unit="개월"
            step={1}
            inputMode="decimal"
          />
          <Slider
            step={0.1}
            label="금리"
            name="rate"
            unit="%"
            inputMode="decimal"
          />
          <DepositFormControl />
          <CardActions>
            <Button type="submit">submit</Button>
          </CardActions>
        </CardContent>
      </Card>
    </form>
  )
}

export default DepositSliderCard
