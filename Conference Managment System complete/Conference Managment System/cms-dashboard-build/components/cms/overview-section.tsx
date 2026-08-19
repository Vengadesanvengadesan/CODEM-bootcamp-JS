"use client"

import { useEffect, useState } from "react"
import { FileText, CheckCircle, Clock, Users, TrendingUp, AlertCircle, Bell, Upload, Mail, MessageSquare } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface Stats { totalPapers: number; accepted: number; underReview: number; totalRegistered: number }

const iconMap: Record<string, React.ElementType> = {
    CheckCircle, MessageSquare, Upload, AlertCircle, Bell, Mail
}

const activityFeed = [
    { id: "a1", title: "Paper Accepted", description: "\"Deep Learning Approaches for Real-Time Object Detection\" has been accepted for ICCS 2026.", time: "2 hours ago", icon: "CheckCircle" },
    { id: "a2", title: "New Review Available", description: "Reviewer feedback available for \"Federated Learning with Differential Privacy\".", time: "5 hours ago", icon: "MessageSquare" },
    { id: "a3", title: "Paper Submitted", description: "\"Energy-Efficient Edge AI: Neural Architecture Search\" submitted successfully.", time: "1 day ago", icon: "Upload" },
    { id: "a4", title: "Revision Required", description: "\"Federated Learning with Differential Privacy\" requires revisions.", time: "2 days ago", icon: "AlertCircle" },
    { id: "a5", title: "Schedule Published", description: "ICCS 2026 full 3-day conference schedule is now available.", time: "3 days ago", icon: "Bell" },
]

function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: number | string; sub?: string; color: string }) {
    return (
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
                {sub && <p className="text-xs text-blue-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    )
}

export function OverviewSection() {
    const [stats, setStats] = useState<Stats>({ totalPapers: 0, accepted: 0, underReview: 0, totalRegistered: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API}/api/stats`)
            .then(r => r.json())
            .then(data => { setStats(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                <p className="text-slate-400 mt-1">Welcome to ICCS 2026 Conference Management System</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={FileText} label="Total Papers" value={loading ? "…" : stats.totalPapers} color="bg-blue-600" />
                <StatCard icon={CheckCircle} label="Accepted Papers" value={loading ? "…" : stats.accepted} color="bg-green-600" />
                <StatCard icon={Clock} label="Under Review" value={loading ? "…" : stats.underReview} color="bg-yellow-600" />
                <StatCard icon={Users} label="Total Registered" value={loading ? "…" : stats.totalRegistered} color="bg-purple-600" />
            </div>

            {/* Key Info Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-2xl p-4 flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-white">28% Acceptance Rate</p>
                        <p className="text-xs text-slate-400">Best-in-class quality</p>
                    </div>
                </div>
                <div className="glass rounded-2xl p-4 flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-white">42 Countries Represented</p>
                        <p className="text-xs text-slate-400">Global participation</p>
                    </div>
                </div>
                <div className="glass rounded-2xl p-4 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-white">3-Day Conference</p>
                        <p className="text-xs text-slate-400">July 15–17, 2026</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {activityFeed.map(a => {
                        const Icon = iconMap[a.icon] || Bell
                        return (
                            <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="h-8 w-8 rounded-lg bg-blue-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Icon className="h-4 w-4 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white">{a.title}</p>
                                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{a.description}</p>
                                </div>
                                <span className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0">{a.time}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
