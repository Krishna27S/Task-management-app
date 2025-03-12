import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../utils/api';

// Types
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: Task['status'];
  priority: Task['priority'];
  dueDate: string;
}

export interface UpdateTaskDto {
  id: string;
  changes: Partial<CreateTaskDto>;
}

interface TaskFilters {
  searchTerm: string;
  status: Task['status'] | 'ALL';
  priority: Task['priority'] | 'ALL';
  sortBy: 'dueDate' | 'priority' | 'status' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

interface TasksState {
  items: Task[];
  filteredItems: Task[];
  loading: boolean;
  error: string | null;
  currentTask: Task | null;
  filters: TaskFilters;
}

// Initial state
const initialState: TasksState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  currentTask: null,
  filters: {
    searchTerm: '',
    status: 'ALL',
    priority: 'ALL',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
};

// Async Thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Task[]>('/tasks');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: CreateTaskDto, { rejectWithValue }) => {
    try {
      const response = await api.post<Task>('/tasks', taskData);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, changes }: UpdateTaskDto, { rejectWithValue }) => {
    try {
      const response = await api.put<Task>(`/tasks/${id}`, changes);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete task');
    }
  }
);

// Helper Functions
const applyFilters = (items: Task[], filters: TaskFilters): Task[] => {
  let filteredTasks = [...items];

  // Apply search filter
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply status filter
  if (filters.status !== 'ALL') {
    filteredTasks = filteredTasks.filter(task => task.status === filters.status);
  }

  // Apply priority filter
  if (filters.priority !== 'ALL') {
    filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
  }

  // Apply sorting
  filteredTasks.sort((a, b) => {
    let comparison = 0;
    switch (filters.sortBy) {
      case 'dueDate':
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'priority':
        const priorityWeight = { LOW: 0, MEDIUM: 1, HIGH: 2 };
        comparison = priorityWeight[a.priority] - priorityWeight[b.priority];
        break;
      case 'status':
        const statusWeight = { TODO: 0, IN_PROGRESS: 1, COMPLETED: 2 };
        comparison = statusWeight[a.status] - statusWeight[b.status];
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }
    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  return filteredTasks;
};

// Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TaskFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    sortTasks: (state, action: PayloadAction<{ sortBy: TaskFilters['sortBy']; sortOrder: TaskFilters['sortOrder'] }>) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
      state.filteredItems = applyFilters(state.items, state.filters);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = applyFilters(action.payload, state.filters);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch tasks';
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.filteredItems = applyFilters(state.items, state.filters);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create task';
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = applyFilters(state.items, state.filters);
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update task';
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.items = state.items.filter(task => task._id !== action.payload);
        state.filteredItems = applyFilters(state.items, state.filters);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete task';
      });
  },
});

// Actions
export const {
  setFilters,
  clearFilters,
  setCurrentTask,
  clearError,
  sortTasks
} = tasksSlice.actions;

// Reducer
export default tasksSlice.reducer;