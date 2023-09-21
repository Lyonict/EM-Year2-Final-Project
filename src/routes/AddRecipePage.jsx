import { all } from "axios"
import { useState } from "react"
import { Form, FloatingLabel, InputGroup, Row, Col, Button } from "react-bootstrap"

export default function AddRecipePage() {
  //Full recipe
  const [recipe, setRecipe] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [level, setLevel] = useState(null)
  const [people, setPeople] = useState(null)
  const [time, setTime] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [allSteps, setAllSteps] = useState([])
  const [image, setImage] = useState(null)
  //Ingredients
  const [ingredientsName, setIngredientName] = useState('')
  const [ingredientsQuantity, setIngredientQuantity] = useState('')
  const [ingredientsUnit, setIngredientUnit] = useState('')
  // Current step
  const [step, setStep] = useState(null)

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

  const handleIngredientAdd = (e) => {
    e.preventDefault()
    setIngredients([
      ...ingredients,
      [ingredientsName, ingredientsQuantity + ingredientsUnit]
    ])
  }

  const handleStepAdd = (e) => {
    if(e.keyCode === 13 && step != null) {
      e.preventDefault()
      setAllSteps([...allSteps, step])
    }
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
        {/* People */}
        <FloatingLabel controlId="recipe-description" label="Pour combien de personnes" className="mb-3">
          <Form.Control type="number" required onChange={(e) => setPeople(e.target.value)}/>
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
          <Form.Control type="text" onChange={(e) => setImage(e.target.value)} />
        </FloatingLabel>
        {/* Ingredients */}
        <Form.Label htmlFor="ingrediends">Ingredients</Form.Label>
        <InputGroup className="w-100 mb-3">
          <Row className="mx-0 w-100">
            <Col xs={"6"} className="px-0">
              <FloatingLabel controlId="recipe-ingredient-name" label="Ingredient">
                <Form.Control type="text" required className="rounded-0 rounded-start" onChange={(e) => setIngredientName(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col className="px-0">
              <FloatingLabel controlId="recipe-ingredient-quantity" label="Quantité (optionel)">
                <Form.Control type="number" className="rounded-0" onChange={(e) => setIngredientQuantity(String(e.target.value))}/>
              </FloatingLabel>
            </Col>
            <Col className="px-0">
              <FloatingLabel controlId="recipe-ingredient-unit" label="Unité (optionel)">
                <Form.Control type="text" className="rounded-0 rounded-end" onChange={(e) => setIngredientUnit(e.target.value)}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Button className="rounded mt-2" onClick={(e) => handleIngredientAdd(e)}>Ajouter un ingrédient</Button>
        </InputGroup>
        {ingredients &&
        ingredients.map((ingredient, index) => {
          return(
            <p key={index}>{`${ingredient[0]} ${ingredient[1] != '' ? ` - ${ingredient[1]}` : ""}`}</p>
          )
        })}
        {/* Steps */}
        <Form.Label htmlFor="steps">Etapes</Form.Label>
        <Form.Text className="text-muted d-block">Appuyez sur Entrer pour ajouter une étape</Form.Text>
        <InputGroup className="mb-3">
          <InputGroup.Text>{allSteps.length + 1}</InputGroup.Text>
          <FloatingLabel controlId="recipe-step-add" label="Etape">
            <Form.Control as={"textarea"} onChange={(e) => setStep(e.target.value)} onKeyDown={(e) => handleStepAdd(e)}/>
          </FloatingLabel>
        </InputGroup>
        {allSteps &&
          <div className="d-flex flex-column-reverse">
            {allSteps.map((step, index) => {
            return(
              <p key={index + 1}>{index + 1} - {step}</p>
            )})}
          </div>
        }
        <button type="submit" className="btn btn-primary">Submit test</button>
      </Form>
    </section>
  )
}