import { useTransition } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { signupFormSchema } from "@/validation/signupFormSchema";
import useSignup from "@/hooks/useSignup";

function SignupForm() {
  const { signup } = useSignup();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    startTransition(() => {
      signup(data).catch(console.error);
    });
  };

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={isPending} className="mt-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" {...field} />
              {fieldState.invalid && (
                <FieldError role="nameErrorField" errors={[fieldState.error]} />
              )}
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
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input type="email" id="email" {...field} />

              {fieldState.invalid && (
                <FieldError
                  role="emailErrorField"
                  errors={[fieldState.error]}
                />
              )}
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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input type="password" id="password" {...field} />

              {fieldState.invalid && (
                <FieldError
                  role="passwordErrorField"
                  errors={[fieldState.error]}
                />
              )}
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
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>
              <Input type="password" id="confirmPassword" {...field} />

              {fieldState.invalid && (
                <FieldError
                  role="confirmPasswordErrorField"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </fieldset>

      <Button
        type="submit"
        className="flex items-center justify-start w-50 h-10 mt-5"
        disabled={isPending}
      >
        SignUp
        {isPending && <Loader className="animate-spin" />}
      </Button>
    </form>
  );
}

export default SignupForm;
