import { createSlice } from '@reduxjs/toolkit';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    apiError: false,
  },
  reducers: {
    setApiStatus: (state, action) => {
      state.apiError = action.payload
    }
  }
})

export const { setApiStatus } = apiSlice.actions

export default apiSlice.reducer