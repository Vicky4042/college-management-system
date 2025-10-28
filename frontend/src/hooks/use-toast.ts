import { useState } from "react"

interface ToastProps {
  title?: string
  description: string
  variant?: 'default' | 'destructive' | 'success'
}

export function useToast() {
  const [messages, setMessages] = useState<{ id: number; title?: string; message: string; variant?: 'default' | 'destructive' | 'success' }[]>([])

  function toast({ title, description, variant }: ToastProps) {
    const id = Date.now()
    setMessages((prev) => [...prev, { id, title, message: description, variant }])
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id))
    }, 3000)
  }

  return { toast, messages }
}
