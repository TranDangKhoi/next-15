import { IApiResponse } from "src/interfaces/api-response.interfaces";
import { IProduct } from "src/interfaces/products.interfaces";
import http from "src/lib/http";

export const productsApiRequest = {
  getProducts: () => http.get<IApiResponse<IProduct[]>>("/products"),
  addProduct: (body: IProduct) => http.post<IApiResponse<IProduct>, IProduct>("/products", body),
};
