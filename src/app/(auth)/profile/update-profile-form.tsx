"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authApiRequest from "src/app/api/auth/requests";
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
import { handleApiErrorResponse } from "src/lib/utils";
import { TUpdateProfileSchema, updateProfileSchema } from "src/validations/update-profile.validations";

export default function UpdateProfileForm() {
  const router = useRouter();
  const updateProfileForm = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleUpdateProfile = updateProfileForm.handleSubmit(async (data) => {
    await authApiRequest
      .updateProfile(data)
      .then((res) => {
        toast.success(res.payload.message);
        router.refresh();
      })
      .catch((err) => {
        handleApiErrorResponse({
          error: err,
          setError: updateProfileForm.setError,
          duration: 2000,
          defaultMessage: "Đăng nhập thất bại",
        });
        throw err;
      });
  });

  return (
    <Form {...updateProfileForm}>
      <form
        className="mt-8"
        onSubmit={handleUpdateProfile}
      >
        <FormField
          control={updateProfileForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your new name"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your new name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-8"
          type="submit"
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
}
