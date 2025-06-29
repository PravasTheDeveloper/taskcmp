'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Play, Calendar, User, MoreVertical, ArrowLeft, Trash2, Edit3 } from "lucide-react"
import { Task, TaskStatus } from "@/lib/taskService"
import { formatDistanceToNow } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface TaskCardProps {
  task: Task
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void
  onDelete?: (taskId: string) => void
  onEdit?: (taskId: string, title: string, description?: string) => void
}

export function TaskCard({ task, onStatusChange, onDelete, onEdit }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const getNextAction = () => {
    switch (task.status) {
      case 'todo':
        return {
          label: 'Start Task',
          icon: Play,
          action: () => onStatusChange(task.id, 'in-progress'),
          variant: 'outline' as const,
          className: 'border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20'
        }
      case 'in-progress':
        return {
          label: 'Complete',
          icon: Check,
          action: () => onStatusChange(task.id, 'completed'),
          variant: 'default' as const,
          className: 'bg-emerald-500 hover:bg-emerald-600 text-white'
        }
      case 'completed':
        return {
          label: 'Verify & Done',
          icon: Shield,
          action: () => onStatusChange(task.id, 'verified'),
          variant: 'default' as const,
          className: 'bg-violet-600 hover:bg-violet-700 text-white'
        }
      default:
        return null
    }
  }

  const getBackAction = () => {
    switch (task.status) {
      case 'in-progress':
        return {
          label: 'Back to To Do',
          action: () => onStatusChange(task.id, 'todo')
        }
      case 'completed':
        return {
          label: 'Back to In Progress',
          action: () => onStatusChange(task.id, 'in-progress')
        }
      case 'verified':
        return {
          label: 'Back to Completed',
          action: () => onStatusChange(task.id, 'completed')
        }
      default:
        return null
    }
  }

  const getStatusBadge = () => {
    const statusConfig = {
      todo: { 
        label: 'To Do', 
        className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' 
      },
      'in-progress': { 
        label: 'In Progress', 
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
      },
      completed: { 
        label: 'Completed', 
        className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
      },
      verified: { 
        label: 'Verified', 
        className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' 
      }
    }
    
    return statusConfig[task.status]
  }

  const handleDelete = async () => {
    if (!onDelete) return
    
    setIsDeleting(true)
    try {
      await onDelete(task.id)
    } catch (error) {
      console.error('Error deleting task:', error)
      setIsDeleting(false)
    }
  }

  const nextAction = getNextAction()
  const backAction = getBackAction()
  const statusBadge = getStatusBadge()
  const canDelete = task.status === 'completed' || task.status === 'verified'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      whileHover={{ 
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="relative"
    >
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group overflow-hidden">
        <CardContent className="p-3 sm:p-4">
          {/* Header with Status Badge and Menu */}
          <div className="flex items-center justify-between mb-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            >
              <Badge className={`text-xs ${statusBadge.className}`}>
                {statusBadge.label}
              </Badge>
            </motion.div>
            
            <div className="flex items-center gap-2">
              {task.status === 'verified' && (
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                  className="text-violet-500"
                >
                  <Shield className="w-4 h-4" />
                </motion.div>
              )}
              
              {/* 3-Dot Menu */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[160px] py-1"
                      onMouseLeave={() => setShowMenu(false)}
                    >
                      {/* Back Action */}
                      {backAction && (
                        <motion.button
                          onClick={() => {
                            backAction.action()
                            setShowMenu(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          {backAction.label}
                        </motion.button>
                      )}

                      {/* Edit Action */}
                      {onEdit && (
                        <motion.button
                          onClick={() => {
                            onEdit(task.id, task.title, task.description)
                            setShowMenu(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Task
                        </motion.button>
                      )}

                      {/* Delete Action */}
                      {canDelete && onDelete && (
                        <motion.button
                          onClick={() => {
                            handleDelete()
                            setShowMenu(false)
                          }}
                          disabled={isDeleting}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 dark:text-red-400 disabled:opacity-50"
                          whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                        >
                          <Trash2 className="w-4 h-4" />
                          {isDeleting ? 'Deleting...' : 'Delete Task'}
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Task Title */}
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-2 line-clamp-2"
          >
            {task.title}
          </motion.h3>

          {/* Task Description */}
          {task.description && (
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2"
            >
              {task.description}
            </motion.p>
          )}

          {/* Task Meta */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 sm:mb-4"
          >
            <div className="flex items-center gap-1 min-w-0">
              <User className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{task.createdBy}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Calendar className="w-3 h-3" />
              <span className="whitespace-nowrap text-right">
                {formatDistanceToNow(task.createdAt, { addSuffix: true })}
              </span>
            </div>
          </motion.div>

          {/* Action Buttons Row */}
          <div className="flex gap-1.5 sm:gap-2">
            {/* Back Button */}
            {backAction && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  onClick={backAction.action}
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                  <span className="sm:hidden">←</span>
                </Button>
              </motion.div>
            )}

            {/* Next Action Button */}
            {nextAction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-2"
              >
                <Button
                  onClick={() => {
                    setTimeout(() => nextAction.action(), 100)
                  }}
                  variant={nextAction.variant}
                  size="sm"
                  className={`w-full transition-all duration-300 ${nextAction.className} hover:shadow-md text-xs sm:text-sm`}
                >
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <nextAction.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="truncate">{nextAction.label}</span>
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Completion Info */}
          {task.status === 'completed' && task.completedAt && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="mt-2 sm:mt-3 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Completed {formatDistanceToNow(task.completedAt, { addSuffix: true })}</span>
            </motion.div>
          )}

          {/* Verification Info */}
          {task.status === 'verified' && task.verifiedAt && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="mt-2 sm:mt-3 text-xs text-violet-600 dark:text-violet-400 flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              <span>Verified {formatDistanceToNow(task.verifiedAt, { addSuffix: true })}</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 