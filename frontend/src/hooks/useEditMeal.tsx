import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { api } from "@/api/api";
import { mealFormSchema } from "@/validation/mealForm.schema";
import { queryErrorHandler } from "@/lib/queryErrorHandler";
import { createMealPayload } from "@/lib/mealPayload";

const useEditMeal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMeal = async ({
    mealId,
    data,
  }: {
    mealId: string | undefined;
    data: z.infer<typeof mealFormSchema>;
  }) => {
    const meal = createMealPayload(data);

    const result = await api.put(`/meals/update/${mealId}`, meal);
    return result.data;
  };

  const {
    data: result,
    isPending,
    mutate: mutateEditMeal,
  } = useMutation({
    mutationFn: updateMeal,
    onSuccess: async (_data, variables) => {
      const mealDate = format(variables.data.date, "yyyy-MM-dd");

      await queryClient.invalidateQueries({
        queryKey: ["meals", mealDate],
      });

      toast.success("Success!", {
        description: "Meal was edited successfully!",
      });

      navigate(`/meals?date=${mealDate}`);
    },
    onError: queryErrorHandler,
  });

  return { result, isPending, mutateEditMeal };
};

export default useEditMeal;
