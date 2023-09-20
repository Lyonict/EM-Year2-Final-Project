import { useState } from "react"
import { Form, FloatingLabel, InputGroup, Row, Col } from "react-bootstrap"

export default function AddRecipePage() {
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [level, setLevel] = useState(null)
  const [people, setPeople] = useState(null)
  const [time, setTime] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [allSteps, setAllSteps] = useState([])
  const [image, setImage] = useState(null)

  const [recipe, setRecipe] = useState(null)

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log("Tout est conforme")
      setRecipe({
        titre: title,
        description: desc,
        niveau: level,
        personnes: people,
        tempsPrepattion: time,
        ingredients: ingredients,
        etapes: allSteps,
        photo: image
      })
    }

    setValidated(true);
  }

  return(
    <section className="container">
      <h1>This is the page to add a recipe</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Titre */}
        <FloatingLabel controlId="recipe-title" label="Titre de la recette" className="mb-3">
          <Form.Control type="text" required onChange={(e) => setTitle(e.target.value)} />
          <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
        </FloatingLabel>
        {/* Description */}
        <FloatingLabel controlId="recipe-description" label="Description" className="mb-3">
          <Form.Control type="text" required onChange={(e) => setDesc(e.target.value)} />
          <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
        </FloatingLabel>
        {/* Level */}
        <FloatingLabel controlId="recipe-level" label="Niveau" className="mb-3">
          <Form.Select type="text" aria-label="Niveau" defaultValue={""} required onChange={(e) => setLevel(e.target.value)}>
            <option disabled value="">-- Choisissez un niveau --</option>
            <option value="padawan">Apprenti</option>
            <option value="jedi">Compagnon</option>
            <option value="master">Maitre</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Vous devez choisir une des options</Form.Control.Feedback>
        </FloatingLabel>
        {/* Description */}
        <FloatingLabel controlId="recipe-description" label="Pour combien de personnes" className="mb-3">
          <Form.Control type="number" required/>
          <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
        </FloatingLabel>
        {/* Time */}
        <InputGroup hasValidation className="mb-3">
          <FloatingLabel controlId="recipe-time" label="Temps de préparation">
            <Form.Control type="number" required onChange={(e) => setTime(e.target.value)} />
          </FloatingLabel>
          <InputGroup.Text>minutes</InputGroup.Text>
          <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
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
                <Form.Control type="text" required className="rounded-0 rounded-start" onKeyDown={(e) => handleIngredientAdd(e)}/>
                <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
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
          <FloatingLabel controlId="recipe-step-add" label="Etape">
            <Form.Control as={"textarea"} />
          </FloatingLabel>
        </InputGroup>

        {allSteps.length != 0 &&
          <div>
            {allSteps.map((step) => {
              {console.log(step)}
              return(
                <SingularStep key={step.id} data={step}/>
              )
            })}
          </div>
        }
        {/* Picture */}
        <button type="submit" className="btn btn-primary">Submit test</button>
      </Form>
    </section>
  )
}