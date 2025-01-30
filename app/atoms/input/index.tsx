import { TextField, TextFieldProps } from "@mui/material"

interface InputProps extends Omit<TextFieldProps, "name"> {
  label: string
  name: string
  formik: any
}

export const Input = ({
  label,
  name,
  formik,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <TextField
      label={label}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={formik.touched[name] && formik.errors[name]}
      error={formik.touched[name] && !!formik.errors[name]}
      size="small"
      autoComplete="off"
      type={type}
      {...props} // 나머지 MUI 속성 전달
    />
  )
}
