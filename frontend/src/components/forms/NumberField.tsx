import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface NumberFieldProps<T extends FieldValues> {
   control: Control<T>;
   name: Path<T>;
   label: string;
   isNumericMode?: boolean;
}

function NumberField<T extends FieldValues>({
   control,
   name,
   label,
   isNumericMode = false
}: NumberFieldProps<T>) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState }) => (
            <Field>
               <FieldLabel>{label}</FieldLabel>
               <Input
                  {...field}
                  value={field.value ?? ''}
                  type="number"
                  placeholder="0"
                  inputMode={isNumericMode ? "numeric" : undefined}
               />
               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
         )}
      />
   );
}

export default NumberField;