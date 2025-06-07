import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatBubbleProps {
  children: React.ReactNode
  variant?: "sent" | "received"
  className?: string
}

interface ChatBubbleMessageProps {
  children?: React.ReactNode
  variant?: "sent" | "received"
  isLoading?: boolean
  className?: string
}

export function ChatBubble({ children, variant = "received", className }: ChatBubbleProps) {
  return (
    <div className={cn(
      "flex gap-2 p-2",
      variant === "sent" ? "flex-row-reverse" : "flex-row",
      className
    )}>
      {children}
    </div>
  )
}

export function ChatBubbleAvatar({ src, fallback, className }: { src: string; fallback: string; className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

export function ChatBubbleMessage({ children, variant = "received", isLoading, className }: ChatBubbleMessageProps) {
  if (isLoading) {
    return (
      <div className={cn(
        "flex h-8 w-24 animate-pulse items-center justify-center rounded-xl bg-muted",
        className
      )}>
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="mx-1 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce"></span>
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-xl px-4 py-2",
      variant === "sent" ? "bg-primary text-primary-foreground" : "bg-muted",
      className
    )}>
      {children}
    </div>
  )
} 