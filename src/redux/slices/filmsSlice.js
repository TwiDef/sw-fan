import { createSlice } from '@reduxjs/toolkit';

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    filmList: [],
    singleFilm: null
  },
  reducers: {
    setFilms: (state, action) => {
      state.filmList = action.payload
    },
    setSingleFilm: (state, action) => {
      state.singleFilm = action.payload
    }
  }
})

export const { setFilms, setSingleFilm } = filmsSlice.actions

export default filmsSlice.reducer