import { useEffect, useTransition } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field,FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { signupFormSchema} from "@/validation/signupFormSchema";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "@/api/api";


function SignupForm() {
   const [isPending, startTransition] = useTransition()
   const navigate = useNavigate();

   const {setToken, isAuthenticated} = useAuthStore();

   const signupMutation = useMutation({
        mutationFn: (data: z.infer<typeof signupFormSchema>) => {
            return api.post('/users', data).then((response) => {
                return response.data.token;
            });
        },
        onSuccess: (token: string) => {
            setToken(token);
            toast.success('Success!', {
            description: 'Account registered!'
         });
         navigate('/meals');
        },
        onError: (error) => {
            let errorMessage = 'Registation Error';

            if (axios.isAxiosError(error)){
                const serverMessage = error.response?.data?.errors?.[0]?.msg;

                if(serverMessage){
                    errorMessage = serverMessage;
                }
            }

            toast.error('Error', {
                description: errorMessage,
            })
        }
   })

   const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
      startTransition(async () => {
        if(data.confirmPassword !== data.password){
            toast.error('Error', {
                description: 'Passwords should match'
            })
        }

        signupMutation.mutate(data);
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

   useEffect(() => {
        if (isAuthenticated) {
          navigate('/');
        }
      }, [isAuthenticated, navigate]);
   

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

