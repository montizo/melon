import Error from "@/components/Error";
import { useState } from "react";

export default function Input({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  const [showError, setShowError] = useState(false);

  return (
    <div className="grid">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={() => setShowError(true)}
        placeholder={placeholder}
        className={`w-full px-3 py-1 my-2 border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 ${
          error === "" || !showError
            ? `bg-[#242424] border-[#2e2e2e] placeholder-[#4d4d4d] focus:border-[#444444]`
            : `bg-[#1C1412] border-[#7B271A] placeholder-[#521E17] focus:border-[#9b291a]`
        }`}
      />
      <Error error={error ?? ""} showError={showError} />
    </div>
  );
}
