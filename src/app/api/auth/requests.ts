import {
  IAccount,
  ILoginResponse,
  IMessageResponse,
  IRegisterResponse,
} from "src/interfaces/api/auth.interfaces";
import http from "src/lib/http";
// import { TRegisterSchema } from "src/schemas/register.schema";
import { IApiResponse } from "src/interfaces/api-response.interfaces";
import { TLoginSchema } from "src/validations/login.validations";
const authApiRequest = {
  login: (body: TLoginSchema) =>
    http.post<IRegisterResponse, TLoginSchema>("/auth/login", body),
  //   register: (body: TRegisterSchema) =>
  //     http.post<IRegisterResponse, TLoginSchema>("/auth/register", body),
  logout: (body: { sessionToken: string }) =>
    http.post<IMessageResponse, null>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${body.sessionToken}`,
        },
      }
    ),
  nextLogout: () =>
    http.post<IMessageResponse, null>(
      "/api/auth/logout",
      {},
      {
        baseUrl: "",
      }
    ),
  nextSetToken: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  getProfile: (sessionToken: string) =>
    http.get<IApiResponse<IAccount>>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};
export default authApiRequest;
