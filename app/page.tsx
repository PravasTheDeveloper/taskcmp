'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Check, Shield, Clock, CheckCircle2, Wifi, WifiOff, Zap, Users, Calendar, AlertCircle } from 'lucide-react'
import { AddTaskDialog } from '@/components/add-task-dialog'
import { TaskCard } from '@/components/task-card'
import { toast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Task, 
  TaskStatus, 
  TaskData,
  subscribeToTasks, 
  updateTaskStatus as updateTaskStatusFirebase,
  addTask as addTaskFirebase,
  deleteTask,
  updateTask,
  getTaskStats,
  subscribeToConnectionState
} from '@/lib/taskService'

const statusConfig = {
  todo: {
    label: 'To Do',
    icon: Clock,
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    column: 'bg-gray-50 dark:bg-gray-900'
  },
  'in-progress': {
    label: 'In Progress',
    icon: Clock,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    column: 'bg-blue-50 dark:bg-blue-900/20'
  },
  completed: {
    label: 'Completed',
    icon: Check,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    column: 'bg-emerald-50 dark:bg-emerald-900/20'
  },
  verified: {
    label: 'Verified',
    icon: CheckCircle2,
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    column: 'bg-violet-50 dark:bg-violet-900/20'
  }
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [editingTask, setEditingTask] = useState<{id: string, title: string, description?: string} | null>(null)

  // Set up real-time Firebase listener
  useEffect(() => {
    console.log('🔥 Setting up Firebase Realtime Database listener...')
    
    // Set up tasks listener
    const unsubscribeTasks = subscribeToTasks(
      (newTasks) => {
        console.log('📊 Real-time update received:', newTasks.length, 'tasks')
        setTasks(newTasks)
        setIsLoading(false)
      },
      (error) => {
        console.error('🚨 Firebase connection error:', error)
        setIsLoading(false)
        toast({
          title: "Connection Error",
          description: "Unable to connect to real-time database. Please check your internet connection.",
          variant: "destructive"
        })
      }
    )

    // Set up connection state listener
    const unsubscribeConnection = subscribeToConnectionState(
      (connected) => {
        console.log(connected ? '🟢 Connected to Firebase' : '🔴 Disconnected from Firebase')
        setIsConnected(connected)
        
        if (!connected) {
          toast({
            title: "Connection Lost",
            description: "Real-time sync temporarily unavailable. Changes will sync when reconnected.",
            variant: "destructive"
          })
        } else if (tasks.length > 0) {
          toast({
            title: "Connected! ⚡",
            description: "Real-time sync is active. All changes are instantly synchronized.",
            variant: "success"
          })
        }
      }
    )

    // Cleanup subscriptions on unmount
    return () => {
      console.log('🧹 Cleaning up Firebase listeners...')
      unsubscribeTasks()
      unsubscribeConnection()
    }
  }, [])

  const addTask = async (title: string, description?: string) => {
    try {
      console.log('➕ Adding new task:', title)
      const taskId = await addTaskFirebase(title, description, 'Anonymous')
      console.log('✅ Task added successfully with ID:', taskId)
      
      toast({
        title: "Task Created! 🎉",
        description: "New task has been added and synced to all users instantly.",
        variant: "success"
      })
    } catch (error) {
      console.error('❌ Error adding task:', error)
      toast({
        title: "Error Creating Task",
        description: "Failed to create task. Please try again.",
        variant: "destructive"
      })
    }
  }

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      console.log('🔄 Updating task status:', taskId, '→', newStatus)
      await updateTaskStatusFirebase(taskId, newStatus)
      console.log('✅ Task status updated successfully')
      
      const statusLabels: Record<TaskStatus, string> = {
        'todo': 'moved to To Do',
        'in-progress': 'started work',
        'completed': 'marked as Complete',
        'verified': 'verified and done'
      }
      
      toast({
        title: "Task Updated! ⚡",
        description: `Task has been ${statusLabels[newStatus] || 'updated'} and synced to all users.`,
        variant: "success"
      })
    } catch (error) {
      console.error('❌ Error updating task status:', error)
      toast({
        title: "Update Failed",
        description: "Failed to update task status. Please try again.",
        variant: "destructive"
      })
    }
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
  }

  const stats = getTaskStats(tasks)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.05
      }
    }
  }

  const taskListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  }

  const statsCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25
      }
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId)
      
      toast({
        title: "Task deleted successfully! 🗑️",
        description: "The task has been permanently removed.",
      })
    } catch (error) {
      console.error('Error deleting task:', error)
      toast({
        title: "Failed to delete task ❌",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleEditTask = async (taskId: string, title: string, description?: string) => {
    setEditingTask({ id: taskId, title, description })
    setIsAddDialogOpen(true)
  }

  const handleUpdateTask = async (taskId: string, updates: Partial<TaskData>) => {
    try {
      await updateTask(taskId, updates)
      
      toast({
        title: "Task updated successfully! ✏️",
        description: "Your changes have been saved.",
      })
      
      // Close editing mode
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
      toast({
        title: "Failed to update task ❌", 
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Connecting to Firebase Realtime Database...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Setting up instant real-time synchronization
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="p-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl text-white shadow-lg"
              >
                <Zap className="w-8 h-8" />
              </motion.div>
              
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent"
                >
                  Task Board
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 dark:text-gray-400 flex items-center gap-2"
                >
                  Collaborative task management • Real-time sync
                  {isConnected ? (
                    <Wifi className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-500" />
                  )}
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                onClick={() => {
                  setEditingTask(null)
                  setIsAddDialogOpen(true)
                }}
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Task
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { 
                label: 'To Do', 
                count: getTasksByStatus('todo').length, 
                icon: Calendar, 
                color: 'text-gray-600 dark:text-gray-400',
                bg: 'bg-gray-100 dark:bg-gray-800'
              },
              { 
                label: 'In Progress', 
                count: getTasksByStatus('in-progress').length, 
                icon: Clock, 
                color: 'text-blue-600 dark:text-blue-400',
                bg: 'bg-blue-100 dark:bg-blue-900/30'
              },
              { 
                label: 'Completed', 
                count: getTasksByStatus('completed').length, 
                icon: CheckCircle2, 
                color: 'text-emerald-600 dark:text-emerald-400',
                bg: 'bg-emerald-100 dark:bg-emerald-900/30'
              },
              { 
                label: 'Verified', 
                count: getTasksByStatus('verified').length, 
                icon: Shield, 
                color: 'text-violet-600 dark:text-violet-400',
                bg: 'bg-violet-100 dark:bg-violet-900/30'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {stat.count}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Connection Status */}
        <AnimatePresence>
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Connection lost - trying to reconnect...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Columns */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { 
              status: 'todo' as TaskStatus, 
              title: 'To Do', 
              description: 'Tasks ready to start',
              color: 'border-t-gray-400',
              headerBg: 'bg-gray-50 dark:bg-gray-800/50'
            },
            { 
              status: 'in-progress' as TaskStatus, 
              title: 'In Progress', 
              description: 'Currently working on',
              color: 'border-t-blue-400',
              headerBg: 'bg-blue-50 dark:bg-blue-900/20'
            },
            { 
              status: 'completed' as TaskStatus, 
              title: 'Completed', 
              description: 'Ready for review',
              color: 'border-t-emerald-400',
              headerBg: 'bg-emerald-50 dark:bg-emerald-900/20'
            },
            { 
              status: 'verified' as TaskStatus, 
              title: 'Verified', 
              description: 'All done!',
              color: 'border-t-violet-400',
              headerBg: 'bg-violet-50 dark:bg-violet-900/20'
            }
          ].map((column, columnIndex) => {
            const columnTasks = getTasksByStatus(column.status)
            
            return (
              <motion.div
                key={column.status}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + columnIndex * 0.1 }}
              >
                <Card className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur border-t-4 ${column.color} h-fit`}>
                  <CardHeader className={`${column.headerBg} border-b border-gray-200 dark:border-gray-700`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {column.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {column.description}
                        </p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + columnIndex * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-white font-semibold min-w-[2rem] justify-center"
                        >
                          {columnTasks.length}
                        </Badge>
                      </motion.div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {columnTasks.map((task, taskIndex) => (
                          <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            transition={{ 
                              delay: 0.9 + columnIndex * 0.1 + taskIndex * 0.05,
                              layout: { type: "spring", stiffness: 400, damping: 25 }
                            }}
                          >
                            <TaskCard 
                              task={task} 
                              onStatusChange={updateTaskStatus}
                              onDelete={handleDeleteTask}
                              onEdit={handleEditTask}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Add Task Dialog */}
      <AddTaskDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddTask={addTask}
        editingTask={editingTask}
        onTaskUpdated={(taskId: string, updates: { title: string; description?: string }) => {
          handleUpdateTask(taskId, updates)
          setIsAddDialogOpen(false)
          setEditingTask(null)
        }}
      />
    </div>
  )
}
