/**
 * @description 문자열 textarea로 인코딩
 * @author 임광훈
 * @param str
 * @returns
 */
export const encodeHtmlEntities = (str: string) => {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = str
  return textarea.textContent
}

/**
 * @description Json객체 textarea로 인코딩
 * @author 임광훈
 * @param data
 * @returns
 */
export const encodeJsonData = (data: any): any => {
  if (typeof data === "string") {
    return encodeHtmlEntities(data)
  } else if (Array.isArray(data)) {
    return data.map(encodeJsonData)
  } else if (typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value ? encodeJsonData(data) : value,
      ])
    )
  }
  return data
}

/**
 * @description 쿠키에서 데이터 가져오기
 * @author 임광훈
 * @param name
 * @returns
 */
export const getCookie = (name: string) => {
  const cookies = document.cookie.split(";")
  const cookie = cookies.find((row) => row.startsWith(`${name}=`))
  return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : null
}

/**
 * @description 서버 환경 확인
 * @author 임광훈
 * @returns [서버 환경명, 운영계 실행중인지 확인 ]
 */
export const getPublicEnv = () => {
  return [
    process.env.NEXT_PUBLIC_ENV,
    process.env.NEXT_PUBLIC_ENV === "production",
  ]
}

/**
 * @description 개발환경 로그
 * @author 임광훈
 * @returns console.log
 */
export const printDev = (...args: any[]) => {
  if (process.env.NEXT_PUBLIC_ENV !== "production") {
    console.log(...args)
  }
}
