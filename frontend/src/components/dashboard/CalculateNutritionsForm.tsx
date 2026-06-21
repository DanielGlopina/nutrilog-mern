import { useNavigate } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NumberField from "@/components/forms/NumberField";
import { Button } from "@/components/ui/button";
import { CalculatorIcon } from "lucide-react";
import { formConfig } from "@/config/form.config";
import { nutritionsFormSchema } from "@/validation/nutritionsForm.schema";
import { calculateUserNutririons } from "@/lib/calculations"; 
import { toast } from "sonner";

function CalculateNutritionsForm() {
   const navigate = useNavigate();
   const { activityLevels, goals } = formConfig;

   const form = useForm({
      resolver: zodResolver(nutritionsFormSchema),
      defaultValues: {
         gender: 'male',
         activityLevel: 'lightly',
         age: 0,
         weight: 0,
         heigth: 0,
         goal: 'maintain'
      },
   })

   const getActivitySelectItems = () => {
      return Object.entries(activityLevels).map((item) => {
         return <SelectItem key={item[0]} value={item[0]} className="capitalize">{item.join(' ')}</SelectItem>
      })
   }

   const getGoalsSelectItems = () => {
      return Object.entries(goals).map((item) => {
         return <SelectItem key={item[0]} value={item[0]}>{item[1]}</SelectItem>
      })
   }

   const onSubmit = async (data: z.infer<typeof nutritionsFormSchema>) => {
      const nutritions = calculateUserNutririons(data);

      console.log(nutritions);

    //   const result = await setUserNutritions(nutritions);

    //   if (result.error) {
    //      toast.error('Error', {
    //         description: result.message  QUERY FOR UPDATING USER NUTRITION
    //      })
    //   }

      toast.success("Success", {
         description: 'User nutritions were updated'
      })

      navigate('/dashboard');
   }

   return <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4">
         <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>
                     Gender
                  </FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value='male'>Male</SelectItem>
                        <SelectItem value='female'>Female</SelectItem>
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
                  <FieldLabel>
                     Activity Level
                  </FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {getActivitySelectItems()}
                     </SelectContent>
                  </Select>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>

      <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4">
         <NumberField control={form.control} name="heigth" label="Heigth (cm)" />
         <NumberField control={form.control} name="weight" label="Weight (kg)" />
      </fieldset>

      <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4">
         <NumberField control={form.control} name="age" label="Age" />
         <Controller
            name="goal"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>
                     Select Your Goal
                  </FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {getGoalsSelectItems()}
                     </SelectContent>
                  </Select>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>
      <Button type="submit" className="flex items-center justify-start w-50 h-10 mt-10">
         Calculate My Nutitions
         <CalculatorIcon />
      </Button>
   </form>;
}

export default CalculateNutritionsForm;