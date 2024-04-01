"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { loginSchema } from "src/schemas/login.schema";
import { z } from "zod";
export default function LoginForm() {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    console.log(result);
  }

  function onErrors(errors: FieldErrors<z.infer<typeof loginSchema>>) {
    console.log(errors);
  }
  return (
    <Fragment>
      <h1 className="text-center text-3xl font-bold">Đăng nhập tài khoản</h1>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit, onErrors)}
          className="space-y-4 mt-4 w-[680px] mx-auto flex flex-col"
        >
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ e-mail</FormLabel>
                <FormControl>
                  <Input
                    className="outline-none focus-visible:ring-0"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    className="outline-none focus-visible:ring-0"
                    placeholder="Nhập vào mật khẩu của bạn"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Fragment>
  );
}
