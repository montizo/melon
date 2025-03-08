import { ActionResult } from "@/app/types";
import { ReactNode, useActionState } from "react";
import Card from "./Card";

export default function Form({
  children,
  formAction,
  title,
  subtitle,
}: {
  children: ReactNode;
  formAction: (_: any, formData: FormData) => Promise<ActionResult>;
  title: string;
  subtitle: string;
}) {
  const [state, action, isLoading] = useActionState(formAction, {
    message: "",
    success: false,
  });

  return (
    <Card title={title} subtitle={subtitle}>
      <form method="POST" action={action} className="grid gap-2 relative">
        {children}
      </form>
    </Card>
  );
}
