import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";
import { UnprocessableEntityError } from "src/lib/http";
import { twMerge } from "tailwind-merge";
/**
 * This function is used to merge the className of the component
 * @param inputs
 * This param is the className of the component
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This function is used to handle the error from the useForm hook, if the error is UnprocessableEntityError, it will show the error messages of each corresponding field
 * @param error
 * This param is the error from the useForm hook
 * @param defaultMessage
 * This param is the default message that will be shown if the error is not UnprocessableEntityError
 * @param setError
 * This param is the setError from the useForm hook
 * @param duration
 * This param is the duration of the toast
 * @returns
 */
export function handleApiErrorResponse({
  error,
  defaultMessage = "Đã có lỗi xảy ra",
  setError,
  duration = 2000,
}: {
  error: unknown;
  defaultMessage?: string;
  // From react-hook-form
  setError?: UseFormSetError<any>;
  duration?: number;
}) {
  if (error instanceof UnprocessableEntityError && setError) {
    error.payload.errors.forEach((error) => {
      setError(error.field, {
        type: "server",
        message: error.message,
      });
    });
  } else {
    toast.error(
      React.createElement(
        "div",
        null,
        React.createElement("strong", null, defaultMessage),
        React.createElement("p", { className: "text-sm text-gray-500" }, "Vui lòng thử lại sau"),
      ),
      {
        ariaLabel: "Đã có lỗi xảy ra",
        autoClose: duration,
        className: "toast-custom",
      },
    );
  }
}

export function decodeJwt(token: string) {
  const decodedToken = jwtDecode(token);
  const payload = decodedToken;
  return payload;
}
