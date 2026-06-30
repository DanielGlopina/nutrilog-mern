import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { Nutritions } from "@/types/Nutritions.type"
import { api } from "@/api/api"
import { queryErrorHandler } from "@/lib/queryErrorHandler"

const useCreateNutritions = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createNutrition = async(nutritions: Nutritions) => {
        const result = await api.post('/nutritions/update', nutritions)
        return result.data;
    
    }

    const {data: result, isPending, mutate: mutateCreateNutrition} = useMutation({
        mutationFn: createNutrition,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['nutritions'],
            });

            toast.success('Success!', {
                description: 'User nutritions were updated!'
            });

            navigate('/dashboard');
        },
        onError: queryErrorHandler
    })

    return { result, isPending, mutateCreateNutrition}
}

export default useCreateNutritions
