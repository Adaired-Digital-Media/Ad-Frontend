"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { Button, Input, Text } from "rizzui";
import { useMedia } from "@core/hooks/use-media";
import { Form } from '@core/ui/rizzui-ui/form';
import { routes } from "@/config/routes";
import {
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from "@/validators/forget-password.schema";
import axios from "axios";
import { useState } from "react";

const initialValues = {
  email: "",
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});
  const isMedium = useMedia("(max-width: 1200px)", false);
  const onSubmit: SubmitHandler<ForgetPasswordSchema> = async (data) => {
    try {
      await toast.promise(
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/auth/forgot-password`,
            {
              email: data.email,
            }
          )
          .then((response) => {
            return response.data.message;
          }),
        {
          loading: "Sending reset link...",
          success: (message) =>
            message || "Password reset link sent successfully!",
          error: (error) =>
            error.response?.data?.message ||
            "Failed to send reset password link. Please try again.",
        }
      );
      setReset(initialValues);
    } catch (error) {
      console.error("Failed to reset password: ", error);
    }
  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size={isMedium ? "lg" : "xl"}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register("email")}
              error={errors.email?.message}
            />
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? "lg" : "xl"}
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{" "}
        <Link
          href={routes.auth.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
