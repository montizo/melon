import { ActionResult } from "@/app/types";
import { ReactNode, useActionState } from "react";

export default function Form({
  children,
  formAction,
}: {
  children: ReactNode;
  formAction: (_: any, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, action, isLoading] = useActionState(formAction, {
    message: "",
    success: false,
  });

  return (
    <form method="POST" action={action}>
      {children}
    </form>
  );
}
