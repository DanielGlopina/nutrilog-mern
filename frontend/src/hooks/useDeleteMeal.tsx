import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { api } from "@/api/api";
import { queryErrorHandler } from "@/lib/queryErrorHandler";

const useDeleteMeal = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteMeal = async({mealId} : {
        mealId: string | undefined,
        mealDate: Date
    }) => {
        const result = await api.delete(`/meals/delete/${mealId}`);
        return result.data;
        
    }

    const {data: result, isPending, mutate: mutateDeleteMeal} = useMutation({
        mutationFn: deleteMeal,
        onSuccess: async(_data, variables) => {
            const mealDate = format(variables.mealDate, 'yyyy-MM-dd');

             await queryClient.invalidateQueries({
                queryKey: ['meals', mealDate],
            });

            toast.success('Success!', {
                description: 'Meal was deleted!'
            })

            navigate(`/meals?date=${mealDate}`);
        },
        onError: queryErrorHandler
    })

    return { result, isPending, mutateDeleteMeal}
}

export default useDeleteMeal
