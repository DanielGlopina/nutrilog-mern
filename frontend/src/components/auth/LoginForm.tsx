import { useTransition } from "react";;
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field,FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { loginFormSchema } from "@/validation/loginFormSchema";
import useLogin from "@/hooks/useLogin";


function LoginForm() {
   const {login} = useLogin();
   const [isPending, startTransition] = useTransition();


   const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
      startTransition(async () => {
          await login(data);
      });
   }

   const form = useForm({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: '',
        password: '',
      }
   })


   return <form onSubmit={form.handleSubmit(onSubmit)}>
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


      <Button type="submit" className="flex items-center justify-start w-50 h-10 mt-5" disabled={isPending}>
        Login
         {isPending && <Loader className="animate-spin" />}
      </Button>
   </form >;
}

export default LoginForm;

