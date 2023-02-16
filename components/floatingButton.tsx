import type { NextPage } from "next";
// import Link from "next/link";
import { useRouter } from "next/router";

interface FloatingButtonProp {
  href: string;
  children: React.ReactNode;
}

export default function FloatingButtion({
  children,
  href,
}: FloatingButtonProp) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="fixed right-3 bottom-24 flex h-20 w-20 items-center justify-center rounded-full bg-teal-500  text-white shadow-xl hover:bg-teal-300"
    >
      {children}
    </button>
  );
}
