import { cn } from "@/lib/utils"
import { TextareaHTMLAttributes, forwardRef } from "react"

export interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
) 