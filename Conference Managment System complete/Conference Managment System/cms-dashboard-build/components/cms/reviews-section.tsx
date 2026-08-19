"use client"

import { useEffect, useState } from "react"
import { Star, Loader2, Clock, CheckCircle, UserCheck } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface Review {
    _id: string; paperId: string; paperTitle: string; stage: string
    reviewer: string; date: string; score: number | null; feedback: string
    criteria: { originality: number; relevance: number; methodology: number; clarity: number }
}

const stageColor: Record<string, string> = {
    "Decision Made": "text-green-400 bg-green-400/10",
    "Under Review": "text-yellow-400 bg-yellow-400/10",
    "Reviewer Assigned": "text-blue-400 bg-blue-400/10",
}

function ScoreBadge({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${value >= 7 ? "bg-green-500/20 text-green-400" : value >= 4 ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-500/20 text-slate-400"}`}>
                {value || "—"}
            </div>
            <span className="text-[10px] text-slate-500">{label}</span>
        </div>
    )
}

export function ReviewsSection() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(`${API}/api/reviews`)
            .then(r => r.json())
            .then(data => { setReviews(data); setLoading(false) })
            .catch(() => { setError("Failed to load reviews. Is the backend running?"); setLoading(false) })
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Star className="h-6 w-6 text-yellow-400" /> Peer Reviews</h2>
                <p className="text-slate-400 mt-1">Review feedback and scores for your submitted papers</p>
            </div>

            {loading && <div className="flex items-center justify-center py-20 gap-3"><Loader2 className="h-6 w-6 text-blue-400 animate-spin" /><span className="text-slate-400">Loading reviews…</span></div>}
            {error && <div className="glass rounded-2xl p-6 text-red-400 text-center">{error}</div>}

            <div className="space-y-4">
                {reviews.map(review => {
                    const color = stageColor[review.stage] || "text-slate-400 bg-slate-400/10"
                    return (
                        <div key={review._id} className="glass rounded-2xl p-5 space-y-4">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-lg">{review.paperId}</span>
                                    <h3 className="text-sm font-semibold text-white mt-1.5 leading-tight">{review.paperTitle}</h3>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span className="text-xs text-slate-400 flex items-center gap-1"><UserCheck className="h-3 w-3" />{review.reviewer}</span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" />{review.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${color}`}>{review.stage}</span>
                                    {review.score !== null && (
                                        <span className="text-sm font-bold text-yellow-400 flex items-center gap-0.5">
                                            <Star className="h-3.5 w-3.5 fill-yellow-400" />{review.score}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Criteria scores */}
                            {review.score !== null && (
                                <div className="flex gap-4 justify-start">
                                    <ScoreBadge label="Originality" value={review.criteria.originality} />
                                    <ScoreBadge label="Relevance" value={review.criteria.relevance} />
                                    <ScoreBadge label="Methodology" value={review.criteria.methodology} />
                                    <ScoreBadge label="Clarity" value={review.criteria.clarity} />
                                </div>
                            )}

                            {/* Feedback */}
                            <div className="bg-white/5 rounded-xl p-3">
                                <p className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1"><CheckCircle className="h-3 w-3" />Reviewer Feedback</p>
                                <p className="text-sm text-slate-300 leading-relaxed">{review.feedback}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
