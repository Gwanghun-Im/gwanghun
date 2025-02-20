"use client"
import { useState } from "react"
import useLoginDialogStore from "@/store/useLoginDialogStore"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginDialog() {
  const [userName, setUserName] = useState("")
  const [error, setError] = useState("")
  const { isOpen, setIsOpen, onLogin } = useLoginDialogStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch(
        `/api/login?userName=${encodeURIComponent(userName)}`
      )
      const data = await response.json()

      if (data.success) {
        if (onLogin) {
          onLogin(data.userName)
        }
        setUserName("")
        setIsOpen(false)
      } else {
        setError(data.error || "로그인에 실패했습니다.")
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              환영합니다! 👋
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  사용자 이름
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 ease-in-out
                             text-gray-900 placeholder-gray-400
                             shadow-sm"
                    placeholder="이름을 입력하세요"
                    autoFocus
                  />
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 
                           bg-gray-100 rounded-lg hover:bg-gray-200 
                           transition-colors duration-200 ease-in-out
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!userName.trim()}
                  className="px-5 py-2.5 text-sm font-medium text-white 
                           bg-blue-600 rounded-lg hover:bg-blue-700 
                           transition-colors duration-200 ease-in-out
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           shadow-md hover:shadow-lg
                           disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  시작하기
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
