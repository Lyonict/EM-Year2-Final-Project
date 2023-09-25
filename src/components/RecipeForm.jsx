import { useState, useEffect } from "react";
import { Form, FloatingLabel, InputGroup, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, modifyRecipe } from "../features/recipeSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function RecipeForm({recipeData}) {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes.value)
  const [initialRender, setInitialRender] = useState(true)

  //Full recipe
  const [recipeId, setRecipeId] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [level, setLevel] = useState("")
  const [people, setPeople] = useState("")
  const [time, setTime] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [allSteps, setAllSteps] = useState([])
  const [image, setImage] = useState("")
  //Ingredients
  const [ingredientsName, setIngredientName] = useState("")
  const [ingredientsQuantity, setIngredientQuantity] = useState("")
  // Current step
  const [step, setStep] = useState("")

  // Form validation
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    checkSpecialFieldsValidation()
    if (form.checkValidity() === false || !allSteps.length || !ingredients.length ) {
      console.log("Formulaire non conforme")
      event.stopPropagation();
    } else {
      console.log("Tout est conforme")
      const recipe = {
        id: recipeId,
        titre: title,
        description: desc,
        niveau: level,
        personnes: people,
        tempsPreparation: time,
        ingredients: ingredients,
        etapes: allSteps,
        photo: image
      }
      if(recipeData) {
        dispatch(modifyRecipe(recipe))
      } else {
        dispatch(addRecipe(recipe))
      }
    }

    setValidated(true);
  }

  // Because of the way the ingredients and steps fields need to be done, we can't use bootstrap default validation. So we do our own
  // This validation is when we submit the form : it checks for both
  const checkSpecialFieldsValidation = () => {
    checkStepsValidation()
    checkIngredientsValidation()
  }

  // This validation if for the ingredients alone : it is used when we delete an ingredient, so the message appear when we deleted all ingredients
  const checkIngredientsValidation = () => {
    const feedbackIngredients = document.querySelector('#form-control-feedback-ingredients')
    if(feedbackIngredients) {
      if(!ingredients.length) {
        feedbackIngredients.style.display = "block"
      } else {
        feedbackIngredients.style.display = "none"
      }
    }
  }

  // Same as above, but for steps
  const checkStepsValidation = () => {
    const feedbackSteps = document.querySelector('#form-control-feedback-steps')
    if(feedbackSteps) {
      if(!allSteps.length) {
        feedbackSteps.style.display = "block"
      } else {
        feedbackSteps.style.display = "none"
      }
    }
  }

  // Maps for ingredients and steps
  const handleIngredientAdd = (e) => {
    e.preventDefault()
    setIngredients([
      ...ingredients,
      [ingredientsName, ingredientsQuantity]
    ])
  }
  const handleStepAdd = (e) => {
    if(e.keyCode === 13 && step != null) {
      e.preventDefault()
      setAllSteps([...allSteps, step])
    }
  }

  const handleIngredientModify = (e, index, field) => {
    // Index of each inside the array, for reference purposes
    // ingredient = 0
    // quantity = 1
    if(field === 1 || e.target.value != "") {
      e.preventDefault()
      const newArray = [...ingredients]
      const newIngredient = [...newArray[index]]
      newIngredient.splice(field, 1, e.target.value)
      newArray.splice(index, 1, newIngredient)
      setIngredients(newArray)
    }
  }

  const handleStepModify = (e, index) => {
    if(e.target.value != "") {
      e.preventDefault()
      const newArray = [...allSteps]
      newArray.splice(index, 1, e.target.value)
      setAllSteps(newArray)
    }
  }

  const handleIngredientDelete = (e, index) => {
    const newArray = [...ingredients]
    newArray.splice(index, 1)
    setIngredients(newArray)
  }

  const handleStepDelete = (e, index) => {
    const newArray = [...allSteps]
    newArray.splice(index, 1)
    setAllSteps(newArray)
  }

  useEffect(() => {
    return () => {
      if(recipeData) {
        setRecipeId(recipeData.id)
        setTitle(recipeData.titre)
        setDesc(recipeData.description)
        setLevel(recipeData.niveau)
        setPeople(recipeData.personnes)
        setTime(recipeData.tempsPreparation)
        setIngredients(recipeData.ingredients)
        setAllSteps(recipeData.etapes)
        setImage(recipeData.photo)
      } else if(allRecipes.length) {
        const lastRecipe = allRecipes[allRecipes.length-1]
        setRecipeId(lastRecipe.id+1)
      }
      if(initialRender === false) {
        checkIngredientsValidation()
        checkStepsValidation()
      }
      setInitialRender(false)
    }
  }, [recipeData, allRecipes, ingredients, allSteps])

  return(
    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
      {/* Titre */}
      <FloatingLabel controlId="recipe-title" label="Titre de la recette" className="mb-3">
        <Form.Control
        type="text"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)} />
      </FloatingLabel>
      {/* Description */}
      <FloatingLabel controlId="recipe-description" label="Description" className="mb-3">
        <Form.Control
        type="text"
        value={desc}
        required
        onChange={(e) => setDesc(e.target.value)} />
      </FloatingLabel>
      {/* Level */}
      <FloatingLabel controlId="recipe-level" label="Niveau" className="mb-3">
        <Form.Select
        type="text"
        aria-label="Niveau"
        value={level}
        required
        onChange={(e) => setLevel(e.target.value)}>
          <option disabled value="">-- Choisissez un niveau --</option>
          <option value="padawan">Apprenti</option>
          <option value="jedi">Compagnon</option>
          <option value="maitre">Maitre</option>
        </Form.Select>
      </FloatingLabel>
      {/* People */}
      <FloatingLabel controlId="recipe-people" label="Pour combien de personnes" className="mb-3">
        <Form.Control
        type="number"
        required
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))}/>
      </FloatingLabel>
      {/* Time */}
      <InputGroup hasValidation className="mb-3">
        <FloatingLabel controlId="recipe-time" label="Temps de préparation">
          <Form.Control
          type="number"
          required
          value={time}
          className="rounded-0 rounded-start"
          onChange={(e) => setTime(Number(e.target.value))} />
        </FloatingLabel>
        <InputGroup.Text>minutes</InputGroup.Text>
      </InputGroup>
      {/* Image */}
      <FloatingLabel controlId="recipe-image" label="Image (optionel)" className="mb-3">
        <Form.Control
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)} />
      </FloatingLabel>
      {/* Ingredients */}
      <h5>Ingredients</h5>
      <InputGroup className="w-100 mb-3">
        <Row className="mx-0 w-100">
          <Col xs={"8"} className="px-0">
            <FloatingLabel controlId="recipe-ingredient-name" label="Ingredient">
              <Form.Control type="text" className="rounded-0 rounded-start" onChange={(e) => setIngredientName(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col className="px-0">
            <FloatingLabel controlId="recipe-ingredient-quantity" label="Quantité (optionel)">
              <Form.Control type="text" className="rounded-0 rounded-end" onChange={(e) => setIngredientQuantity(String(e.target.value))}/>
            </FloatingLabel>
          </Col>
        </Row>
        <Button className="rounded mt-2" onClick={(e) => handleIngredientAdd(e)}>Ajouter un ingrédient</Button>
      </InputGroup>
      {ingredients &&
      ingredients.map((ingredient, index) => {
        return(
          <InputGroup key={index} className="w-100 mb-3">
            <Row className="mx-0 w-100">
              <Col xs={"7"} className="px-0">
                <FloatingLabel controlId={`recipe-ingredient-name-${index+1}`} label="Ingredient">
                  <Form.Control type="text" value={ingredient[0]} className="rounded-0 rounded-start" onChange={(e) => handleIngredientModify(e, index, 0)}/>
                </FloatingLabel>
              </Col>
              <Col xs={"4"} className="px-0">
                <FloatingLabel controlId={`recipe-ingredient-quantity-${index+1}`} label="Quantité (optionel)">
                  <Form.Control type="text" value={ingredient[1]} className="rounded-0 rounded-end" onChange={(e) => handleIngredientModify(e, index, 1)} />
                </FloatingLabel>
              </Col>
              <Col xs={"1"} className="d-flex align-items-center">
                <Button variant="danger" onClick={(e) => handleIngredientDelete(e, index)}>
                  <FontAwesomeIcon icon={faTrash}/>
                </Button>
              </Col>
            </Row>
          </InputGroup>
        )
      })}
      <Form.Control.Feedback className="mb-3" id="form-control-feedback-ingredients" type="invalid">Vous devez ajouter au moins un ingrédient</Form.Control.Feedback>
      {/* Steps */}
      <h5>Etapes</h5>
      <Form.Text className="text-muted d-block">Appuyez sur Entrer pour ajouter une étape</Form.Text>
      <InputGroup className="mb-3">
        <InputGroup.Text>{allSteps.length + 1}</InputGroup.Text>
        <Form.Control as={"textarea"} onChange={(e) => setStep(e.target.value)} onKeyDown={(e) => handleStepAdd(e)}/>
      </InputGroup>
      {allSteps &&
        <div className="d-flex flex-column-reverse">
          {allSteps.map((step, index) => {
          return(
            <InputGroup key={index} className="mb-3">
              <InputGroup.Text>{index + 1}</InputGroup.Text>
              <Form.Control as={"textarea"} value={step} className="pe-4" onChange={(e) => handleStepModify(e, index)} />
              <Button variant="danger" onClick={(e) => handleStepDelete(e, index)}>
                <FontAwesomeIcon icon={faTrash}/>
              </Button>
            </InputGroup>
          )})}
        </div>
      }
      <Form.Control.Feedback className="mb-3" id="form-control-feedback-steps" type="invalid">Vous devez ajouter au moins une étape</Form.Control.Feedback>
      <button type="submit" className="btn btn-primary">Submit test</button>
    </Form>
  )
}