import { useFormikContext } from "formik"
import { InputAdornment, TextField, TextFieldProps } from "@mui/material"

interface InputProps extends Omit<TextFieldProps, "name"> {
  label?: string
  name?: string
  unit?: string
}

export const Input = ({
  label,
  name,
  inputMode,
  unit,
  type = "text",
  ...props
}: InputProps) => {
  const formik = useFormikContext<any>()
  return (
    <TextField
      label={label}
      name={name}
      value={name ? formik.values[name] : ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={
        name ? (formik.touched[name] && formik.errors[name]) as string : undefined
      }
      error={name ? formik.touched[name] && !!formik.errors[name] : false}
      size="small"
      autoComplete="off"
      type={type}
      InputProps={{
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        inputMode: inputMode,
      }}
      inputProps={{
        inputMode,
      }}
      {...props} // 나머지 MUI 속성 전달
    />
  )
}
