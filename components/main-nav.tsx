import Link from "next/link"
import { type LucideIcon, BarChart3, BellRing, Book, Building2, Cog, LayoutGrid, MessageSquare } from 'lucide-react'

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const items: NavItem[] = [
  {
    title: "Accounts",
    href: "/accounts",
    icon: Building2,
  },
  {
    title: "Issues",
    href: "/issues",
    icon: MessageSquare,
  },
  {
    title: "Broadcasts",
    href: "/broadcasts",
    icon: BellRing,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Knowledge Base",
    href: "/knowledge",
    icon: Book,
  },
  {
    title: "Apps Directory",
    href: "/apps",
    icon: LayoutGrid,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Cog,
  },
]

export function MainNav() {
  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2 hover:bg-muted"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

