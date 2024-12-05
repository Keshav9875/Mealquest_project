import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './component/Home.jsx';
import { Recipedata } from './component/recipedata.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
   
  },
  {
    path:"/:mealid",
    element:<Recipedata/>
  }
  
    
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>,
)
