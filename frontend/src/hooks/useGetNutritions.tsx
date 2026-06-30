import { useQuery} from "@tanstack/react-query"
import { api } from "@/api/api"
import { useAuthStore } from "@/store/useAuthStore";

const useGetNutritions = () => {
     const {isAuthenticated} = useAuthStore();
    const getNutritions = async() => {
        const response = await api.get('/nutritions');
        return response.data;
    }

    const {data: nutritions, isLoading} = useQuery({
        queryKey: ['nutritions'],
        queryFn: getNutritions ,
        enabled: isAuthenticated
    })

    return {nutritions, isLoading}
  }


export default useGetNutritions
