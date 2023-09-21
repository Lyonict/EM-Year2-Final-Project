import RecipeCardList from "../components/RecipeCardList";
import { useSelector } from "react-redux";

export default function RecipeListPage() {
  const recipes = useSelector((state) => state.recipes.value);
  const error = useSelector((state) => state.recipes.error);
  const status = useSelector((state) => state.recipes.status);
  return (
    <>
      <p>This is the recipe list page</p>
      {/* Loading display */}
      {status === "loading" && (
        // TODO: display skeletton cards
        <p>Loading...</p>
      )}

      {/* Success display */}
      {status === "succeeded" && <RecipeCardList recipes={recipes} />}

      {/* Error display */}
      {error && (
        // TODO: create proper error screen
        <p>Error : {error.message}</p>
      )}
    </>
  );
}
