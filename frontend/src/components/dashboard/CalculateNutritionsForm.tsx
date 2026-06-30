import { useTransition } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NumberField from "@/components/forms/NumberField";
import { Button } from "@/components/ui/button";
import { CalculatorIcon, Loader } from "lucide-react";
import { formConfig } from "@/config/form.config";
import { nutritionsFormSchema } from "@/validation/nutritionsForm.schema";
import { calculateUserNutririons } from "@/lib/calculations";
import useCreateNutritions from "@/hooks/useCreateNutritions";
import { useAuthStore } from "@/store/useAuthStore";

function CalculateNutritionsForm() {
  const [isPending, startTransition] = useTransition();
  const { isChecking } = useAuthStore();
  const { activityLevels, goals, temp } = formConfig;
  const { mutateCreateNutrition } = useCreateNutritions();

  const form = useForm({
    resolver: zodResolver(nutritionsFormSchema),
    defaultValues: {
      gender: "male",
      activityLevel: "lightly",
      age: 0,
      weight: 0,
      height: 0,
      goal: "maintain",
      temp: undefined,
    },
  });

  const selectedGoal = useWatch({ control: form.control, name: "goal" });

  const getActivitySelectItems = () => {
    return Object.entries(activityLevels).map((item) => {
      return (
        <SelectItem key={item[0]} value={item[0]} className="capitalize">
          {item.join(" ")}
        </SelectItem>
      );
    });
  };

  const getGoalsSelectItems = () => {
    return Object.entries(goals).map((item) => {
      return (
        <SelectItem key={item[0]} value={item[0]}>
          {item[1]}
        </SelectItem>
      );
    });
  };

  const getTempSelectItems = () => {
    return Object.entries(temp).map((item) => {
      return (
        <SelectItem key={item[0]} value={item[0]}>
          {item[1]} {selectedGoal === "loss" ? "Loss" : "Gain"}
        </SelectItem>
      );
    });
  };

  const onSubmit = async (data: z.infer<typeof nutritionsFormSchema>) => {
    startTransition(async () => {
      const nutritions = calculateUserNutririons(data);
      mutateCreateNutrition(nutritions);
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset
        disabled={form.formState.isSubmitting}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
      >
        <Controller
          name="gender"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Gender</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="activityLevel"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Activity Level</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>{getActivitySelectItems()}</SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </fieldset>

      <fieldset
        disabled={form.formState.isSubmitting}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
      >
        <NumberField control={form.control} name="height" label="Height (cm)" />
        <NumberField control={form.control} name="weight" label="Weight (kg)" />
      </fieldset>

      <fieldset
        disabled={form.formState.isSubmitting}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
      >
        <NumberField control={form.control} name="age" label="Age" />
        <Controller
          name="goal"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Select Your Goal</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>{getGoalsSelectItems()}</SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </fieldset>

      {selectedGoal !== "maintain" && (
        <fieldset
          disabled={form.formState.isSubmitting}
          className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4"
        >
          <Controller
            name="temp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Select Prefered Temp</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={"mild"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>{getTempSelectItems()}</SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </fieldset>
      )}

      <Button
        type="submit"
        className="flex items-center justify-start w-55 h-10 mt-10"
        disabled={isPending || isChecking}
      >
        {(isPending || isChecking) && <Loader className="animate-spin" />}
        Calculate My Nutritions
        <CalculatorIcon />
      </Button>
    </form>
  );
}

export default CalculateNutritionsForm;
