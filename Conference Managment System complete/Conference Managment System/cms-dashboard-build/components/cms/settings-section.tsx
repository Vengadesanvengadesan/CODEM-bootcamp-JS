"use client"

import { useState } from "react"
import { Settings, User, Bell, Globe, Lock, Save, CheckCircle } from "lucide-react"

interface SettingsSectionProps {
    userName: string
    onNameChange: (name: string) => void
}

export function SettingsSection({ userName, onNameChange }: SettingsSectionProps) {
    const [name, setName] = useState(userName)
    const [organization, setOrganization] = useState("GCE Tirunelveli")
    const [email, setEmail] = useState("vengadesan@gce.edu")
    const [notifications, setNotifications] = useState({ email: true, reviews: true, schedule: false })
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Update the parent component name immediately
        onNameChange(name)
        // Simulate a save delay
        await new Promise(r => setTimeout(r, 600))
        setLoading(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Settings className="h-6 w-6 text-slate-400" /> Settings</h2>
                <p className="text-slate-400 mt-1">Manage your account and preferences</p>
            </div>

            {/* Profile Section */}
            <form onSubmit={handleSave}>
                <div className="glass rounded-2xl p-5 space-y-4">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2"><User className="h-4 w-4 text-blue-400" />Profile Information</h3>

                    <div className="flex items-center gap-4 pb-2">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-white font-semibold">{name}</p>
                            <p className="text-xs text-slate-400">Student Attendee · ICCS 2026</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Display Name</label>
                            <input value={name} onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-sm font-medium text-slate-300">Organization</label>
                            <input value={organization} onChange={e => setOrganization(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="glass rounded-2xl p-5 space-y-3 mt-4">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2"><Bell className="h-4 w-4 text-yellow-400" />Notifications</h3>
                    {[
                        { key: "email", label: "Email Notifications", desc: "Receive conference updates via email" },
                        { key: "reviews", label: "Review Alerts", desc: "Notify when your paper gets a review" },
                        { key: "schedule", label: "Schedule Reminders", desc: "Event reminders before sessions start" },
                    ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between py-1.5">
                            <div>
                                <p className="text-sm text-white font-medium">{label}</p>
                                <p className="text-xs text-slate-500">{desc}</p>
                            </div>
                            <button type="button"
                                onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                                className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key as keyof typeof notifications] ? "bg-blue-600" : "bg-white/10"}`}>
                                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${notifications[key as keyof typeof notifications] ? "translate-x-[1.375rem]" : "translate-x-0.5"}`} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Other info */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="glass rounded-2xl p-4 flex items-center gap-3">
                        <Globe className="h-5 w-5 text-blue-400" />
                        <div><p className="text-sm font-medium text-white">Timezone</p><p className="text-xs text-slate-400">Asia/Kolkata (IST)</p></div>
                    </div>
                    <div className="glass rounded-2xl p-4 flex items-center gap-3">
                        <Lock className="h-5 w-5 text-green-400" />
                        <div><p className="text-sm font-medium text-white">Account</p><p className="text-xs text-slate-400">Student · ICCS-STU-042</p></div>
                    </div>
                </div>

                {/* Save */}
                <button type="submit" disabled={loading}
                    className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg">
                    {saved ? <><CheckCircle className="h-4 w-4" />Saved!</> : <><Save className="h-4 w-4" />{loading ? "Saving…" : "Save Changes"}</>}
                </button>
            </form>
        </div>
    )
}
