'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, CheckCircle, Edit3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTaskAdded?: () => void
  onTaskUpdated?: (taskId: string, updates: { title: string; description?: string }) => void
  editingTask?: { id: string; title: string; description?: string } | null
  onAddTask?: (title: string, description?: string) => void
}

export function AddTaskDialog({ 
  open, 
  onOpenChange, 
  onTaskAdded, 
  onTaskUpdated,
  editingTask,
  onAddTask 
}: AddTaskDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const isEditing = Boolean(editingTask)

  // Reset form when dialog opens/closes or editing task changes
  useEffect(() => {
    if (open) {
      if (editingTask) {
        setTitle(editingTask.title)
        setDescription(editingTask.description || '')
      } else {
        setTitle('')
        setDescription('')
      }
      setShowSuccess(false)
    }
  }, [open, editingTask])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setShowSuccess(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    
    if (isEditing && editingTask && onTaskUpdated) {
      onTaskUpdated(editingTask.id, {
        title: title.trim(),
        description: description.trim() || undefined
      })
    } else {
      // Handle both new callback patterns
      if (onAddTask) {
        onAddTask(title.trim(), description.trim() || undefined)
      }
      if (onTaskAdded) {
        onTaskAdded()
      }
    }
    
    // Reset form
    setTitle('')
    setDescription('')
    setIsLoading(false)
    setShowSuccess(false)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setShowSuccess(false)
    onOpenChange(false)
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 }
    }
  }

  const buttonVariants = {
    idle: { scale: 1 },
    loading: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    success: {
      scale: 1.05,
      transition: { 
        type: "spring" as const, 
        stiffness: 400, 
        damping: 10 
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DialogTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Edit3 className="w-5 h-5" />
                    Edit Task
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add New Task
                  </>
                )}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                {isEditing 
                  ? "Update the task details. Changes will sync to all users instantly."
                  : "Create a new task for your team. Anyone with the link can view and update it."
                }
              </DialogDescription>
            </motion.div>
          </DialogHeader>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={fieldVariants}>
              <Label htmlFor="title" className="text-gray-900 dark:text-gray-100">
                Task Title *
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <Input
                  id="title"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  placeholder="e.g., Fix authentication bug"
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                  disabled={isLoading}
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={fieldVariants}>
              <Label htmlFor="description" className="text-gray-900 dark:text-gray-100">
                Description (Optional)
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Add more details about this task..."
                  rows={3}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                  disabled={isLoading}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <DialogFooter className="flex gap-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </motion.div>
                
                <motion.div
                  variants={buttonVariants}
                  animate={
                    showSuccess ? "success" : 
                    isLoading ? "loading" : "idle"
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading || !title.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white min-w-[120px] overflow-hidden relative"
                  >
                    <AnimatePresence mode="wait">
                      {showSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {isEditing ? 'Updated!' : 'Created!'}
                        </motion.div>
                      ) : isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                          />
                          {isEditing ? 'Updating...' : 'Creating...'}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          {isEditing ? (
                            <>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Update Task
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Create Task
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </motion.form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
} 