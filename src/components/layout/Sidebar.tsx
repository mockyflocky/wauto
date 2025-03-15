"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  Calendar,
  Settings,
  BarChart3,
  Zap,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps = {}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "WhatsApp",
      href: "/dashboard/whatsapp",
      icon: MessageSquare,
    },
    {
      name: "Message Templates",
      href: "/dashboard/templates",
      icon: MessageSquare,
    },
    {
      name: "Scheduling",
      href: "/dashboard/scheduling",
      icon: Calendar,
    },
    {
      name: "Automation Rules",
      href: "/dashboard/automation",
      icon: Zap,
    },
    {
      name: "Statistics",
      href: "/dashboard/statistics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "flex h-screen w-[280px] flex-col bg-background border-r p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">WA</span>
        </div>
        <h1 className="text-xl font-bold">WhatsApp Auto</h1>
      </div>

      <Separator className="my-4" />

      <nav className="flex-1 space-y-1 px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 px-2 py-4">
        <Separator />
        <div className="rounded-lg bg-muted/50 p-4">
          <h3 className="font-medium">Need Help?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Check our documentation or contact support
          </p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <HelpCircle className="mr-2 h-4 w-4" />
            Support
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
