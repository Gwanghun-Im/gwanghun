"use client"

import { useEffect, useState } from "react"
import {
  DetectPop,
  DictionaryProvider,
  useDictionary,
  defaultStyle,
} from "react-detect-popup"
import Link from "next/link"

// DictionaryProvider 내부에서 사용할 컴포넌트를 분리
function Content() {
  const [text, setText] = useState(
    "react는 매우 강력한 도구입니다., vue는 매우 강력한 도구입니다., \n reactNative는 매우 강력한 도구입니다."
  )
  const { dictionary, addKeyword, removeKeyword } = useDictionary()

  useEffect(() => {
    const addTest = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
      addKeyword("vue", {
        description: "프론트엔드 라이브러리",
        examples: ["React Hooks", "Components"],
      })
      await new Promise((resolve) => setTimeout(resolve, 0))
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
    }
    addTest()
  }, [addKeyword])

  return (
    <>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <DetectPop
        config={{
          toastPosition: "top",
        }}
      >
        {text}
      </DetectPop>
      <div className="fixed bottom-0 w-100 bg-black/50 z-50">
        <h2 className="text-lg font-bold mb-2">👇키워드 목록</h2>
        <div className="flex flex-wrap">
          {Object.keys(dictionary).map((keyword) => (
            <span
              className={`cursor-pointer transition-colors 
                hover:opacity-80 inline-block bg-${
                  dictionary[keyword].style?.backgroundColor ??
                  defaultStyle.backgroundColor
                } 
                text-${
                  dictionary[keyword].style?.textColor ?? defaultStyle.textColor
                }
                rounded-${
                  dictionary[keyword].style?.borderRadius ??
                  defaultStyle.borderRadius
                } 
                px-${
                  dictionary[keyword].style?.padding ?? defaultStyle.padding
                } 
                mr-2 mb-1`}
              key={keyword}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
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
              textColor: "red-900",
              borderRadius: "sm",
              padding: "1",
            },
          },
        }}
      >
        <Content />
      </DictionaryProvider>
    </>
  )
}
