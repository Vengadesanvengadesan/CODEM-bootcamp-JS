"use client"

import { useState } from "react"
import {
    LayoutDashboard, UserCheck, FileText, Upload,
    Star, Calendar, Shield, Settings,
    ChevronRight, GraduationCap, X
} from "lucide-react"
import type { Section } from "@/lib/cms-data"

interface SidebarProps {
    activeSection: Section
    onSectionChange: (section: Section) => void
    mobileOpen: boolean
    onMobileToggle: () => void
}

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "registration", label: "Registration", icon: UserCheck },
    { id: "submissions", label: "Submissions", icon: FileText },
    { id: "upload", label: "Submit Paper", icon: Upload },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "admin", label: "Admin Panel", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activeSection, onSectionChange, mobileOpen, onMobileToggle }: SidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onMobileToggle} />
            )}

            <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        w-64 h-full flex flex-col
        glass rounded-2xl overflow-hidden
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                {/* Logo */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-white text-sm leading-tight">ICCS 2026</p>
                        <p className="text-xs text-blue-300">Conference Portal</p>
                    </div>
                    <button className="ml-auto lg:hidden text-white/60 hover:text-white" onClick={onMobileToggle}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {navItems.map(({ id, label, icon: Icon }) => {
                        const isActive = activeSection === id
                        return (
                            <button
                                key={id}
                                onClick={() => { onSectionChange(id); onMobileToggle() }}
                                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${isActive
                                        ? "bg-gradient-to-r from-blue-600/80 to-purple-600/60 text-white shadow-lg"
                                        : "text-slate-400 hover:text-white hover:bg-white/10"
                                    }
                `}
                            >
                                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-blue-200" : "text-slate-500 group-hover:text-blue-400"}`} />
                                <span className="flex-1 text-left">{label}</span>
                                {isActive && <ChevronRight className="h-3.5 w-3.5 text-blue-300" />}
                            </button>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/10">
                    <p className="text-xs text-slate-500 text-center">International Conference on<br />Computing Sciences 2026</p>
                </div>
            </aside>
        </>
    )
}
