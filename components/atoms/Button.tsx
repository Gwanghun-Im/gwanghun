// components/atoms/Button.tsx
import React from "react"
import styles from "./Button.module.css"
import Button from "@mui/material/Button"

type ButtonProps = {
  label: string // 버튼에 표시할 텍스트
  onClick?: () => void // 클릭 이벤트 핸들러
  variant?: "primary" | "secondary" | "tertiary" // 버튼 스타일
  disabled?: boolean // 버튼 비활성화 여부
  size?: "small" | "medium" | "large" // 버튼 크기
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  size = "medium",
}) => {
  const classNames = `${styles.button} ${styles[variant]} ${styles[size]}`

  return (
    <Button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {label}
    </Button>
  )
}

export default CustomButton
