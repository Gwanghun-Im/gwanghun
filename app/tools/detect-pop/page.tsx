"use client"

import { useEffect, useState } from "react"
import {
  DetectPop,
  DictionaryProvider,
  useDictionary,
} from "react-detect-popup"
import Link from "next/link"

// DictionaryProvider 내부에서 사용할 컴포넌트를 분리
function Content() {
  const [text, setText] = useState(
    "react는 매우 강력한 도구입니다., vue는 매우 강력한 도구입니다., \n reactNative는 매우 강력한 도구입니다."
  )
  const { dictionary, addKeyword, removeKeyword } = useDictionary()

  useEffect(() => {
    console.log(dictionary)
    addKeyword("reactNative", {
      description: "모바일 라이브러리",
      examples: ["React", "Components"],
      style: {
        backgroundColor: "red-100",
        textColor: "blue-900",
        borderRadius: "sm",
        padding: "1",
      },
    })
    const addTest = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      removeKeyword("react")
      addKeyword("reactNative", {
        description: "모바일 라이브러리",
        examples: ["React", "Components"],
        style: {
          backgroundColor: "red-100",
          textColor: "blue-900",
          borderRadius: "sm",
          padding: "1",
        },
      })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addKeyword("vue", {
        description: "프론트엔드 라이브러리",
        examples: ["React Hooks", "Components"],
      })
      addKeyword("react", {
        description: "프론트엔드 라이브러리",
        examples: ["React Hooks", "Components"],
      })
    }
    addTest()
  }, [addKeyword])

  useEffect(() => {
    console.log(dictionary)
    const keywords = Object.keys(dictionary).sort((a, b) => b.length - a.length)
    // 가장 먼저 나타나는 키워드 찾기
    for (const keyword of keywords) {
      const index = text.toLowerCase().indexOf(keyword.toLowerCase())
      if (index !== -1 && index < text.length) {
        console.log(keyword)
      }
    }
    // console.log(keywords)
  }, [dictionary])

  return (
    <>
      <DetectPop
        config={{
          toastPosition: "top",
        }}
      >
        {text}
      </DetectPop>
    </>
  )
}

// 메인 페이지 컴포넌트
export default function Page() {
  return (
    <>
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
      <Link href={"/md/intro_react_detect_popup"}>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 font-medium">
          Example
        </button>
      </Link>
    </>
  )
}
