```tsx
"use client"

import { useEffect, useState } from "react"
import {
  DetectPop,
  DictionaryProvider,
  useDictionary,
} from "react-detect-popup"

// DictionaryProvider 내부에서 사용할 컴포넌트를 분리
function Content() {
  const [text, setText] = useState(
    "react는 매우 강력한 도구입니다., vue는 매우 강력한 도구입니다."
  )
  const { dictionary, addKeyword } = useDictionary()

  useEffect(() => {
    console.log(dictionary)
    addKeyword("vue", {
      description: "프론트엔드 라이브러리",
      examples: ["React Hooks", "Components"],
    })
    console.log(dictionary)
  }, [addKeyword])

  return (
    <>
      <DetectPop>{text}</DetectPop>
    </>
  )
}

// 메인 페이지 컴포넌트
export default function Page() {
  return (
    <DictionaryProvider
      initial={{
        react: {
          description: "프론트엔드 라이브러리",
          examples: ["React Hooks", "Components"],
          style: {
            backgroundColor: "red-100",
            textColor: "red-100",
            borderRadius: "sm",
            padding: "1",
          },
        },
      }}
    >
      <Content />
    </DictionaryProvider>
  )
}
```
