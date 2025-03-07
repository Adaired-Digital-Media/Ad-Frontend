"use client";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { Button, Password } from "rizzui";
import { useMedia } from "@core/hooks/use-media";
import { Form } from '@core/ui/rizzui-ui/form';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/validators/reset-password.schema";
import axios from "axios";
import { useState } from "react";

const initialValues: ResetPasswordSchema = {
  password: "",
  confirmPassword: "",
};

export default function ForgetPasswordForm({ token }: { token: string }) {
  const [reset, setReset] = useState({});
  const isMedium = useMedia("(max-width: 1200px)", false);
  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    try {
      await toast.promise(
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/auth/reset-password`,
            {
              newPassword: data.password,
              resetToken: token,
            }
          )
          .then((response) => {
            return response.data.message;
          }),
        {
          loading: "Resetting your password...",
          success: (message) => message || "Password reset successfully!",
          error: (error) =>
            error.response?.data?.message ||
            "Failed to reset password. Please try again.",
        }
      );
      setReset(initialValues);
    } catch (error) {
      console.error("Failed to reset password: ", error);
    }
  };

  return (
    <Form<ResetPasswordSchema>
      validationSchema={resetPasswordSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: initialValues,
      }}
    >
      {({ register, formState: { errors } }) => (
        <div className="space-y-6">
          <Password
            label="Password"
            placeholder="Enter your password"
            size={isMedium ? "lg" : "xl"}
            className="[&>label>span]:font-medium"
            {...register("password")}
            error={errors.password?.message}
          />

          <Password
            label="Confirm Password"
            placeholder="Enter your password again..."
            size={isMedium ? "lg" : "xl"}
            className="[&>label>span]:font-medium w-full"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
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
  );
}
