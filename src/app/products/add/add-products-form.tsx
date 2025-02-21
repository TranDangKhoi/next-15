"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
import { addProductSchema, TAddProductSchema } from "src/validations/products.validation";

export default function AddProductsForm() {
  const [previewImageFile, setPreviewImageFile] = useState<File>();
  const previewImageURL = useMemo(() => {
    return previewImageFile ? URL.createObjectURL(previewImageFile) : "";
  }, [previewImageFile]);
  const addProductsForm = useForm<TAddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
    },
  });
  console.log(addProductsForm.getValues("image"));
  const handleAddProduct = addProductsForm.handleSubmit(async (data) => {
    console.log(data);
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
                  onChange={(e) => {
                    const input = e.target;
                    const value = input.value;
                    const cursorPosition = input.selectionStart || 0;

                    // Remove the suffix and commas to get clean input
                    const cleanValue = value.replace(/[, ₫]/g, "");

                    // If backspace was used and resulted in empty string, reset the field
                    if (!cleanValue) {
                      field.onChange("");
                      return;
                    }

                    // Only proceed if the remaining value contains valid numbers
                    if (/^\d+$/.test(cleanValue)) {
                      // Add commas for thousands
                      const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      // Add "₫" suffix
                      const valueWithSuffix = `${formattedValue} ₫`;

                      // Calculate new cursor position accounting for added commas
                      const commasBeforeCursor = (value.slice(0, cursorPosition).match(/,/g) || []).length;
                      const newCommasBeforeCursor = (formattedValue.slice(0, cursorPosition).match(/,/g) || []).length;
                      const cursorOffset = newCommasBeforeCursor - commasBeforeCursor;

                      // Ensure cursor doesn't go beyond the number part
                      const maxPosition = formattedValue.length;
                      const newPosition = Math.min(cursorPosition + cursorOffset, maxPosition);

                      field.onChange(valueWithSuffix);

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
                  }}
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
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreviewImageFile(file);
                    }
                    field.onChange(file);
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
