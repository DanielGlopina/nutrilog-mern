import { useEffect, useTransition } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useMutation} from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { Field,FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { loginFormSchema } from "@/validation/loginFormSchema";
import api from "@/api/api";


function LoginForm() {
   const [isPending, startTransition] = useTransition()
   const navigate = useNavigate();
   const {setToken, isAuthenticated} = useAuthStore();

   const loginMutation = useMutation({
        mutationFn: (data: z.infer<typeof loginFormSchema>) => {
            return api.post('/auth', data).then((response) => {
                return response.data.token;
            });
        },
        onSuccess: (token: string) => {
            setToken(token);
            toast.success('Success!', {
            description: 'You have logged in!'
         });
         navigate('/meals');
        },
        onError: (error) => {
            let errorMessage = 'Login Error';

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

   const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
      startTransition(async () => {
        loginMutation.mutate(data);
      });
   }

   const form = useForm({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: '',
        password: '',
      }
   })

    useEffect(() => {
     if (isAuthenticated) {
       navigate('/');
     }
   }, [isAuthenticated, navigate]);


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

