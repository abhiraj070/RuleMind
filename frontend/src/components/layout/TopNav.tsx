import { Bell, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";

interface TopNavProps {
  title: string;
  subtitle?: string;
}

export function TopNav({ title, subtitle }: TopNavProps) {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-card border-b border-border flex items-center justify-between px-6"
    >
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-muted-foreground"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground bg-background rounded border">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* User */}
        <button className="flex items-center gap-3 p-2 pr-4 rounded-lg hover:bg-secondary transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">JD</span>
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">John Doe</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-primary/10 text-primary rounded-full">
              Compliance Officer
            </span>
          </div>
          <ChevronDown size={16} className="text-muted-foreground hidden md:block" />
        </button>
      </div>
    </motion.header>
  );
}
