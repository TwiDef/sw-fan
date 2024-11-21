import { createSlice } from "@reduxjs/toolkit";

export const speciesSlice = createSlice({
  name: 'species',
  initialState: {
    speciesList: [],
    race: null
  },

  reducers: {
    setSpeciesList: (state, action) => {
      state.speciesList = action.payload
    },
    setRace: (state, action) => {
      state.race = action.payload
    }
  }
})

export const { setSpeciesList, setRace } = speciesSlice.actions

export default speciesSlice.reducer