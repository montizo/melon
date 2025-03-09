"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useActionState } from "react";
import verifyEmailAction from "./_actions";
import SubmitButton from "../_components/SubmitButton";
import Form from "../_components/Form";
import Card from "../_components/Card";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [state, action] = useActionState(verifyEmailAction, null);
  const [code, setCode] = useState("");
  const inputRefs = useMemo(
    () =>
      Array(8)
        .fill(" ")
        .map(() => React.createRef<HTMLInputElement>()),
    []
  );
  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    setCode((prevCode) => {
      const newCode = prevCode.split("");
      newCode[index] = value;
      console.log(newCode);
      return newCode.join("");
    });

    if (value && index < 7) inputRefs[index + 1].current?.focus();

    console.log("Updated", code);
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
    <Card
      title="Verify Your Email Address"
      subtitle={`A verification code has been sent to email`}
    >
      <form method="POST" onSubmit={() => action(code)} className="grid gap-4">
        <p>Check your inbox to access the 8-digit code</p>
        <div className="flex justify-between">
          <input type="hidden" name="code" value={code} />
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
              className="border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 bg-[#242424] border-[#2e2e2e] placeholder-[#4d4d4d] focus:border-[#444444] w-10 h-10 text-center"
            />
          ))}
        </div>
        <SubmitButton disabled={code.length !== 8}>Verify Email</SubmitButton>
      </form>
      <div className="flex-between">
        <button>Resend Code</button>
        <Link href={"/change-email"}>Change Email</Link>
      </div>
    </Card>
  );
}
