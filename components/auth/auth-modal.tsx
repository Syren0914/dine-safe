"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultView?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "register">(defaultView)

  const handleSuccess = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {view === "login" ? (
          <LoginForm onSuccess={handleSuccess} onRegisterClick={() => setView("register")} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} onLoginClick={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  )
}
