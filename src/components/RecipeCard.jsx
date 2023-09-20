import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"

export default function RecipeCard({data}) {
  return(
    <Link to={`/recipe/${data.id}`}>
      <Card>
        <Card.Img src={data.photo} alt={data.titre} variant="top"></Card.Img>
        <Card.Body>
          <Card.Title>{data.titre}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}