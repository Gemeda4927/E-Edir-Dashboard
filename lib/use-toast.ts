import { useState, useCallback } from 'react'

interface ToastProps {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(({ title, description, variant = 'default' }: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, { title, description, variant }])

    // Remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, 3000)
  }, [])

  return { toast, toasts }
}

