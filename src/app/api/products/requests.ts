import { IApiResponse } from "src/interfaces/api-response.interfaces";
import { IProduct } from "src/interfaces/products.interfaces";
import http from "src/lib/http";

export const productsApiRequest = {
  getProducts: () => http.get<IApiResponse<IProduct[]>>("/products"),
  getProductDetail: (id: string) => http.get<IApiResponse<IProduct>>(`/products/${id}`),
  addProduct: (body: Omit<IProduct, "id">) =>
    http.post<IApiResponse<IProduct>, Omit<IProduct, "id">>("/products", body),
};
