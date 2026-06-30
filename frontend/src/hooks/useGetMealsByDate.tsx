import { useQuery } from "@tanstack/react-query"
import { api } from '../api/api';
import type { MealItem } from "@/types/MealItem.type";
import { useAuthStore } from "@/store/useAuthStore";

type UseMealsReturn = {
  meals: MealItem[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}

const useGetMealsByDate = (date: string): UseMealsReturn => {
  const {isAuthenticated} = useAuthStore();

  const fetchMeals = async (): Promise<MealItem[]> => {
    const response = await api.get(`/meals/${date}`);
    return response.data;
  }

  const { data: meals, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['meals', date],
    queryFn: fetchMeals,
    retry: 1,
    enabled: isAuthenticated
  });

  return { meals, isLoading, isFetching, refetch };
}

export default useGetMealsByDate
