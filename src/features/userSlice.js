import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: "yess",
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    // const response = await fetchCount(amount);
    // return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.user = {name:"user"}
    },
    logout: (state) => {
      state.user = null
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { login, logout, increment, decrement, incrementByAmount } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
