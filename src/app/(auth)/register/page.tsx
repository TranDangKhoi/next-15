import { Fragment } from "react";
import RegisterForm from "src/app/(auth)/register/register-form";

export default function RegisterPage() {
  return (
    <Fragment>
      <h1 className="font-bold text-3xl text-center">Đăng ký tài khoản</h1>
      <RegisterForm></RegisterForm>
    </Fragment>
  );
}
