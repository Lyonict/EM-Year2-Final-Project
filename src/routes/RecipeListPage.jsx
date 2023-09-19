import useFetch from '../hooks/useFetch'
import RecipeCardList from '../components/RecipeCardList'

export default function RecipeListPage() {
  const url = "http://localhost:9000/api/recipes"
  const {data:recipes, error} = useFetch(url)
  return(
    <>
      <p>This is the recipe list page</p>
      {/* Loading display */}
      {!recipes && !error &&
      // TODO: display skeletton cards
      <p>Loading...</p>}


      {/* Success display */}
      <RecipeCardList recipes={recipes}/>


      {/* Error display */}
      {error &&
      // TODO: create proper error screen
      <p>Error</p>}
    </>
  )
}