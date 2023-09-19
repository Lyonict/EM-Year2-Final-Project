import { Link } from "react-router-dom"

export default function RecipeCard({data}) {
  return(
    <Link to={`/recipe/${data.id}`} className="card h-100">
      <img src={data.photo} className='card-img-top' alt={data.titre} />
      <div className="card-body">
        <h3 className='card-title'>{data.titre}</h3>
        <p className='card-text'>{data.description}</p>
      </div>
    </Link>
  )
}