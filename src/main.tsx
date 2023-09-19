import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
// Store & redux
import store from './app/store';
import { Provider } from 'react-redux';
// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root'
import Home from './routes/Home'
import RecipeListPage from './routes/RecipeListPage'
import RecipePage from './routes/RecipePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
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
