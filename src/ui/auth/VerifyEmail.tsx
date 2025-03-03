"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useActionState } from "react";
import Form from "@/components/Form";
import verifyEmailAction from "@/app/(auth)/verify-email/actions";

export default function VerifyEmail() {
  const [state, action] = useActionState(verifyEmailAction, null);
  const [code, setCode] = useState("");
  const inputRefs = useMemo(
    () =>
      Array(8)
        .fill(null)
        .map(() => React.createRef<HTMLInputElement>()),
    []
  );

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    setCode((prevCode) => {
      const newCode = prevCode.split("");
      newCode[index] = value;
      return newCode.join("");
    });

    if (value && index < 7) inputRefs[index + 1].current?.focus();
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const pastedText = e.clipboardData
      .getData("Text")
      .slice(0, 8)
      .replace(/[^a-zA-Z0-9]/g, "");

    if (!pastedText) return;

    setCode(pastedText);

    inputRefs[Math.min(index + pastedText.length, 7)]?.current?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    inputRefs[0]?.current?.focus();
  }, []);

  return (
    <Form
      formAction={() => action(code)}
      title="Verify Email"
      buttonText="Verify Email"
      buttonStyles="bg-[#822929] border-[#9f3a3a]"
    >
      <div className="flex justify-between">
        {Array.from({ length: 8 }, (_, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            value={code[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(e, index)}
            className="border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 bg-[#181818] border-[#222222] placeholder-[#4d4d4d] focus:border-[#444444] w-10 h-10 text-center"
          />
        ))}
      </div>
    </Form>
  );
}
