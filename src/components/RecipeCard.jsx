import { Link, useNavigate } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { removeRecipe } from "../features/recipeSlice"
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons'

export default function RecipeCard({data}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(removeRecipe(data.id))
  }

  const handleModify = (e) => {
    e.preventDefault()
    navigate(`/modifyrecipe/${data.id}`)
  }

  return(
    <Link to={`/recipe/${data.id}`} className="text-decoration-none">
      <Card>
        <Card.Img src={data.photo} alt={data.titre} variant="top"></Card.Img>
        <Card.Body>
          <Card.Title>{data.titre}</Card.Title>
          <Card.Subtitle className="text-body-secondary mb-3">{data.description}</Card.Subtitle>
          <Card.Text className="text-capitalize mb-1"><FontAwesomeIcon icon={faStar} style={{color: "#514b1f",}} /> {data.niveau}</Card.Text>
          <Card.Text><FontAwesomeIcon icon={faUser} /> {data.personnes} {data.personnes > 1 ? "Personnes" : "Personne"}</Card.Text>
          <Button variant="secondary" className="me-2" onClick={(e) => handleModify(e)}>Modify</Button>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>Delete</Button>
        </Card.Body>
      </Card>
    </Link>
  )
}