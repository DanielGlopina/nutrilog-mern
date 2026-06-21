import {createBrowserRouter, RouterProvider} from 'react-router';
import MainLayout from './layouts/MainLayout';
import MealsPage from './pages/MealsPage';
import NewMealPage from './pages/NewMealPage';
import EditMealPage from './pages/EditMealPage';
import DashboardPage from './pages/DashboardPage';
import CalculateNutritionsPage from './pages/CalculateNutritionsPage';

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout/>,
      children: [
        {index: true, element: <div>Main Page</div>},
        {path: '/meals', element: <MealsPage/>},
        {path: '/meals/new', element: <NewMealPage/>},
        {path: '/meals/edit', element: <EditMealPage/>},
        {path: '/dashboard', element: <DashboardPage/>},
        {path: '/dashboard/nutritions', element: <CalculateNutritionsPage/>},
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
