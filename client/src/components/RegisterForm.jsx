import axios from "axios";
import { useState } from "react";
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
import { SERVER_URL } from "@/utils/Constant";
import { registerShcema } from "../lib/validations";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "@/redux/auth/authSlice";
import GoogleAuth from "./GoogleAuth";

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(registerShcema),
    defaultValues: {
      username: "",
      email: "",
      mobileNumber: "",
      password: "12345678",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setError(null);
      const response = await axios.post(
        `${SERVER_URL}/api/auth/register`,
        data,
        { withCredentials: true }
      );
      navigate("/");
      dispatch(login());
      dispatch(setUser(response.data));
      toast({
        description: "User registered successfully",
      });
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="Mobile Number" {...field} />
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
        <div className="pt-2 space-y-2">
          <LoadingButton loading={loading} type="submit" className="w-full">
            Register
          </LoadingButton>
          <p className="text-center text-muted-foreground">or</p>
          <GoogleAuth />
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
