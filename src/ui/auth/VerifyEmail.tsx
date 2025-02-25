"use client";

import { useEffect, useRef, useState } from "react";

export default function VerifyEmail() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");
    // verify email
    console.log(verificationCode);
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      const syntheticEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      const form = document.createElement("form");
      form.dispatchEvent(syntheticEvent);
    }
  }, [code]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
          />
        ))}
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Verify Email</button>
    </form>
  );
}
