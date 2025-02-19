"use client"
import { DictionaryProvider } from "@/contexts/dictionary/DictionaryContext"
import { DetectPop } from "@/components/molecules/DetectPop"

export default function Page() {
  return (
    <DictionaryProvider
      initial={{
        react: {
          description: "쩐다~!",
          examples: ["리액트 훅스", "컴포넌트"],
          style: {
            backgroundColor: "bg-indigo-100",
            textColor: "text-indigo-900",
          },
        },
        hooks: {
          description: "리액트의 강력한 기능",
          examples: ["useState", "useEffect"],
          style: {
            backgroundColor: "bg-green-100",
            textColor: "text-green-900",
          },
        },
      }}
    >
      <DetectPop
        config={{
          toastPosition: "bottom",
          toastDuration: 1_000,
        }}
      >
        react와 hooks를 사용하면 정말 멋진 앱을 만들 수 있습니다.
      </DetectPop>
    </DictionaryProvider>
  )
}
