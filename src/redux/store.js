import { configureStore } from '@reduxjs/toolkit'
import charactersSlice from './slices/charactersSlice'
import apiSlice from './slices/apiSlice'
import filmsSlice from './slices/filmsSlice'
import searchSlice from './slices/searchSlice'
import speciesSlice from './slices/speciesSlice'

export default configureStore({
  reducer: {
    characters: charactersSlice,
    films: filmsSlice,
    species: speciesSlice,
    search: searchSlice,
    api: apiSlice
  }
})