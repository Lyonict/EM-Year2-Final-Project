import { Link } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { removeRecipe } from "../features/recipeSlice"

export default function RecipeCard({data}) {
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(removeRecipe(data.id))
  }
  return(
    <Link to={`/recipe/${data.id}`}>
      <Card>
        <Card.Img src={data.photo} alt={data.titre} variant="top"></Card.Img>
        <Card.Body>
          <Card.Title>{data.titre}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>Delete</Button>
        </Card.Body>
      </Card>
    </Link>
  )
}