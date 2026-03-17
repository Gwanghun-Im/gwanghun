"use client"
import CustomAppBar from "@/components/organisms/AppBar"
import "./globals.css"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { useEffect } from "react"
import { Toaster } from "react-detect-popup"
import { lightTheme, darkTheme } from "@/lib/theme"
import useThemeStore from "@/store/useThemeStore"
import { useSystemTheme } from "@/hooks/useSystemTheme"
import { ErrorBoundary } from "@/components/atoms/ErrorBoundary"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { actualTheme } = useThemeStore()
  useSystemTheme()

  const theme = actualTheme === "dark" ? darkTheme : lightTheme

  useEffect(() => {
    // 다크모드일 때 body에 클래스 추가
    if (actualTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [actualTheme])

  return (
    <html lang="ko">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <CustomAppBar />
            <Box
              component="main"
              sx={{
                p: 3,
                width: "100%",
                display: "flex",
                paddingTop: "70px",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Box sx={{ maxWidth: "768px", width: "100%" }}>{children}</Box>
            </Box>
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
