import Link from "next/link"

const rows = [
  { title: "💸 예금계산기", link: "/calc/deposit" },
  { title: "💸 적금계산기", link: "/calc/saving" },
  { title: "🟡 키워드 팝업", link: "/detect-pop" },
  { title: "⚾️ kbo logos", link: "/react-kbo-logos" },
]

export const ToolsTemplate = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center ">
      {rows.length > 0 &&
        rows.map((row) => (
          <Link key={row.title} href={"/tools" + row.link}>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 font-medium">
              {row.title}
            </button>
          </Link>
        ))}
    </div>
  )
}
