"use client";

import React, { useEffect, useRef, useState } from "react";
import { startTransition, useActionState } from "react";
import Form from "@/components/Form";
import verifyEmailAction from "@/app/(auth)/verify-email/actions";

type CodeState = string[];

interface InputRefs {
  current: HTMLInputElement[];
}

export default function VerifyEmail() {
  const [state, action] = useActionState(verifyEmailAction, null);
  const [code, setCode] = useState(new Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const error = "";

  const handleChange = (index: number, value: string): void => {
    const newCode: CodeState = [...code];

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const pastedText = e.clipboardData.getData("Text");
    const newCode: CodeState = [...code];

    const pastedCode = pastedText.slice(0, 8).split("");
    for (let i = 0; i < pastedCode.length && i + index < 8; i++) {
      newCode[index + i] = pastedCode[i];
    }
    setCode(newCode);

    const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
    const focusIndex = lastFilledIndex < 7 ? lastFilledIndex + 1 : 7;
    inputRefs.current[focusIndex]?.focus();
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
            onPaste={(e) => handlePaste(e, index)} // Use onPaste here
            className="border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 bg-[#181818] border-[#222222] placeholder-[#4d4d4d] focus:border-[#444444] w-10 h-10 text-center"
          />
        ))}
      </div>
    </Form>
  );
}
