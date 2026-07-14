import { useTransition } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, PencilLine, PlusCircleIcon } from "lucide-react";
import { CalendarPopover } from "@/components/ui/popover";
import type { MealType } from "@/types/MealType.type";
import { mealFormSchema } from "@/validation/mealForm.schema";
import NumberField from "@/components/forms/NumberField";
import type { MealItem } from "@/types/MealItem.type";
import useCreateMeal from "@/hooks/useCreateMeal";
import useEditMeal from "@/hooks/useEditMeal";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  defaultMealType?: string;
  formType: "create" | "edit";
  mealData?: MealItem | null;
  isQuerrying?: boolean;
};

function MealForm({ defaultMealType, formType, mealData, isQuerrying = false }: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { isChecking } = useAuthStore();
  const { mutateCreateMeal } = useCreateMeal();
  const { mutateEditMeal } = useEditMeal();

  const onSubmit = async (data: z.infer<typeof mealFormSchema>) => {
    startTransition(async () => {
      queryClient.invalidateQueries({ queryKey: ["meal", mealData?._id] });

      if (formType === "create") {
        mutateCreateMeal(data);
      } else {
        mutateEditMeal({ mealId: mealData?._id, data });
      }
    });
  };

  const form = useForm({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      mealType:
        mealData?.mealType ?? (defaultMealType as MealType) ?? "breakfast",
      name: mealData?.name ?? "",
      weight: mealData?.weight,
      kcal: mealData?.kcal,
      proteins: mealData?.macros.proteins ?? 0,
      carbs: mealData?.macros.carbs ?? 0,
      fats: mealData?.macros.fats ?? 0,
      fiber: mealData?.macros.fiber ?? 0,
      date: mealData?.date ? new Date(mealData.date) : new Date(),
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset
        disabled={isPending}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
      >
        <Controller
          name="mealType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Meal Type</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(["breakfast", "lunch", "dinner", "snack"]).map(
                    (item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Food Name</FieldLabel>
              <Input {...field} />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </fieldset>

      <fieldset
        disabled={isPending}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
      >
        <NumberField control={form.control} name="weight" label="Weight (g)" />
        <NumberField
          control={form.control}
          name="kcal"
          label="Kcal (per 100 g)"
          isNumericMode={true}
        />
      </fieldset>

      <Field className="mt-4">
        <FieldLabel className="text-xl">Macros (Optional)</FieldLabel>
        <FieldDescription>Macronutrients per 100 grams</FieldDescription>
      </Field>

      <fieldset
        disabled={isPending}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
      >
        <NumberField control={form.control} name="proteins" label="Proteins" />
        <NumberField control={form.control} name="carbs" label="Carbs" />
      </fieldset>

      <fieldset
        disabled={isPending}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
      >
        <NumberField control={form.control} name="fats" label="Fats" />
        <NumberField control={form.control} name="fiber" label="Fiber" />
      </fieldset>

      <Field className="mt-4">
        <FieldLabel className="text-xl">Other Details</FieldLabel>
        <FieldDescription>
          By default meal will be added by today`s date
        </FieldDescription>
      </Field>

      <fieldset disabled={isPending} className="mt-4">
        <Controller
          name="date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Meal Date</FieldLabel>

              <CalendarPopover field={field} />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </fieldset>

      <Button
        type="submit"
        className="flex items-center justify-start w-50 h-10 mt-10"
        disabled={isPending || isChecking || isQuerrying}
      >
        {formType === "create" ? (
          <>
            <PlusCircleIcon />
            Create Meal
          </>
        ) : (
          <>
            <PencilLine />
            Edit Meal
          </>
        )}
        {(isPending || isChecking || isQuerrying) && (
          <Loader className="animate-spin" />
        )}
      </Button>
    </form>
  );
}

export default MealForm;
