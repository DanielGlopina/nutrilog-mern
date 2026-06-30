import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import MealsPage from "./pages/MealsPage";
import NewMealPage from "./pages/NewMealPage";
import EditMealPage from "./pages/EditMealPage";
import DashboardPage from "./pages/DashboardPage";
import CalculateNutritionsPage from "./pages/CalculateNutritionsPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryErrorHandler } from "./lib/queryErrorHandler";
import ProtecredRoutesLayout from "./layouts/ProtecredRoutesLayout";
import useVerifyToken from "./hooks/useVerifyToken";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      queryErrorHandler(error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <ProtecredRoutesLayout />,
        children: [
          { path: "/meals", element: <MealsPage /> },
          { path: "/meals/new", element: <NewMealPage /> },
          { path: "/meals/edit", element: <EditMealPage /> },
          { path: "/dashboard", element: <DashboardPage /> },
          {
            path: "/dashboard/nutritions",
            element: <CalculateNutritionsPage />,
          },
        ],
      },
      { path: "/auth", element: <AuthPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  useVerifyToken();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
