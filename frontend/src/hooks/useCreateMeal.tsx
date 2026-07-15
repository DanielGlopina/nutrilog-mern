import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { api } from "@/api/api";
import { mealFormSchema } from "@/validation/mealForm.schema";
import { queryErrorHandler } from "@/lib/queryErrorHandler";
import { createMealPayload } from "@/lib/mealPayload";

const useCreateMeal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMeal = async (data: z.infer<typeof mealFormSchema>) => {
    const meal = createMealPayload(data);
    const result = await api.post("/meals/create", meal);

    return result.data;
  };

  const {
    data: result,
    isPending,
    mutate: mutateCreateMeal,
  } = useMutation({
    mutationFn: createMeal,
    onSuccess: async (_data, variables) => {
      // Refresh only the date affected by the mutation.
      const mealDate = format(variables.date, "yyyy-MM-dd");

      await queryClient.invalidateQueries({
        queryKey: ["meals", mealDate],
      });

      toast.success("Success!", {
        description: "Meal was created!",
      });

      navigate(`/meals?date=${mealDate}`);
    },
    onError: queryErrorHandler,
  });

  return { result, isPending, mutateCreateMeal };
};

export default useCreateMeal;
