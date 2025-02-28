import React, { ReactNode, useActionState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Form({
  formAction,
  title,
  subTitle,
  buttonText,
  children,
  footer,
}: {
  formAction: any;
  title: string;
  subTitle?: string;
  buttonText: string;
  children: ReactNode;
  footer?: {
    text: string;
    linkText: string;
    linkTo: string;
  };
}) {
  const [state, action, isLoading] = useActionState(formAction, null);

  return (
    <div className="bg-[#181818] border-[1.5px] border-[#222222] p-8 rounded-2xl w-full max-w-md grid gap-8">
      <div className="grid gap-1">
        <h2 className="font-semibold text-3xl text-[#fafafa]">{title}</h2>
        <p>{subTitle}</p>
      </div>
      <form action={action} className="grid gap-4">
        {children}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="cursor-pointer px-3 py-1 rounded-md font-semibold bg-[#822929] border-[#9f3a3a] border-1 hocus:brightness-125 duration-300"
        >
          {buttonText}
        </motion.button>
      </form>
      {footer && (
        <p>
          {footer.text}{" "}
          <Link href={footer.linkTo} className="text-[#df3f3f] hocus:underline">
            {footer.linkText}
          </Link>
        </p>
      )}
    </div>
  );
}
