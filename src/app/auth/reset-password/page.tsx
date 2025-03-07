import AuthWrapper from "@/app/shared/auth-layout/auth-wrapper";
import ResetPasswordForm from "./reset-password-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Reset Password"),
};

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token as string;
  return (
    <AuthWrapper title={<>Reset your password.</>}>
      <ResetPasswordForm token={token} />
    </AuthWrapper>
  );
}
