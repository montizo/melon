import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ZodString } from "zod";

export default function Input({
  label,
  type,
  name,
  placeholder = "",
  validation,
  checkExists,
  onAction,
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  validation?: ZodString;
  checkExists?: (value: string) => Promise<boolean>;
  onAction?: (e: any) => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const result = validation?.safeParse(value);
    setError(result?.error?.errors[0]?.message || "");
  }, [value]);

  return (
    <div className="grid">
      <label htmlFor={name} className="text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={() => setShowError(true)}
        onChange={async (e) => {
          const inputValue = e.target.value;
          onAction && onAction(e);
          setValue(inputValue);
          if (checkExists && error === "") {
            const exists = await checkExists(inputValue);
            if (exists) {
              setError(`${label} already taken`);
            } else {
              setError("");
            }
          }
        }}
        className={`w-full px-3 py-1 border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 ${
          error == "" || !showError
            ? `bg-[#181818] border-[#222222] placeholder-[#4d4d4d] focus:border-[#444444]`
            : `bg-[#181111] border-[#7B271A] placeholder-[#5b251a] focus:border-[#9b291a]`
        }`}
      />
      <AnimatePresence>
        {error && showError && (
          <motion.p
            initial={{ marginTop: 0, height: 0, opacity: 0, rotateX: -90 }}
            animate={{ marginTop: 8, height: "auto", opacity: 1, rotateX: 0 }}
            exit={{ marginTop: 0, height: 0, opacity: 0, rotateX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-[#df4f51] text-sm"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
