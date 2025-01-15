import Link from "next/link"
import { Home, Users, Calendar, Clipboard, DollarSign, Settings, BarChart, FileText } from 'lucide-react'

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Edirs", href: "/edirs", icon: Users },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Tasks", href: "/tasks", icon: Clipboard },
  { name: "Transactions", href: "/transactions", icon: DollarSign },
  { name: "Claim Requests", href: "/claim-requests", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-card text-card-foreground border-r">
      <div className="flex h-20 items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-primary">E-Edir Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

