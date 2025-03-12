import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('/api/tasks');
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default taskSlice.reducer;
