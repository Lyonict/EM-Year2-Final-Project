export default function RecipePage({data}) {
  return(
    <section>
      <img src={data.photo} alt={data.titre} />
      <h1>{data.titre}</h1>
      <p>{data.description}</p>
      <p>Niveau : {data.niveau}</p>
      <p>Temps de préparation : {data.tempsPreparation}</p>
      <p>Pour {data.personnes} personne</p>
      <h3>Ingredients</h3>
      <ul>
        {data.ingredients.map((ingredient, index) => {
          return(
            <li key={index+1}>{ingredient[0]} {ingredient[1]}</li>
          )
        })}
      </ul>
      <h3>Etapes</h3>
        <ol>
          {data.etapes.map((etape, index) => {
            return(
              <li key={index+1}>{etape}</li>
            )
          })}
        </ol>
    </section>
  )
}