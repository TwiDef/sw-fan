import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: "",
    searchList: []
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setSearchList: (state, action) => {
      state.searchList = action.payload
    }
  }
})

export const { setSearchValue, setSearchList } = searchSlice.actions

export default searchSlice.reducer