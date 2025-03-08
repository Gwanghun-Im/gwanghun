import React from "react"
import {
  KIA,
  DOOSAN,
  LG,
  SSG,
  KIWOOM,
  KT,
  NC,
  SAMSUNG,
  LOTTE,
  HANWHA,
} from "react-kbo-logos"

const logos = [KIA, DOOSAN, LG, SSG, KIWOOM, KT, NC, SAMSUNG, LOTTE, HANWHA]

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>KBO 구단 로고</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {logos.map((logo) => (
          <LogoCard key={logo.name} name={logo.name} Logo={logo} />
        ))}
      </div>
    </div>
  )
}

interface LogoCardProps {
  name: string
  Logo: React.ComponentType<{ size?: number; className?: string }>
}

const LogoCard: React.FC<LogoCardProps> = ({ name, Logo }) => {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Logo size={100} />
      <h3 style={{ margin: 0 }}>{name}</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <Logo size={40} />
        <Logo size={60} />
        <Logo size={80} />
      </div>
    </div>
  )
}

export default App
