"use client"

import { useEffect, useState } from "react"
import { Shield, CheckCircle, Clock, XCircle, Loader2, Trash2, UserCheck } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface AdminUser {
    _id: string; userId: string; name: string; email: string
    role: string; payment: string; status: "Confirmed" | "Pending" | "Cancelled"
    registeredDate: string
}

const statusIcon = {
    Confirmed: <CheckCircle className="h-4 w-4 text-green-400" />,
    Pending: <Clock className="h-4 w-4 text-yellow-400" />,
    Cancelled: <XCircle className="h-4 w-4 text-red-400" />,
}

const statusColor = {
    Confirmed: "text-green-400 bg-green-400/10",
    Pending: "text-yellow-400 bg-yellow-400/10",
    Cancelled: "text-red-400 bg-red-400/10",
}

export function AdminSection() {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actionId, setActionId] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${API}/api/admin/users`)
            .then(r => r.json())
            .then(data => { setUsers(data); setLoading(false) })
            .catch(() => { setError("Failed to load users. Is the backend running?"); setLoading(false) })
    }, [])

    const activate = async (id: string) => {
        setActionId(id)
        try {
            const res = await fetch(`${API}/api/admin/users/${id}/activate`, { method: "PUT" })
            if (!res.ok) throw new Error()
            setUsers(u => u.map(x => x._id === id ? { ...x, status: "Confirmed" } : x))
        } catch { setError("Failed to activate user.") }
        finally { setActionId(null) }
    }

    const remove = async (id: string) => {
        if (!confirm("Delete this user?")) return
        setActionId(id)
        try {
            const res = await fetch(`${API}/api/admin/users/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error()
            setUsers(u => u.filter(x => x._id !== id))
        } catch { setError("Failed to delete user.") }
        finally { setActionId(null) }
    }

    const confirmed = users.filter(u => u.status === "Confirmed").length
    const pending = users.filter(u => u.status === "Pending").length

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Shield className="h-6 w-6 text-purple-400" /> Admin Panel</h2>
                <p className="text-slate-400 mt-1">Manage conference registrations and attendees</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="glass rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-white">{users.length}</p><p className="text-xs text-slate-400 mt-0.5">Total</p></div>
                <div className="glass rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-green-400">{confirmed}</p><p className="text-xs text-slate-400 mt-0.5">Confirmed</p></div>
                <div className="glass rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-yellow-400">{pending}</p><p className="text-xs text-slate-400 mt-0.5">Pending</p></div>
            </div>

            {error && <div className="text-red-400 text-sm bg-red-400/10 px-4 py-2 rounded-xl">{error}</div>}
            {loading && <div className="flex justify-center py-16 gap-3"><Loader2 className="h-6 w-6 text-blue-400 animate-spin" /><span className="text-slate-400">Loading users…</span></div>}

            {!loading && (
                <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-left">
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Role</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Payment</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map(user => (
                                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-blue-400">{user.userId}</td>
                                        <td className="px-4 py-3">
                                            <p className="text-white font-medium">{user.name}</p>
                                            <p className="text-xs text-slate-500 hidden sm:block">{user.email}</p>
                                        </td>
                                        <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{user.role}</td>
                                        <td className="px-4 py-3 text-slate-400 hidden lg:table-cell">{user.payment}</td>
                                        <td className="px-4 py-3">
                                            <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg w-fit ${statusColor[user.status]}`}>
                                                {statusIcon[user.status]}{user.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                {user.status === "Pending" && (
                                                    <button onClick={() => activate(user._id)} disabled={actionId === user._id}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/40 text-green-400 text-xs rounded-lg transition-colors disabled:opacity-50">
                                                        <UserCheck className="h-3 w-3" />Activate
                                                    </button>
                                                )}
                                                <button onClick={() => remove(user._id)} disabled={actionId === user._id}
                                                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
