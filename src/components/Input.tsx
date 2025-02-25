import { useEffect, useState } from "react";
import { ZodString } from "zod";

export default function Input({
  label,
  type,
  name,
  placeholder = "",
  validation,
  checkExists,
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  validation?: ZodString;
  checkExists?: (value: string) => Promise<boolean>;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const result = validation?.safeParse(value);
    setError(result?.error?.errors[0]?.message || "");
  }, [value]);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={() => setShowError(true)}
        onChange={async (e) => {
          const inputValue = e.target.value;
          setValue(inputValue);
          if (checkExists && error === "") {
            const exists = await checkExists(inputValue);
            setExists(exists);
            if (exists) {
              setError(`${label} already taken`);
            } else {
              setError("");
            }
          }
        }}
      />
      {error && showError && <p>{error}</p>}
    </div>
  );
}
