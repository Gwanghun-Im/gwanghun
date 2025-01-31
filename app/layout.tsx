import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Headers />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ maxWidth: "768px", width: "100%" }}>{children}</div>
        </div>
      </body>
    </html>
  )
}

const Headers = () => {
  return <div style={{ height: "100px" }}></div>
}
