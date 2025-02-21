import AddProductsForm from "src/app/products/add/add-products-form";

export default function AddProductsPage() {
  return (
    <div className="w-[600px] mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center">Add new product!</h1>
      <AddProductsForm></AddProductsForm>
    </div>
  );
}
