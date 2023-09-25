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

export const addRecipe = createAsyncThunk('recipes/add', async (recipe) => {
  return await axios.post("http://localhost:9000/api/recipes", recipe)
    .then(response => response.data.recette)
    .catch(error => console.log(error))
});

export const modifyRecipe = createAsyncThunk('recipes/modify', async (recipe) => {
  return await axios.put(`http://localhost:9000/api/recipe/${recipe.id}`, recipe)
    .then(response => response.data.recette)
    .catch(error => console.log(error))
})

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    removeRecipe: (state, action) => {
      const recipeIndex = state.value.findIndex((recipe) => recipe.id === action.payload)
      if(recipeIndex > -1) {
        state.value.splice(recipeIndex, 1)
        axios.delete(`http://localhost:9000/api/recipe/${action.payload}`)
      }
    },
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
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.value.push(action.payload)
      })
      .addCase(modifyRecipe.fulfilled, (state, action) => {
        state.value.forEach((item, index) => {
          if(item.id === action.payload.id) {
            state.value.splice(index, 1, action.payload)
          }
        })
      })
  },
})

export const { removeRecipe } = recipeSlice.actions
export default recipeSlice.reducer