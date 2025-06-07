import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface ChatMessageListProps {
  children: React.ReactNode
  className?: string
}

export function ChatMessageList({ children, className }: ChatMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [children])

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-col space-y-4 overflow-y-auto p-4",
        className
      )}
    >
      {children}
    </div>
  )
} 