"use client"

import { useState, useRef } from "react"
import { use3DTilt } from "@/hooks/use-3d-tilt"
import type { Section } from "@/lib/cms-data"
import { Sidebar } from "@/components/cms/sidebar"
import { Header } from "@/components/cms/header"
import { OverviewSection } from "@/components/cms/overview-section"
import { RegistrationSection } from "@/components/cms/registration-section"
import { SubmissionsSection } from "@/components/cms/submissions-section"
import { SubmitPaperSection } from "@/components/cms/submit-paper-section"
import { ReviewsSection } from "@/components/cms/reviews-section"
import { ScheduleSection } from "@/components/cms/schedule-section"
import { AdminSection } from "@/components/cms/admin-section"
import { SettingsSection } from "@/components/cms/settings-section"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userName, setUserName] = useState("Vengadesan")

  const sectionComponents: Record<Section, React.ReactNode> = {
    overview: <OverviewSection />,
    registration: <RegistrationSection />,
    submissions: <SubmissionsSection />,
    upload: <SubmitPaperSection />,
    reviews: <ReviewsSection />,
    schedule: <ScheduleSection />,
    admin: <AdminSection />,
    settings: <SettingsSection userName={userName} onNameChange={setUserName} />,
  }

  // Refs for 3D Tilt
  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Apply Tilt Code
  use3DTilt(sidebarRef)
  use3DTilt(contentRef)

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0f172a] text-white selection:bg-blue-500/30">
      {/* Background Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Sidebar Wrapper for Tilt */}
      <div ref={sidebarRef} className="z-50 h-screen py-4 pl-4 transition-transform duration-100 ease-out will-change-transform perspective-1000">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          mobileOpen={mobileOpen}
          onMobileToggle={() => setMobileOpen(false)}
        />
      </div>

      {/* Main Content Wrapper for Tilt */}
      <main ref={contentRef} className="relative flex flex-1 flex-col h-screen overflow-hidden py-4 pr-4 pl-4 transition-transform duration-100 ease-out will-change-transform perspective-1000">
        <div className="flex h-full flex-col gap-6 rounded-2xl glass overflow-y-auto p-4 lg:p-6">
          <Header userName={userName} onSectionChange={setActiveSection} onMobileToggle={() => setMobileOpen(true)} />

          {/* Active Section Content */}
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            {sectionComponents[activeSection]}
          </div>
        </div>
      </main>
    </div>
  )
}
