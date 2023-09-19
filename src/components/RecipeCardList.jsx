import RecipeCard from '../components/recipeCard'

export default function RecipeCardList({recipes}) {
  return(
    <section className='container'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
          {recipes && recipes.data.map((recipe) => {
          return(
            <div key={recipe.id} className='col'>
              <RecipeCard data={recipe} />
            </div>
          )
          })}
      </div>

    </section>
  )
}