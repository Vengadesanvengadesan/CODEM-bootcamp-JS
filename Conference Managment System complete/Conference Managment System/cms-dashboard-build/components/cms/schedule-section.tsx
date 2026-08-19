"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock, Loader2, Coffee, Utensils, Mic, BookOpen, Wrench, Users } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface ScheduleEvent {
    _id: string; eventId: string; day: number; time: string; endTime: string
    title: string; speaker?: string; location: string
    type: "keynote" | "paper" | "workshop" | "break" | "panel" | "social"
    track?: string; description: string
}

const typeConfig: Record<string, { color: string; bgColor: string; icon: React.ElementType; label: string }> = {
    keynote: { color: "text-purple-400", bgColor: "bg-purple-500/10 border-purple-500/20", icon: Mic, label: "Keynote" },
    paper: { color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20", icon: BookOpen, label: "Paper Session" },
    workshop: { color: "text-green-400", bgColor: "bg-green-500/10 border-green-500/20", icon: Wrench, label: "Workshop" },
    break: { color: "text-slate-400", bgColor: "bg-slate-500/10 border-slate-500/20", icon: Coffee, label: "Break" },
    panel: { color: "text-orange-400", bgColor: "bg-orange-500/10 border-orange-500/20", icon: Users, label: "Panel" },
    social: { color: "text-pink-400", bgColor: "bg-pink-500/10 border-pink-500/20", icon: Utensils, label: "Social" },
}

export function ScheduleSection() {
    const [events, setEvents] = useState<ScheduleEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [activeDay, setActiveDay] = useState(1)

    useEffect(() => {
        fetch(`${API}/api/schedule`)
            .then(r => r.json())
            .then(data => { setEvents(data); setLoading(false) })
            .catch(() => { setError("Failed to load schedule. Is the backend running?"); setLoading(false) })
    }, [])

    const days = [1, 2, 3]
    const dayEvents = events.filter(e => e.day === activeDay)

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Calendar className="h-6 w-6 text-purple-400" /> Conference Schedule</h2>
                <p className="text-slate-400 mt-1">ICCS 2026 — July 15–17, 2026 · Convention Center</p>
            </div>

            {loading && <div className="flex items-center justify-center py-20 gap-3"><Loader2 className="h-6 w-6 text-blue-400 animate-spin" /><span className="text-slate-400">Loading schedule…</span></div>}
            {error && <div className="glass rounded-2xl p-6 text-red-400 text-center">{error}</div>}

            {!loading && !error && (
                <>
                    {/* Day Tabs */}
                    <div className="flex gap-2">
                        {days.map(d => (
                            <button key={d} onClick={() => setActiveDay(d)}
                                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${activeDay === d ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "glass text-slate-400 hover:text-white"}`}>
                                Day {d}
                            </button>
                        ))}
                    </div>

                    {/* Events */}
                    <div className="space-y-3">
                        {dayEvents.map(event => {
                            const cfg = typeConfig[event.type] || typeConfig.break
                            const Icon = cfg.icon
                            return (
                                <div key={event._id} className={`glass rounded-2xl p-4 border ${cfg.bgColor} hover:bg-white/5 transition-colors`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color} bg-white/5`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${cfg.color} bg-white/5`}>{cfg.label}</span>
                                                {event.track && <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">{event.track}</span>}
                                            </div>
                                            <h3 className="text-sm font-semibold text-white">{event.title}</h3>
                                            {event.speaker && <p className="text-xs text-blue-300 mt-0.5">{event.speaker}</p>}
                                            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                                <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" />{event.time} – {event.endTime}</span>
                                                <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin className="h-3 w-3" />{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-2 ml-14">{event.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
