import { useEffect, useRef } from "react";

export default function TextBox({
  label,
  type,
  name,
  placeholder,
  value = "",
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  gridMode?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Update the height of the textarea based on content
      textarea.style.height = "auto"; // Reset the height before recalculating
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]); // Only re-run this when value changes

  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium flex items-center">{label}</label>
      <div className="w-full px-3 py-1 my-2 border-[1.5px] text-[#fafafa] outline-none focus-within:ring-3 ring-[#242424] rounded-md bg-[#222222] border-[#2e2e2e] placeholder-[#4d4d4d] focus:border-[#444444] transition-ring duration-[300ms] flex-center">
        <textarea
          name={name}
          value={value}
          ref={textareaRef}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full resize-none outline-none overflow-hidden"
          rows={1}
        />
      </div>
    </div>
  );
}
