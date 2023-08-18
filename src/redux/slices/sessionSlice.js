import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialLoadState } from '../commons';

// Default initial state
export const initialState = {
  ...initialLoadState,
  user: {},
};

// Utils
const setAccessAndRefreshToken = async (accessToken) => {
  await AsyncStorage.setItem('accessToken', accessToken);
  // await AsyncStorage.setItem('refreshToken', refreshToken);
};

// Thunks
export const login = createAsyncThunk('login', async () => {
  setAccessAndRefreshToken('accessToken');
  return;
});

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
      state.loaded = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.loaded = true;
      state.error = error?.message;
    });
  },
});

// export const {} = sessionSlice.actions;
export default sessionSlice.reducer;
