import {useTransition } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field,FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { signupFormSchema} from "@/validation/signupFormSchema";
import useSignup from "@/hooks/useSignup";

function SignupForm() {
   const [isPending, startTransition] = useTransition()
   const {signup} = useSignup();

   const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
      startTransition(async () => {
         await signup(data);
      });
   }

   const form = useForm({
      resolver: zodResolver(signupFormSchema),
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
   })


   return <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={isPending} className="mt-4">
         <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>

      <fieldset>
        <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" {...field} />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>

      <fieldset>
        <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" {...field} />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>

      <fieldset>
        <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>Confirm password</FieldLabel>
                  <Input type="password" {...field} />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>


      <Button type="submit" className="flex items-center justify-start w-50 h-10 mt-5" disabled={isPending}>
        SignUp
         {isPending && <Loader className="animate-spin" />}
      </Button>
   </form >;
}

export default SignupForm;

