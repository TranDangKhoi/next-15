import http from "src/lib/http";
import {
  IAccount,
  ILoginResponse,
  IRegisterResponse,
} from "src/interfaces/api/auth.interfaces";
import { TLoginSchema } from "src/schemas/login.schema";
import { TRegisterSchema } from "src/schemas/register.schema";
import { IApiResponse } from "src/interfaces/api-response.interfaces";
const authApiRequest = {
  login: (body: TLoginSchema) =>
    http.post<ILoginResponse, TLoginSchema>("/auth/login", body),
  register: (body: TRegisterSchema) =>
    http.post<IRegisterResponse, TLoginSchema>("/auth/register", body),
  logout: (body: { sessionToken: string }) => http.post("/auth/logout", body),
  setToken: (body: { sessionToken: string }) =>
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
