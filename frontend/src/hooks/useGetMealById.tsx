import { useQuery} from "@tanstack/react-query"
import { api } from "@/api/api"
import { useAuthStore } from "@/store/useAuthStore"

const useGetMealById = (mealId: string | null) => {
    const {isAuthenticated} = useAuthStore();

    const getMealById = async() => {
        const meal = await api.get(`/meals/${mealId}`);
        return meal.data;
    }

    const {data: meal, isLoading} = useQuery({
        queryKey: ['meal', mealId],
        queryFn: getMealById,
        enabled: !!mealId && isAuthenticated,
        
    })

    return {meal, isLoading}
  }


export default useGetMealById
