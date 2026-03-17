import { useEffect } from "react"
import useThemeStore from "@/store/useThemeStore"

export const useSystemTheme = () => {
  const { mode, setActualTheme } = useThemeStore()

  useEffect(() => {
    // 시스템 테마 감지
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleThemeChange = () => {
      if (mode === "system") {
        setActualTheme(mediaQuery.matches ? "dark" : "light")
      } else {
        setActualTheme(mode === "dark" ? "dark" : "light")
      }
    }

    // 초기 테마 설정
    handleThemeChange()

    // 시스템 테마 변경 감지
    mediaQuery.addEventListener("change", handleThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange)
    }
  }, [mode, setActualTheme])
}
