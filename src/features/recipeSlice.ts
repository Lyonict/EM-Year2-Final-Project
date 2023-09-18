import { createSlice } from "@reduxjs/toolkit";

export const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    value: []
  },
  reducers: {
    addRecipe: (state, action) => {},
    removeRecipe: (state, action) => {},
    modifyRecipe: (state, action) => {},
  }
})

export const { addRecipe, removeRecipe, modifyRecipe } = recipeSlice.actions
export default recipeSlice.reducer