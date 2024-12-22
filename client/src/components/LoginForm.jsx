import { registerShcema } from "../lib/validations";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "./LoadingButton.jsx";

const LoginForm = () => {
  const [error, setError] = useState();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(registerShcema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2">
          <LoadingButton loading={isPending} type="submit" className="w-full ">
            Register
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
