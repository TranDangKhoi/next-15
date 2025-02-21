"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authApiRequest from "src/app/api/auth/requests";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { HTTP_STATUS_CODE } from "src/constants/httpStatusCode.constants";
import { AuthContext } from "src/contexts/auth.contexts";
import { clientSessionToken } from "src/lib/http";
import { handleApiErrorResponse } from "src/lib/utils";
import { loginSchema, TLoginSchema } from "src/validations/login.validations";

export default function LoginForm() {
  const { setUserProfile } = useContext(AuthContext);
  console.log(clientSessionToken.value);
  const router = useRouter();
  const loginForm = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = loginForm.handleSubmit(async (data) => {
    const loginResponse = await authApiRequest
      .login(data)
      .then((res) => {
        if (res.status === HTTP_STATUS_CODE.OK) {
          setUserProfile(res.payload.data.account);
          return res.payload.data;
        }
        return { token: "", account: {} };
      })
      .catch((err) => {
        handleApiErrorResponse({
          error: err,
          setError: loginForm.setError,
          duration: 2000,
          defaultMessage: "Đăng nhập thất bại",
        });
        throw err;
      });

    await authApiRequest
      .nextSetToken({
        sessionToken: loginResponse.token,
      })
      .then(() => {
        toast.success("Đăng nhập thành công", {
          autoClose: 2000,
        });
        router.push("/");
      })
      .catch((err) => {
        handleApiErrorResponse({
          error: err,
          setError: loginForm.setError,
          duration: 2000,
          defaultMessage: "Đăng nhập thất bại",
        });
        return err;
      });
  });

  return (
    <Form {...loginForm}>
      <form onSubmit={handleLogin}>
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your e-mail address (e.g: johndoe@gmail.com)"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your e-mail address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password here"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Password must contain at least one uppercase letter, one lowercase letter, one number, and one special
                character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-8"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
