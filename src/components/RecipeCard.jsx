import { Link, useNavigate } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { removeRecipe } from "../features/recipeSlice"

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
    <Link to={`/recipe/${data.id}`}>
      <Card>
        <Card.Img src={data.photo} alt={data.titre} variant="top"></Card.Img>
        <Card.Body>
          <Card.Title>{data.titre}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <Button variant="secondary" className="me-2" onClick={(e) => handleModify(e)}>Modify</Button>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>Delete</Button>
        </Card.Body>
      </Card>
    </Link>
  )
}