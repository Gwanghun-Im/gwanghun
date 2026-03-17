"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import LoginDialog from "./LoginDialog"
import useUserStore from "@/store/useUserStore"
import useLoginDialogStore from "@/store/useLoginDialogStore"
import { ThemeToggle } from "@/components/atoms/ThemeToggle"
import { AutoStories } from "@mui/icons-material"

const navItems = [
  { name: "Home", link: "/" },
  { name: "Chat", link: "/chat" },
  { name: "Blog", link: "/md" },
  { name: "About", link: "/md/intro" },
  { name: "MyTools", link: "/tools" },
  { name: "Contact", link: "/" },
]

export default function AppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { userName, setUserName } = useUserStore()
  const { setIsOpen, setOnLogin } = useLoginDialogStore()

  const handleLogin = (name: string) => {
    setUserName(name)
  }

  useEffect(() => {
    setOnLogin(handleLogin)
  }, [])

  const handleLogout = () => {
    setUserName(null)
  }

  return (
    <nav className="bg-blue-600 text-white fixed top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* 모바일 메뉴 버튼 */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-2"
            >
              메뉴
            </button>
          </div>

          {/* 로고 */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity">
              <AutoStories sx={{ fontSize: 28 }} />
              <span>gwanghun.im</span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden sm:flex sm:items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="px-3 py-2 text-white hover:text-gray-200"
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
            {userName ? (
              <div className="flex items-center ml-4">
                <span className="mr-2">{userName}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 백그라운드 오버레이 */}
      {mobileOpen && (
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
            mobileOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일 메뉴 - 왼쪽에서 슬라이드 */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-600 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 메뉴 내용 */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold" onClick={() => setMobileOpen(false)}>
              <AutoStories sx={{ fontSize: 28 }} />
              <span>gwanghun.im</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white p-2"
            >
              닫기
            </button>
          </div>
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="block py-2 text-white hover:text-gray-200"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="py-2">
              <ThemeToggle />
            </div>
            {userName ? (
              <div className="pt-4">
                <span className="block mb-2 text-white">{userName}</span>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileOpen(false)
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(true)
                  setMobileOpen(false)
                }}
                className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginDialog />
    </nav>
  )
}
