import CustomAppBar from "@/components/organisms/AppBar"
import "./globals.css"
import { Box, CssBaseline } from "@mui/material"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
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
      </body>
    </html>
  )
}
