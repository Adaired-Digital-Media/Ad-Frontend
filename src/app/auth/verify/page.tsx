import AuthWrapper from "@/app/shared/auth-layout/auth-wrapper";
import { metaObject } from "@/config/site.config";
import axios, { AxiosResponse } from "axios";

export const metadata = {
  ...metaObject("Verification"),
};

const verifyUser = async (
  token: string
): Promise<AxiosResponse | { status: number; data: { message: string } }> => {
  const apiUri = process.env.NEXT_PUBLIC_BACKEND_API_URI;

  if (!apiUri) {
    console.error(
      "Backend API URI is not defined in the environment variables."
    );
    return {
      status: 500,
      data: { message: "Server configuration error. Please try again later." },
    };
  }

  try {
    const result = await axios.get(`${apiUri}/auth/verify-user?token=${token}`);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || "An unexpected error occurred.";
    return { status, data: { message } };
  }
};

export default async function VerifyUser({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token;

  if (!token) {
    return (
      <AuthWrapper title="Invalid or expired verification link.">
        <></>
      </AuthWrapper>
    );
  }

  const result = await verifyUser(token);

  return (
    <AuthWrapper title={result.data.message}>
      <></>
    </AuthWrapper>
  );
}

// import AuthWrapper from "@/app/shared/auth-layout/auth-wrapper";
// import { metaObject } from "@/config/site.config";
// import axios from "axios";

// export const metadata = {
//   ...metaObject("Verification"),
// };

// const verifyUser = async (token: string) => {
//   try {
//     const result = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/auth/verify-user?token=${token}`
//     );
//     return result;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     return (
//       error.response || {
//         status: 500,
//         data: { message: "An unexpected error occurred." },
//       }
//     );
//   }
// };

// export default async function VerifyUser({
//   searchParams,
// }: {
//   searchParams: { token: string };
// }) {
//   const { token } = searchParams;

//   if (!token) {
//     return (
//       <AuthWrapper title="Invalid or expired verification link.">
//         <></>
//       </AuthWrapper>
//     );
//   }

//   const result = await verifyUser(token);

//   const message =
//     result.status === 200
//       ? result?.data?.message
//       : result?.data?.message || "Something went wrong.";

//   return (
//     <AuthWrapper title={message}>
//       <></>
//     </AuthWrapper>
//   );
// }
