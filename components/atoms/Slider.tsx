import { Box, Slider, SliderProps, Typography } from "@mui/material"
import { useFormikContext } from "formik"
import { FormEvent } from "react"

interface CustomSliderProps extends SliderProps {
  label: string
  name: string
  unit?: string
}

export default function CustomSlider({
  label,
  name,
  unit,
  max = 100,
  step = 1,
  ...props
}: CustomSliderProps) {
  const formik = useFormikContext<any>()

  const valuetext = (value: number) => {
    return `${value} ${unit}`
  }

  return (
    <Box sx={{ width: 300 }}>
      <Typography gutterBottom>
        {label}: {valuetext(formik.values[name])}
      </Typography>
      <Slider
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        step={step}
        getAriaLabel={() => "Temperature range"}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={max}
        {...props}
      />
    </Box>
  )
}
