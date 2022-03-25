import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoApi from "../../apis/todoApi";

export const fetchTodos = createAsyncThunk("todoList/fetchTodos", async ({ rejectWithValue }) => {
  const data = await todoApi.fetchTodos();
  if (data.error) {
    return rejectWithValue(data.error);
  }
  return data;
});

const initialState = {
  items: [],
  loading: false,
  error: null,
  message: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    setTodo: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { addTodo, setTodo } = todoSlice.actions;

export default todoSlice.reducer;
