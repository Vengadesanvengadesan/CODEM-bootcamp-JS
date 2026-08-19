"use client"

import { Bell, Search, Menu } from "lucide-react"
import type { Section } from "@/lib/cms-data"

interface HeaderProps {
    userName: string
    onSectionChange: (section: Section) => void
    onMobileToggle: () => void
}

export function Header({ userName, onSectionChange, onMobileToggle }: HeaderProps) {
    return (
        <header className="flex items-center justify-between gap-4">
            {/* Mobile menu + Search */}
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={onMobileToggle}
                    className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <div className="relative flex-1 max-w-sm hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500" />
                </button>

                <button
                    onClick={() => onSectionChange("settings")}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-white leading-tight">{userName}</p>
                        <p className="text-xs text-slate-400">Student</p>
                    </div>
                </button>
            </div>
        </header>
    )
}
