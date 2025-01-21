"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function OverflowHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  console.log('====================================');
  console.log(pathname);
  console.log('====================================');

  // Define a classe de overflow dinamicamente
  const bodyClass = cn(
    pathname === "/" ? "overflow-y-auto" : "overflow-y-hidden"
  );

  return <body className={bodyClass}>{children}</body>;
}
