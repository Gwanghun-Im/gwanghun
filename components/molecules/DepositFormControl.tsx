import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
import { useFormikContext } from "formik"

export const DepositFormControl = () => {
  const formik = useFormikContext()
  return (
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
  )
}
