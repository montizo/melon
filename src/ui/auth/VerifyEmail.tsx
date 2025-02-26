"use client";

import verifyEmailAction from "@/app/(auth)/verify-email/actions";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");

    startTransition(async () => {
      await action(verificationCode);
    });
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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
            style={{ width: "25px", height: "25px" }}
          />
        ))}
      </div>
      {error && <p>{error}</p>}
      <button type="submit" disabled={isLoading}>
        Verify Email
      </button>
    </form>
  );
}
