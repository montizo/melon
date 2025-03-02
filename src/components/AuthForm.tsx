"use client";

import Input from "@/components/Input";
import Form from "@/components/Form";
import { ZodString } from "zod";
import { ActionResult } from "@/app/types";

interface AuthFormProps {
  title: string;
  subTitle: string;
  buttonText: string;
  buttonDisabled: boolean;
  formAction: (_: any, formData: FormData) => Promise<ActionResult>;
  fields: {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    validation?: ZodString;
    checkExists?: (val: string) => Promise<boolean>;
    setExternalUseState?: (val: string) => void;
  }[];
  footer: {
    text: string;
    linkText: string;
    linkTo: string;
  };
}

export default function AuthForm({
  title,
  subTitle,
  buttonText,
  buttonDisabled,
  formAction,
  fields,
  footer,
}: AuthFormProps) {
  return (
    <Form
      formAction={formAction}
      title={title}
      subTitle={subTitle}
      buttonText={buttonText}
      buttonDisabled={buttonDisabled}
      buttonStyles="bg-[#822929] border-[#9f3a3a]"
      footer={footer}
    >
      {fields.map((field, index) => (
        <Input
          key={index}
          label={field.label}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          validation={field.validation}
          checkExists={field.checkExists}
          setExternalUseState={field.setExternalUseState}
        />
      ))}
    </Form>
  );
}
