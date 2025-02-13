"use client"
import CustomAppBar from "@/components/organisms/AppBar"
import "./globals.css"
import { Box, CssBaseline } from "@mui/material"
import { printDev } from "@/utils/system"
import { useEffect } from "react"
import { Toaster } from "@/components/atoms/toast/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      printDev("Key pressed:", event.key)
    }

    window.addEventListener("keyup", handleKeyUp)
    return () => window.removeEventListener("keyup", handleKeyUp)
  }, [])
  return (
    <html lang="en">
      <body>
        <CustomAppBar />
        <Box
          component="main"
          sx={{
            marginTop: "64px",
            p: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: "768px", width: "100%" }}>{children}</Box>
        </Box>
        <Toaster />
      </body>
    </html>
  )
}
