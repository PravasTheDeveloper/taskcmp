import { 
  ref, 
  push, 
  set, 
  update, 
  remove, 
  off,
  onValue,
  DataSnapshot
} from 'firebase/database';
import { database } from './firebase';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'verified';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdBy: string;
  createdAt: Date;
  completedAt?: Date;
  verifiedAt?: Date;
}

// Firebase Realtime Database structure
export interface TaskData {
  title: string;
  description?: string;
  status: TaskStatus;
  createdBy: string;
  createdAt: number; // Firebase serverTimestamp becomes number
  completedAt?: number;
  verifiedAt?: number;
}

// Database reference
const TASKS_REF = 'tasks';

// Convert Firebase data to Task interface
const convertFirebaseData = (id: string, data: TaskData): Task => {
  return {
    id,
    title: data.title,
    description: data.description,
    status: data.status,
    createdBy: data.createdBy,
    createdAt: new Date(data.createdAt),
    completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
    verifiedAt: data.verifiedAt ? new Date(data.verifiedAt) : undefined,
  };
};

// Add a new task
export const addTask = async (
  title: string, 
  description?: string, 
  createdBy: string = 'Anonymous'
): Promise<string> => {
  try {
    const tasksRef = ref(database, TASKS_REF);
    const newTaskRef = push(tasksRef);
    
    const taskData: TaskData = {
      title,
      description,
      status: 'todo',
      createdBy,
      createdAt: Date.now(), // Use current timestamp
    };

    await set(newTaskRef, taskData);
    return newTaskRef.key!;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Update task status
export const updateTaskStatus = async (
  taskId: string, 
  newStatus: TaskStatus
): Promise<void> => {
  try {
    const taskRef = ref(database, `${TASKS_REF}/${taskId}`);
    const updateData: Partial<TaskData> = {
      status: newStatus,
    };

    // Add timestamps for completion and verification
    if (newStatus === 'completed') {
      updateData.completedAt = Date.now();
    } else if (newStatus === 'verified') {
      updateData.verifiedAt = Date.now();
    }

    await update(taskRef, updateData);
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

// Update task details
export const updateTask = async (
  taskId: string, 
  updates: Partial<Pick<Task, 'title' | 'description'>>
): Promise<void> => {
  try {
    const taskRef = ref(database, `${TASKS_REF}/${taskId}`);
    await update(taskRef, updates);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = ref(database, `${TASKS_REF}/${taskId}`);
    await remove(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Real-time listener for all tasks
export const subscribeToTasks = (
  callback: (tasks: Task[]) => void,
  onError?: (error: Error) => void
) => {
  const tasksRef = ref(database, TASKS_REF);

  const unsubscribe = onValue(
    tasksRef,
    (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      const tasks: Task[] = [];
      
      if (data) {
        // Convert Firebase object to array, sorted by creation time (newest first)
        Object.keys(data)
          .sort((a, b) => (data[b].createdAt || 0) - (data[a].createdAt || 0))
          .forEach((taskId) => {
            tasks.push(convertFirebaseData(taskId, data[taskId]));
          });
      }
      
      callback(tasks);
    },
    (error) => {
      console.error('Error in tasks subscription:', error);
      if (onError) onError(error as Error);
    }
  );

  // Return unsubscribe function
  return () => off(tasksRef, 'value', unsubscribe);
};

// Real-time listener for tasks by status
export const subscribeToTasksByStatus = (
  status: TaskStatus,
  callback: (tasks: Task[]) => void,
  onError?: (error: Error) => void
) => {
  const tasksRef = ref(database, TASKS_REF);

  const unsubscribe = onValue(
    tasksRef,
    (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      const tasks: Task[] = [];
      
      if (data) {
        // Filter by status and sort by creation time
        Object.keys(data)
          .filter((taskId) => data[taskId].status === status)
          .sort((a, b) => (data[b].createdAt || 0) - (data[a].createdAt || 0))
          .forEach((taskId) => {
            tasks.push(convertFirebaseData(taskId, data[taskId]));
          });
      }
      
      callback(tasks);
    },
    (error) => {
      console.error(`Error in ${status} tasks subscription:`, error);
      if (onError) onError(error as Error);
    }
  );

  // Return unsubscribe function
  return () => off(tasksRef, 'value', unsubscribe);
};

// Real-time listener for a single task
export const subscribeToTask = (
  taskId: string,
  callback: (task: Task | null) => void,
  onError?: (error: Error) => void
) => {
  const taskRef = ref(database, `${TASKS_REF}/${taskId}`);

  const unsubscribe = onValue(
    taskRef,
    (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        callback(convertFirebaseData(taskId, data));
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error(`Error in task ${taskId} subscription:`, error);
      if (onError) onError(error as Error);
    }
  );

  // Return unsubscribe function
  return () => off(taskRef, 'value', unsubscribe);
};

// Get task statistics
export const getTaskStats = (tasks: Task[]) => {
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    verified: tasks.filter(t => t.status === 'verified').length,
  };
};

// Batch operations for multiple tasks
export const batchUpdateTasks = async (
  updates: Array<{ taskId: string; data: Partial<TaskData> }>
): Promise<void> => {
  try {
    const batchUpdates: { [key: string]: any } = {};
    
    updates.forEach(({ taskId, data }) => {
      Object.keys(data).forEach((field) => {
        batchUpdates[`${TASKS_REF}/${taskId}/${field}`] = data[field as keyof TaskData];
      });
    });

    await update(ref(database), batchUpdates);
  } catch (error) {
    console.error('Error in batch update:', error);
    throw error;
  }
};

// Get connection state
export const subscribeToConnectionState = (
  callback: (isConnected: boolean) => void
) => {
  const connectedRef = ref(database, '.info/connected');
  
  return onValue(connectedRef, (snapshot) => {
    callback(snapshot.val() === true);
  });
}; 