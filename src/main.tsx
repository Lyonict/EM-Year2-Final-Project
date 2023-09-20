import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Store & redux
import store from './app/store';
import { Provider } from 'react-redux';
// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import RecipeListPage from './routes/RecipeListPage'
import RecipePage from './routes/RecipePage'
import AddRecipePage from './routes/AddRecipePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/recipes',
        element: <RecipeListPage/>
      },
      {
        path: '/recipe/:recipeId',
        element: <RecipePage/>
      },
      {
        path: '/addrecipe',
        element: <AddRecipePage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
