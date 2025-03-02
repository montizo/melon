import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ZodString } from "zod";
import Error from "./Error";

export default function Input({
  label,
  type,
  name,
  placeholder = "",
  validation,
  checkExists,
  setExternalUseState,
  sideways,
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  validation?: ZodString;
  checkExists?: (value: string) => Promise<boolean>;
  setExternalUseState?: (value: string) => void;
  sideways?: boolean;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const result = validation?.safeParse(value);
    const validationErrors = result?.error?.errors[0]?.message || "";

    setError(validationErrors);
    setExternalUseState && setExternalUseState(value);

    if (checkExists && validationErrors == "") {
      (async () => {
        const exists = await checkExists(value);
        if (exists) {
          setError(`${label} already taken`);
        } else {
          setError("");
        }
      })();
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const result = validation?.safeParse(inputValue);
    const validationErrors = result?.error?.errors[0]?.message || "";

    setError(validationErrors);

    setExternalUseState && setExternalUseState(inputValue);

    if (checkExists && validationErrors === "") {
      (async () => {
        const exists = await checkExists(inputValue);
        if (exists) {
          setError(`${label} already taken`);
        } else {
          setError("");
        }
      })();
    }
  };

  return (
    <div
      className={`grid ${
        sideways == true ? "grid-cols-[1fr_2fr] grid-rows-2" : "grid-cols-1"
      }`}
    >
      <label htmlFor={name} className="text-sm font-semibold mb-2">
        {label}
      </label>
      <div>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onBlur={() => setShowError(true)}
          onChange={handleChange}
          className={`w-full px-3 py-1 border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 ${
            error === "" || !showError
              ? `bg-[#181818] border-[#222222] placeholder-[#4d4d4d] focus:border-[#444444]`
              : `bg-[#181111] border-[#7B271A] placeholder-[#5b251a] focus:border-[#9b291a]`
          }`}
        />
      </div>
      <div></div>
      <Error error={error} showError={showError} />
    </div>
  );
}
