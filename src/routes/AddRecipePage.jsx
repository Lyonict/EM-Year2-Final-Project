import { Form, FloatingLabel, InputGroup, Row, Col } from "react-bootstrap"

export default function AddRecipePage() {
  return(
    <section className="container">
      <h1>This is the page to add a recipe</h1>
      <form>
        {/* Titre */}
        <FloatingLabel controlId="recipe-title" label="Titre de la recette" className="mb-3">
          <Form.Control type="text" />
        </FloatingLabel>
        {/* Description */}
        <FloatingLabel controlId="recipe-description" label="Description" className="mb-3">
          <Form.Control type="text" />
        </FloatingLabel>
        {/* Level */}
        <FloatingLabel controlId="recipe-level" label="Niveau" className="mb-3">
          <Form.Select type="text" aria-label="Niveau">
            <option value="default">-- Choisissez un niveau --</option>
            <option value="padawan">Apprenti</option>
            <option value="jedi">Compagnon</option>
            <option value="master">Maitre</option>
          </Form.Select>
        </FloatingLabel>
        {/* Description */}
        <FloatingLabel controlId="recipe-description" label="Pour combien de personnes" className="mb-3">
          <Form.Control type="number" />
        </FloatingLabel>
        {/* Time */}
        <InputGroup className="mb-3">
          <FloatingLabel controlId="recipe-time" label="Temps de préparation">
            <Form.Control type="number" />
          </FloatingLabel>
          <InputGroup.Text>minutes</InputGroup.Text>
        </InputGroup>
        {/* Image */}
        <FloatingLabel controlId="recipe-image" label="Image (optionel)" className="mb-3">
          <Form.Control type="text" />
        </FloatingLabel>
        {/* Ingredients */}
        <Form.Label htmlFor="ingrediends">Ingredients</Form.Label>
        <InputGroup className="w-100 mb-3">
          <Row className="mx-0 w-100">
            <Col xs={"6"} className="px-0">
              <FloatingLabel controlId="recipe-ingredient-name" label="Ingredient">
                <Form.Control type="text" className="rounded-0 rounded-start"/>
              </FloatingLabel>
            </Col>
            <Col className="px-0">
              <FloatingLabel controlId="recipe-ingredient-quantity" label="Quantité (optionel)">
                <Form.Control type="number" className="rounded-0"/>
              </FloatingLabel>
            </Col>
            <Col className="px-0">
              <FloatingLabel controlId="recipe-ingredient-unit" label="Unité (optionel)">
                <Form.Control type="text" className="rounded-0 rounded-end"/>
              </FloatingLabel>
            </Col>
          </Row>
        </InputGroup>
        {/* Steps */}
        <Form.Label htmlFor="steps">Etapes</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>1</InputGroup.Text>
          <FloatingLabel controlId="recipe-steps" label="Etape">
            <Form.Control as={"textarea"} />
          </FloatingLabel>
        </InputGroup>
      </form>
    </section>
  )
}