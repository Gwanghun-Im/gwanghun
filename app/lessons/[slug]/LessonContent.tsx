import MarkdownContent from "@/components/molecules/MarkdownContent"

export default function LessonContent({ content }: { content: string; slug: string }) {
  return <MarkdownContent content={content} />
}
