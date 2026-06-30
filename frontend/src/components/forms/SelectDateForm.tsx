import { useNavigate } from 'react-router';
import { Field, FieldError } from "@/components/ui/field";
import { CalendarPopover } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import z from "zod";
import { format } from "date-fns";
import { Notebook } from "lucide-react";
import { useQueryClient } from '@tanstack/react-query';

function SelectDateForm({ path }: { path: string }) {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const dateFormSchema = z.object({ date: z.date() })

   const form = useForm({
      resolver: zodResolver(dateFormSchema),
      defaultValues: {
         date: new Date(),
      },
   })

   const handleSubmit = async (data: z.infer<typeof dateFormSchema>) => {
      const date = format(data.date ?? new Date(), 'yyyy-MM-dd');

      navigate(`${path}?date=${date}`);

      await queryClient.refetchQueries({
         queryKey: ['meals', date],
         type: 'active',
      });
   };

   return <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-3 align-middle">
      <fieldset>
         <Controller name="date"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <CalendarPopover field={field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )} />
      </fieldset>
      <Button type="submit">
         <Notebook />
         View Details
      </Button>
   </form>;
}

export default SelectDateForm;
