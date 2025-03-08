import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={disabled}
      className="cursor-pointer px-3 py-1 rounded-md font-semibold bg-[#822929] border-[#9f3a3a] hocus:brightness-125 duration-300 disabled:brightness-75 disabled:hocus:brightness-75 disabled:cursor-not-allowed"
    >
      {children}
    </motion.button>
  );
}
