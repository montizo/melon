import Link from "next/link";

export default function FooterLink({
  text,
  link: { text: linkText, link: linkUrl },
}: {
  text: string;
  link: { text: string; link: string };
}) {
  return (
    <p>
      {text}{" "}
      <Link href={linkUrl} className="text-[#df3f3f] hocus:underline">
        {linkText}
      </Link>
    </p>
  );
}
