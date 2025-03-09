// "use client";

// import forgotPasswordAction from "@/app/(auth)/forgot-password/_actions";
// import { ActionResult } from "@/app/types";
// import { emailSchema } from "@/lib/validation";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Form from "../_components/Form";
// import Input from "../_components/Input";
// import SubmitButton from "../_components/SubmitButton";
// import loginAction from "../login/_actions";
// import { z } from "zod";
// import useValidation from "../_useValidation";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [hasSent, setHasSent] = useState<boolean>(false);

// const { values, errors, handleChange, isValid, pendingField } = useValidation(
//   z.object({
//     email: emailSchema,
//   })
// );

// useEffect(() => {
//   if (hasSent) {
//     setIsLoading(false);
//   }
// }, [hasSent]);

// const handleSubmit = async (
//   event: React.FormEvent,
//   formData: FormData
// ): Promise<ActionResult> => {
//   setIsLoading(true);
//   setError("");

//   try {
//     const result: ActionResult = await forgotPasswordAction(null, formData);
//     setHasSent(true);

//     if (result.success) {
//       setIsLoading(false);
//     } else {
//       setError(result.message || "Something went wrong.");
//       setIsLoading(false);
//     }

//     return result;
//   } catch (err) {
//     setError("An error occurred, please try again.");
//     setIsLoading(false);
//     return {
//       success: false,
//       message: "An error occurred, please try again.",
//     };
//   }
// };

// if (hasSent) {
//   return (
//     <div className="bg-[#1f1f1f] border-[1.5px] border-[#2e2e2e] p-8 rounded-2xl w-full max-w-md grid gap-2">
//       <h1 className="text-2xl text-white font-semibold">
//         Forgot password reset email sent!
//       </h1>
//       <p>
//         Email not in your inbox?{" "}
//         <Link
//           href="/forgot-password"
//           className="text-[#df3f3f] hocus:underline"
//         >
//           Retry
//         </Link>
//       </p>
//     </div>
//   );
// }

// return (
//   <Form
//     formAction={loginAction}
//     title="Forgot password"
//     subtitle="Send a reset-password email link"
//   >
//     <Input
//       label="Email"
//       type="text"
//       name="email"
//       placeholder="Enter your email"
//       value={values.email}
//       onChange={handleChange}
//       error={errors.email}
//     />
//     <SubmitButton disabled={!isValid}>Send Link</SubmitButton>
//   </Form>
// );
// }
