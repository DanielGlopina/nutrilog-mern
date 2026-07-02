import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { api } from "@/api/api";
import { mealFormSchema } from "@/validation/mealForm.schema";
import { queryErrorHandler } from "@/lib/queryErrorHandler";

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
    const meal = {
      mealType: data.mealType,
      name: data.name,
      weight: data.weight,
      kcal: data.kcal,
      macros: {
        proteins: ((data.proteins || 0) * data.weight) / 100,
        carbs: ((data.carbs || 0) * data.weight) / 100,
        fats: ((data.fats || 0) * data.weight) / 100,
        fiber: ((data.fiber || 0) * data.weight) / 100,
      },
      date: format(data.date, "yyyy-MM-dd"),
    };

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
