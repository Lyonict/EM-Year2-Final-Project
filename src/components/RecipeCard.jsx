export default function RecipeCard({data}) {
  return(
    <div className="card">
      <img src={data.photo} className='card-img-top' alt={data.titre} />
      <div className="card-body">
        <h3 className='card-title'>{data.titre}</h3>
        <p className='card-text'>{data.description}</p>
      </div>
    </div>
  )
}