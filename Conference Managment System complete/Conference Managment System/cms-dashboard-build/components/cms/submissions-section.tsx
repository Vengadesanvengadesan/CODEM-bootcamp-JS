"use client"

import { useEffect, useState } from "react"
import { FileText, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface Paper {
    _id: string; paperId: string; title: string; authors: string
    track: string; status: string; score: number | null; submittedDate: string
}

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
    Accepted: { color: "text-green-400 bg-green-400/10", icon: CheckCircle },
    Submitted: { color: "text-blue-400 bg-blue-400/10", icon: FileText },
    "Under Review": { color: "text-yellow-400 bg-yellow-400/10", icon: Clock },
    "Revision Needed": { color: "text-orange-400 bg-orange-400/10", icon: AlertCircle },
    pending: { color: "text-slate-400 bg-slate-400/10", icon: Clock },
}

export function SubmissionsSection() {
    const [papers, setPapers] = useState<Paper[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(`${API}/api/papers`)
            .then(r => r.json())
            .then(data => { setPapers(data); setLoading(false) })
            .catch(() => { setError("Failed to load papers. Is the backend running?"); setLoading(false) })
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><FileText className="h-6 w-6 text-blue-400" /> My Submissions</h2>
                <p className="text-slate-400 mt-1">{papers.length} paper{papers.length !== 1 ? "s" : ""} submitted</p>
            </div>

            {loading && (
                <div className="flex items-center justify-center py-20 gap-3">
                    <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
                    <span className="text-slate-400">Loading papers…</span>
                </div>
            )}
            {error && <div className="glass rounded-2xl p-6 text-red-400 text-center">{error}</div>}

            {!loading && !error && papers.length === 0 && (
                <div className="glass rounded-2xl p-12 text-center">
                    <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">No submissions yet. Go to <strong className="text-blue-400">Submit Paper</strong> to add one.</p>
                </div>
            )}

            <div className="space-y-3">
                {papers.map(paper => {
                    const cfg = statusConfig[paper.status] || statusConfig.pending
                    const Icon = cfg.icon
                    return (
                        <div key={paper._id} className="glass rounded-2xl p-5 hover:bg-white/5 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-lg">{paper.paperId}</span>
                                        <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-lg">{paper.track}</span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white leading-tight">{paper.title}</h3>
                                    <p className="text-xs text-slate-400 mt-1">{paper.authors}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg ${cfg.color}`}>
                                        <Icon className="h-3 w-3" />{paper.status}
                                    </span>
                                    {paper.score !== null && (
                                        <span className="text-xs text-yellow-400 font-bold">★ {paper.score}</span>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Submitted: {paper.submittedDate}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
