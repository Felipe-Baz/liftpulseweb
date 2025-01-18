"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function useSegment(basePath: string) {
  const path = usePathname();
  const result = path.slice(basePath.length, path.length);
  return result ? result : "/";
}

type Item = {
  name: React.ReactNode;
  href: string;
  icon: LucideIcon;
  type: "item";
};

type Sep = {
  type: "separator";
};

type Label = {
  name: React.ReactNode;
  type: "label";
};

export type SidebarItem = Item | Sep | Label;

function NavItem(props: {
  item: Item;
  onClick?: () => void;
  basePath: string;
}) {
  const segment = useSegment(props.basePath);
  const selected = segment === props.item.href;

  return (
    <Link
      href={props.basePath + props.item.href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        selected && "bg-muted",
        "flex-grow justify-start text-md text-zinc-800 dark:text-zinc-300 px-2"
      )}
      onClick={props.onClick}
      prefetch={true}
    >
      <props.item.icon className="mr-2 h-5 w-5" />
      {props.item.name}
    </Link>
  );
}

function SidebarContent(props: {
  onNavigate?: () => void;
  items: SidebarItem[];
  sidebarTop?: React.ReactNode;
  basePath: string;
}) {
  const path = usePathname();
  const segment = useSegment(props.basePath);

  return (
    <div className="flex flex-col h-full items-stretch">
      <div className="h-14 flex items-center px-2 shrink-0 mr-10 md:mr-0 border-b">
        {props.sidebarTop}
      </div>
      <div className="flex flex-grow flex-col gap-2 pt-4 overflow-y-auto">
        {props.items.map((item, index) => {
          if (item.type === "separator") {
            return <Separator key={index} className="my-2" />;
          } else if (item.type === "item") {
            return (
              <div key={index} className="flex px-2">
                <NavItem
                  item={item}
                  onClick={props.onNavigate}
                  basePath={props.basePath}
                />
              </div>
            );
          } else {
            return (
              <div key={index} className="flex my-2">
                <div className="flex-grow justify-start text-sm font-medium text-zinc-500 px-2">
                  {item.name}
                </div>
              </div>
            );
          }
        })}

        <div className="flex-grow" />
      </div>
    </div>
  );
}

export default function SidebarLayout(props: {
  children?: React.ReactNode;
  items: SidebarItem[];
  sidebarTop?: React.ReactNode;
  basePath: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="w-full flex">
      <div className="flex-col border-r w-[240px] h-screen sticky top-0 hidden md:flex">
        <SidebarContent items={props.items} sidebarTop={props.sidebarTop} basePath={props.basePath} />
      </div>
      <div className="flex flex-col flex-grow w-0">
        <div className="flex-grow">{props.children}</div>
      </div>
    </div>
  );
}
