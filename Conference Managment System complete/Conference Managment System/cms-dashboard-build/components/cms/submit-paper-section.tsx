"use client"

import { useState } from "react"
import { Upload, CheckCircle } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const tracks = ["AI & Machine Learning", "Quantum Computing", "Blockchain & Security", "IoT & Embedded Systems", "Cloud Computing", "Cybersecurity", "Human-Computer Interaction", "General"]

export function SubmitPaperSection() {
    const [form, setForm] = useState({ title: "", authors: "", track: tracks[0], abstract: "", keywords: "" })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [paperId, setPaperId] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim() || !form.authors.trim() || !form.abstract.trim()) {
            setError("Title, authors, and abstract are required."); return
        }
        setLoading(true); setError("")
        try {
            const res = await fetch(`${API}/api/papers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title,
                    authors: form.authors,
                    track: form.track,
                    abstract: form.abstract,
                    keywords: form.keywords.split(",").map(k => k.trim()).filter(Boolean)
                })
            })
            if (!res.ok) throw new Error("Submission failed")
            const data = await res.json()
            setPaperId(data.paperId || data._id)
            setSubmitted(true)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Paper Submitted!</h2>
                <p className="text-slate-400 text-center">Your paper has been submitted for review.</p>
                <p className="text-xs font-mono text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg">Paper ID: {paperId}</p>
                <button onClick={() => { setSubmitted(false); setForm({ title: "", authors: "", track: tracks[0], abstract: "", keywords: "" }) }}
                    className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
                    Submit Another Paper
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Upload className="h-6 w-6 text-blue-400" /> Submit Paper</h2>
                <p className="text-slate-400 mt-1">Submit your research paper for ICCS 2026</p>
            </div>

            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Paper Title *</label>
                    <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        placeholder="Enter the full title of your paper"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Authors *</label>
                    <input value={form.authors} onChange={e => setForm(f => ({ ...f, authors: e.target.value }))}
                        placeholder="e.g. Vengadesan K., Priya S., Kumar R."
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Research Track</label>
                    <select value={form.track} onChange={e => setForm(f => ({ ...f, track: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-sm">
                        {tracks.map(t => <option key={t} value={t} className="bg-slate-800">{t}</option>)}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Abstract *</label>
                    <textarea value={form.abstract} onChange={e => setForm(f => ({ ...f, abstract: e.target.value }))}
                        placeholder="Provide a comprehensive abstract of your research (150–300 words)"
                        rows={5}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Keywords</label>
                    <input value={form.keywords} onChange={e => setForm(f => ({ ...f, keywords: e.target.value }))}
                        placeholder="e.g. Deep Learning, Neural Networks, Computer Vision (comma separated)"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button type="submit" disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    {loading ? "Submitting…" : "Submit Paper"}
                </button>
            </form>
        </div>
    )
}
