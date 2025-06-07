import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ExpandableChatProps {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  position?: "bottom-right" | "bottom-left"
  icon?: React.ReactNode
  className?: string
}

const sizeClasses = {
  sm: "w-[320px] h-[400px]",
  md: "w-[380px] h-[500px]",
  lg: "w-[440px] h-[600px]",
}

export function ExpandableChat({ 
  children, 
  size = "md", 
  position = "bottom-right",
  icon,
  className 
}: ExpandableChatProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        size="icon"
        className={cn(
          "fixed bottom-4 z-50",
          position === "bottom-right" ? "right-4" : "left-4"
        )}
        onClick={() => setIsOpen(true)}
      >
        {icon}
      </Button>

      {isOpen && (
        <div className={cn(
          "fixed bottom-4 z-50 flex flex-col rounded-lg border bg-background shadow-lg",
          position === "bottom-right" ? "right-4" : "left-4",
          sizeClasses[size],
          className
        )}>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          {children}
        </div>
      )}
    </>
  )
}

export function ExpandableChatHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex p-4 border-b", className)}>
      {children}
    </div>
  )
}

export function ExpandableChatBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex-1 overflow-hidden", className)}>
      {children}
    </div>
  )
}

export function ExpandableChatFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-4 border-t", className)}>
      {children}
    </div>
  )
} 