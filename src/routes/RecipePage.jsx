import { useParams } from 'react-router-dom'
import RecipePage from '../components/RecipePage'
import useFetch from '../hooks/useFetch'

export default function RecipeListPage() {
  const url = `http://localhost:9000/api/recipe/${useParams().recipeId}`
  const {data:recipe, error} = useFetch(url)
  return(
    <>
      <p>This is the single recipe page</p>
      {/* Loading display */}
      {!recipe && !error &&
      // TODO: display skeletton cards
      <p>Loading...</p>}


      {/* Success display */}
      {recipe &&
      <RecipePage key={recipe.id} data={recipe.data} />
      }


      {/* Error display */}
      {error &&
      // TODO: create proper error screen
      <p>Error</p>}
    </>
  )
}