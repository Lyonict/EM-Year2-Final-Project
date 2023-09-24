import { useState, useEffect } from "react";
import { Form, FloatingLabel, InputGroup, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, modifyRecipe } from "../features/recipeSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function RecipeForm({recipeData}) {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes.value)

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
      if (form.checkValidity() === false ) {
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

  const handleStepModify = (e, index) => {
    if(e.target.value != "") {
      e.preventDefault()
      const newArray = [...allSteps]
      newArray.splice(index, 1, e.target.value)
      setAllSteps(newArray)
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

  const handleDeleteFromState = (e, index, state, setState) => {
    const newArray = [...state]
    newArray.splice(index, 1)
    setState(newArray)
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
    }
  }, [recipeData, allRecipes])

  return(
    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
      {/* Titre */}
      <FloatingLabel controlId="recipe-title" label="Titre de la recette" className="mb-3">
        <Form.Control
        type="text"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)} />
        <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
      </FloatingLabel>
      {/* Description */}
      <FloatingLabel controlId="recipe-description" label="Description" className="mb-3">
        <Form.Control
        type="text"
        value={desc}
        required
        onChange={(e) => setDesc(e.target.value)} />
        <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">Vous devez choisir une des options</Form.Control.Feedback>
      </FloatingLabel>
      {/* People */}
      <FloatingLabel controlId="recipe-people" label="Pour combien de personnes" className="mb-3">
        <Form.Control
        type="number"
        required
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))}/>
        <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
      </FloatingLabel>
      {/* Time */}
      <InputGroup hasValidation className="mb-3">
        <FloatingLabel controlId="recipe-time" label="Temps de préparation">
          <Form.Control
          type="number"
          required
          value={time}
          onChange={(e) => setTime(Number(e.target.value))} />
        </FloatingLabel>
        <InputGroup.Text>minutes</InputGroup.Text>
        <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
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
                <FloatingLabel controlId="recipe-ingredient-name" label="Ingredient">
                  <Form.Control type="text" value={ingredient[0]} className="rounded-0 rounded-start" onChange={(e) => handleIngredientModify(e, index, 0)}/>
                  <Form.Control.Feedback type="invalid">Vous devez remplir ce champs</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={"4"} className="px-0">
                <FloatingLabel controlId="recipe-ingredient-quantity" label="Quantité (optionel)">
                  <Form.Control type="text" value={ingredient[1]} className="rounded-0 rounded-end" onChange={(e) => handleIngredientModify(e, index, 1)} />
                </FloatingLabel>
              </Col>
              <Col xs={"1"} className="d-flex align-items-center">
                <Button variant="danger" onClick={(e) => handleDeleteFromState(e, index, ingredients, setIngredients)}>
                  <FontAwesomeIcon icon={faTrash}/>
                </Button>
              </Col>
            </Row>
          </InputGroup>
        )
      })}
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
              <Button variant="danger" onClick={(e) => handleDeleteFromState(e, index, allSteps, setAllSteps)}>
                <FontAwesomeIcon icon={faTrash}/>
              </Button>
            </InputGroup>
          )})}
        </div>
      }
      <button type="submit" className="btn btn-primary">Submit test</button>
    </Form>
  )
}