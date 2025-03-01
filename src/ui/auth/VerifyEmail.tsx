"use client";

import verifyEmailAction from "@/app/(auth)/verify-email/actions";
import Form from "@/components/Form";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

export default function VerifyEmail() {
  const [state, action, isLoading] = useActionState(verifyEmailAction, null);
  const [code, setCode] = useState(new Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const error = "";

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");

    startTransition(async () => {
      await action(verificationCode);
    });
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <Form
      formAction={handleSubmit}
      title="Verify Email"
      buttonText="Verify Email"
    >
      <div className="flex justify-between">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 bg-[#181818] border-[#222222] placeholder-[#4d4d4d] focus:border-[#444444] w-10 h-10 text-center"
          />
        ))}
      </div>
    </Form>
  );
}
