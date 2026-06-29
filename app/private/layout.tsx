"use client"

import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowBack } from "@mui/icons-material"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDetail = pathname !== "/private"

  return (
    <>
      <style>{`
        nav.fixed { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>
      <Box sx={{ py: 1.5, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        {isDetail ? (
          <Link href="/private" style={{ color: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
            <ArrowBack sx={{ fontSize: 20 }} />
            <Typography variant="body2">목록</Typography>
          </Link>
        ) : (
          <Typography variant="body2" sx={{ opacity: 0.5 }}>Private</Typography>
        )}
      </Box>
      {children}
    </>
  )
}
