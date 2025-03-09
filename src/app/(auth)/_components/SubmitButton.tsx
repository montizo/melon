import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SubmitButton({
  children,
  disabled,
  color,
}: {
  children: ReactNode;
  disabled: boolean;
  color?: string;
}) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={disabled}
      className={`cursor-pointer px-3 py-1 w-full rounded-md font-semibold hocus:brightness-125 duration-300 disabled:brightness-75 disabled:hocus:brightness-75 disabled:cursor-not-allowed border-[1.5px] ${
        color || "bg-[#822929] border-[#9f3a3a]"
      }`}
    >
      {children}
    </motion.button>
  );
}
