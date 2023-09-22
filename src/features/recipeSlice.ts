import { createSlice, createAsyncThunk,  } from "@reduxjs/toolkit";
import axios from "axios";
import type { Recipe } from "../types/recipes";

type InitialState = {
  value: Recipe[],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null | undefined | string
}

const initialState: InitialState = {
  value: [],
  status: "idle",
  error: null
}

export const fetchRecipes= createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios("http://localhost:9000/api/recipes")
  return response.data
})

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.value.push(action.payload)
      axios.post("http://localhost:9000/api/recipes", action.payload)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    },
    removeRecipe: (state, action) => {
      const recipeIndex = state.value.findIndex((recipe) => recipe.id === action.payload)
      if(recipeIndex > -1) {
        state.value.splice(recipeIndex, 1)
        axios.delete(`http://localhost:9000/api/recipe/${action.payload}`)
      }
    },
    modifyRecipe: (state, action) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.value = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { addRecipe, removeRecipe, modifyRecipe } = recipeSlice.actions
export default recipeSlice.reducer