import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

export default function ModifyRecipePage() {
  const param = useParams()
  const recipes = useSelector((state) => state.recipes.value)
  const recipeToModify = recipes.find(recipe => recipe.id == param.recipeId)

  return(
    <section className="container">
      <h1>Modify recipe page</h1>
      {/* Loading display */}
      {!recipeToModify &&
      <h2>Loading</h2>}

      {/* Success display */}
      {recipeToModify &&
      <h2>This is the recipe</h2>}
      <RecipeForm recipeData={recipeToModify}/>
      {/* Error display */}
    </section>
  )
}