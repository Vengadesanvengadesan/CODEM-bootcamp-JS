"use client"

import { useState } from "react"
import { UserCheck, CheckCircle } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export function RegistrationSection() {
    const [form, setForm] = useState({ name: "", email: "", organization: "", ticketType: "Student" })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name.trim() || !form.email.trim()) { setError("Name and email are required."); return }
        setLoading(true); setError("")
        try {
            const res = await fetch(`${API}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            if (!res.ok) throw new Error("Registration failed")
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
                <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
                <p className="text-slate-400 text-center">Welcome, {form.name}! You are registered as a <strong className="text-blue-400">{form.ticketType}</strong> attendee.</p>
                <p className="text-slate-500 text-sm">A confirmation will be sent to {form.email}</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organization: "", ticketType: "Student" }) }}
                    className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
                    Register Another
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><UserCheck className="h-6 w-6 text-blue-400" /> Conference Registration</h2>
                <p className="text-slate-400 mt-1">Register for ICCS 2026 — International Conference on Computing Sciences</p>
            </div>

            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Full Name *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Vengadesan K."
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Organization / Institution</label>
                    <input value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
                        placeholder="e.g. GCE Tirunelveli"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Ticket Type</label>
                    <select value={form.ticketType} onChange={e => setForm(f => ({ ...f, ticketType: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-sm appearance-none">
                        <option value="Student" className="bg-slate-800">Student — $50</option>
                        <option value="Professional" className="bg-slate-800">Professional — $150</option>
                        <option value="Academic" className="bg-slate-800">Academic — $100</option>
                        <option value="Speaker" className="bg-slate-800">Speaker — $100</option>
                    </select>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button type="submit" disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg">
                    {loading ? "Registering…" : "Register for ICCS 2026"}
                </button>
            </form>
        </div>
    )
}
