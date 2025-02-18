import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export function useRouterChange() {
  const [main, setMain] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 라우터 변경감지
    setMain(pathname === "/")
  }, [router])

  return { main }
}
