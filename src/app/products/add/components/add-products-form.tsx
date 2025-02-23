"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mediaApiRequest } from "src/app/api/media/requests";
import { productsApiRequest } from "src/app/api/products/requests";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { handleApiErrorResponse } from "src/lib/utils";
import { addProductSchema, TAddProductSchema } from "src/validations/products.validation";

export default function AddProductsForm() {
  const router = useRouter();
  const [previewImageFile, setPreviewImageFile] = useState<File>();
  const previewImageURL = useMemo(() => {
    return previewImageFile ? URL.createObjectURL(previewImageFile) : "";
  }, [previewImageFile]);
  const addProductsForm = useForm<TAddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    const input = e.target;
    const value = input.value;
    const cursorPosition = input.selectionStart || 0;

    // Remove the suffix and commas to get clean input
    const cleanValue = value.replace(/[, ₫]/g, "");

    // If backspace was used and resulted in empty string, reset the field
    if (!cleanValue) {
      field.onChange(0);
      input.value = "";
      return;
    }

    // Only proceed if the remaining value contains valid numbers
    if (/^\d+$/.test(cleanValue)) {
      // Add commas for thousands
      const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // Add "₫" suffix
      const valueWithSuffix = `${formattedValue} ₫`;

      // Set the actual numeric value in the form
      field.onChange(Number(cleanValue));

      // Set the display value
      input.value = valueWithSuffix;

      // Calculate new cursor position accounting for added commas
      const commasBeforeCursor = (value.slice(0, cursorPosition).match(/,/g) || []).length;
      const newCommasBeforeCursor = (formattedValue.slice(0, cursorPosition).match(/,/g) || []).length;
      const cursorOffset = newCommasBeforeCursor - commasBeforeCursor;

      // Ensure cursor doesn't go beyond the number part
      const maxPosition = formattedValue.length;
      const newPosition = Math.min(cursorPosition + cursorOffset, maxPosition);

      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        if (document.activeElement === input) {
          input.setSelectionRange(newPosition, newPosition);
        }
      });
    } else {
      // Keep the current value and cursor position for invalid input
      requestAnimationFrame(() => {
        if (document.activeElement === input) {
          input.setSelectionRange(cursorPosition, cursorPosition);
        }
      });
    }
  };

  const handleAddProduct = addProductsForm.handleSubmit(async (data) => {
    let uploadImageResponse = null;
    if (previewImageFile) {
      const formData = new FormData();
      formData.append("image", previewImageFile);
      try {
        uploadImageResponse = await mediaApiRequest.uploadImage(formData);
      } catch (error) {
        handleApiErrorResponse({
          error,
        });
      }
    }

    try {
      await productsApiRequest.addProduct({
        name: data.name,
        description: data.description,
        price: Number(data.price),
        image: uploadImageResponse?.payload.data,
      });
      toast.success("Add product successfully");
      addProductsForm.reset();
      setPreviewImageFile(undefined);
      router.push("/products");
    } catch (error) {
      handleApiErrorResponse({
        error,
      });
    }
  });

  return (
    <Form {...addProductsForm}>
      <form
        className="mt-8"
        onSubmit={handleAddProduct}
      >
        <FormField
          control={addProductsForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Product's Name"}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product's name"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your product name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addProductsForm.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>{"Product's Description"}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your product description"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormDescription>
                <span>Product description should be more than 10 characters and less than 1500 characters</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addProductsForm.control}
          name="price"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>{"Product's Price"}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product's price"
                  {...field}
                  value={field.value}
                  onChange={(e) => handlePriceChange(e, field as ControllerRenderProps<any, "price">)}
                />
              </FormControl>
              <FormDescription>This is the price for your product (Vietnamese Dong).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addProductsForm.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>{"Product's Image"}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  onChange={(e) => {
                    const fileFromLocalComputer = e.target.files?.[0];
                    if (fileFromLocalComputer) {
                      setPreviewImageFile(fileFromLocalComputer);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>This is the image for your product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {previewImageURL && (
          <Image
            src={previewImageURL}
            width={200}
            height={200}
            alt="Something happened"
            className="object-cover"
          />
        )}
        <Button
          className="w-full mt-8"
          type="submit"
        >
          Add product
        </Button>
      </form>
    </Form>
  );
}
