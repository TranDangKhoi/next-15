import { Pencil, Trash2 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { productsApiRequest } from "src/app/api/products/requests";
import { Button } from "src/components/ui/button";

export const metadata: Metadata = {
  title: "Products",
  description: "Products page",
};

export default async function ProductsPage() {
  const productListResponse = await productsApiRequest.getProducts();
  const products = productListResponse.payload.data;

  return (
    <div className="w-[900px] mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Product List</h1>
        <Link href="/products/add">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            {product.image && (
              <div className="relative w-full h-52 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 900px) 33vw"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <p className="text-lg font-bold text-primary">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                useGrouping: true,
              })
                .format(product.price)
                .replace(/\./g, ",")}
            </p>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/products/edit/${product.id}`}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Link>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-8">No products found. Start by adding some products.</div>
      )}
    </div>
  );
}
