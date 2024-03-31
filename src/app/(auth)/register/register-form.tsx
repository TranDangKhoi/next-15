"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "src/schemas/register.schema";
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
import parsedEnvData from "src/config";
export default function RegisterForm() {
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const result = await fetch(
      `${parsedEnvData.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
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

  function onErrors(errors: FieldErrors<z.infer<typeof registerSchema>>) {
    console.log(errors);
  }

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit, onErrors)}
        className="space-y-4 mt-4 w-[680px] mx-auto flex flex-col"
      >
        <FormField
          control={registerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input
                  className="outline-none focus-visible:ring-0"
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
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
        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  className="outline-none focus-visible:ring-0"
                  placeholder="Nhập lại mật khẩu của bạn"
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
  );
}
