import { useNavigate } from 'react-router-dom';
import { Field, FieldError } from "@/components/ui/field";
import { CalendarPopover } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import z from "zod";
import { format } from "date-fns";
import { Notebook } from "lucide-react";

function SelectDateForm({ path }: { path: string }) {
   const navigate = useNavigate();

   const dateFormSchema = z.object({ date: z.date() })

   const form = useForm({
      resolver: zodResolver(dateFormSchema),
      defaultValues: {
         date: new Date(),
      },
   })

   const handleSubmit = (data: z.infer<typeof dateFormSchema>) => {
      const date = format(data.date ?? new Date, 'yyyy-MM-dd');
      navigate(`${path}?date=${date}`)
   }

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