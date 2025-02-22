import { IApiResponse } from "src/interfaces/api-response.interfaces";
import http from "src/lib/http";

export const mediaApiRequest = {
  uploadImage: (body: FormData) => http.post<IApiResponse<any>, IApiResponse<any>>("/media/upload", body),
};
