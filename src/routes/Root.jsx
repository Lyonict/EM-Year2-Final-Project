import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipeSlice";

export default function Root() {
  const dispatch = useDispatch()

  const recipeStatus = useSelector(state => state.recipes.status)

  useEffect(() => {
    return () => {
      if(recipeStatus == "idle") {
        dispatch(fetchRecipes())
      }
    }
  }, [recipeStatus, dispatch])

  return(
    <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}