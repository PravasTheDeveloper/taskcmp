'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
}

interface ToastState {
  toasts: Toast[]
}

let toastCount = 0

// Simple global toast state
let globalToastState: ToastState = { toasts: [] }
let listeners: (() => void)[] = []

const notify = () => {
  listeners.forEach(listener => listener())
}

export function toast({ title, description, variant = 'default' }: Omit<Toast, 'id'>) {
  const id = (++toastCount).toString()
  const newToast: Toast = { id, title, description, variant }
  
  globalToastState.toasts.push(newToast)
  notify()
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    globalToastState.toasts = globalToastState.toasts.filter(t => t.id !== id)
    notify()
  }, 4000)
}

const dismissToast = (id: string) => {
  globalToastState.toasts = globalToastState.toasts.filter(t => t.id !== id)
  notify()
}

export function useToast() {
  const [, forceUpdate] = useState(0)
  
  const rerender = useCallback(() => {
    forceUpdate(count => count + 1)
  }, [])
  
  // Subscribe to global state changes
  useState(() => {
    listeners.push(rerender)
    return () => {
      listeners = listeners.filter(l => l !== rerender)
    }
  })
  
  return {
    toasts: globalToastState.toasts,
    toast
  }
}

export function Toaster() {
  const { toasts } = useToast()

  const getToastStyles = (variant: string) => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100'
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  const getIcon = (variant: string) => {
    switch (variant) {
      case 'destructive':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />
      default:
        return null
    }
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25
              }
            }}
            exit={{ 
              opacity: 0, 
              x: 100, 
              scale: 0.8,
              transition: { duration: 0.2 }
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`rounded-lg p-4 shadow-lg border max-w-sm pointer-events-auto backdrop-blur-sm ${getToastStyles(toast.variant || 'default')}`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(toast.variant || 'default')}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <motion.div 
                  className="font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {toast.title}
                </motion.div>
                {toast.description && (
                  <motion.div 
                    className="text-sm opacity-80 mt-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {toast.description}
                  </motion.div>
                )}
              </div>
              
              {/* Dismiss Button */}
              <motion.button
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity p-1 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.2 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 