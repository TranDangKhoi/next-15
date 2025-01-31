"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import authApiRequest from "src/app/api/auth/requests";
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
import { useToast } from "src/components/ui/use-toast";
import { handleErrorApi } from "src/lib/utils";
import { TLoginSchema, loginSchema } from "src/schemas/login.schema";
export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const loginForm = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  async function onSubmit(values: TLoginSchema) {
    try {
      const result = await authApiRequest.login(values);
      toast({
        title: "Đăng nhập thành công",
        description:
          "Vui lòng đợi trong giây lát, chúng tôi đang xử lí yêu cầu của bạn",
      });
      const resultFromNextServer = await authApiRequest
        .setToken({
          sessionToken: result?.payload.data?.token,
        })
        .then(() => {
          router.push("/me");
        });
    } catch (error: any) {
      handleErrorApi({ error, duration: 3000, setError: loginForm.setError });
    }
  }
  function onErrors(errors: FieldErrors<TLoginSchema>) {
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
                    type="email"
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
