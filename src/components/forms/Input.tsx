import Error from "@/components/forms/Error";
import { useState } from "react";

export default function Input({
  label,
  type,
  name,
  placeholder,
  value = "",
  onChange,
  error = "",
  gridMode = false,
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  gridMode?: boolean;
}) {
  const [showError, setShowError] = useState(false);

  return (
    <div className="grid xl:grid-cols-[1fr_2fr] w-full">
      <label className="text-sm font-medium flex items-center">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={() => setShowError(true)}
        placeholder={placeholder}
        className={`w-full px-3 py-1 my-2 border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200  ${
          error === "" || !showError
            ? `bg-[#222222] border-[#2e2e2e] placeholder-[#4d4d4d] focus:border-[#444444]`
            : `bg-[#1C1412] border-[#7B271A] placeholder-[#521E17] focus:border-[#9b291a]`
        }`}
      />
      <div></div>
      <Error error={error ?? ""} showError={showError} />
    </div>
  );
}
