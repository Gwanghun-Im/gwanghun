import React, { useState, KeyboardEvent } from "react"

// React.InputHTMLAttributes<HTMLInputElement>를 확장하여 input의 기본 속성을 포함
interface InputWithOnEnterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter: (value: string) => void // 필수: Enter 키 이벤트 핸들러
}

const InputWithOnEnter: React.FC<InputWithOnEnterProps> = ({
  onEnter,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>("")

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter(inputValue) // Enter 키 입력 시 onEnter 콜백 호출
      setInputValue("") // 입력값 초기화 (옵션)
    }
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      {...rest} // 나머지 props를 input 요소에 전달
    />
  )
}

export default InputWithOnEnter
