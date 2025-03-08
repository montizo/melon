import { ReactNode } from "react";

export default function Card({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-[#1f1f1f] border-[1.5px] border-[#2e2e2e] p-8 rounded-2xl w-full max-w-md grid gap-6">
      <div className="grid gap-1">
        <h2 className="text-2xl text-[#fafafa] font-semibold">{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
