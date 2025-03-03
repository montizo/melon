import { ReactNode, useEffect, useState } from "react";
import { ZodString } from "zod";
import Error from "./Error";

export default function Input({
  label,
  labelRight,
  type,
  name,
  placeholder = "",
  validation,
  checkExists,
  setExternalUseState,
  sideways,
  isDisabled,
}: {
  label: string;
  labelRight?: ReactNode;
  type: string;
  name: string;
  placeholder?: string;
  validation?: ZodString;
  checkExists?: (value: string) => Promise<boolean>;
  setExternalUseState?: (value: string) => void;
  sideways?: boolean;
  isDisabled?: boolean;
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
        sideways == true ? "grid-cols-[1fr_2fr]" : "grid-cols-1"
      }`}
    >
      <div
        className="
            flex-between
          "
      >
        <label htmlFor={name} className="text-sm font-semibold mb-2">
          {label}
        </label>
        {labelRight && labelRight}
      </div>
      <div>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onBlur={() => setShowError(true)}
          onChange={handleChange}
          disabled={isDisabled}
          className={`w-full px-3 py-1 border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 ${
            error === "" || !showError
              ? `bg-[#242424] border-[#2e2e2e] placeholder-[#4d4d4d] focus:border-[#444444]`
              : `bg-[#1C1412] border-[#7B271A] placeholder-[#521E17] focus:border-[#9b291a]`
          }`}
        />
      </div>
      <div></div>
      <Error
        error={error}
        showError={showError || (type == "password" && value != "")}
      />
    </div>
  );
}
