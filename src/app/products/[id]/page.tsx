import type { Metadata, ResolvingMetadata } from "next";
import { productsApiRequest } from "src/app/api/products/requests";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id;
  const product = await productsApiRequest.getProductDetail(id);

  return {
    title: product.payload.data.name,
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const productDetail = await productsApiRequest.getProductDetail(id);
  const product = productDetail.payload.data;
  return (
    <div>
      <p>Viewing product detail {product.name}</p>
      <p className="italic text-sm">This shit is way too easy so I skipped it</p>
    </div>
  );
}
