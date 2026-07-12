import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Lock, LogOut, Download, RefreshCw, Users, Mail, Briefcase, UserPlus, FileText } from 'lucide-react'
import {
  adminLogin,
  adminLogout,
  getAdminToken,
  fetchStats,
  fetchLeads,
  fetchContacts,
  fetchCareers,
  fetchFreelancers,
  downloadFile,
  type AdminStats,
} from '@/lib/adminApi'
import { SEO } from '@/components/SEO'
import { cn } from '@/lib/utils'

type Tab = 'leads' | 'contacts' | 'careers' | 'freelancers'

const tabs: { id: Tab; label: string; icon: typeof Mail }[] = [
  { id: 'leads', label: 'Demo Requests', icon: FileText },
  { id: 'contacts', label: 'Contact', icon: Mail },
  { id: 'careers', label: 'Careers', icon: Briefcase },
  { id: 'freelancers', label: 'Freelancers', icon: UserPlus },
]

function DataTable({ rows, columns }: { rows: Record<string, unknown>[]; columns: { key: string; label: string; wide?: boolean }[] }) {
  if (rows.length === 0) {
    return <p className="text-white/40 text-center py-12">No submissions yet.</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-brand-300 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-white/70', col.wide && 'max-w-xs truncate')}>
                  {col.key === 'created_at' ? formatDate(String(row[col.key] ?? '')) : String(row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function formatDate(d: string) {
  if (!d) return '—'
  try {
    return new Date(d.includes('T') ? d : d + 'Z').toLocaleString()
  } catch {
    return d
  }
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(!!getAdminToken())
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<Tab>('leads')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [rows, setRows] = useState<Record<string, unknown>[]>([])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [s, data] = await Promise.all([
        fetchStats(),
        tab === 'leads' ? fetchLeads()
          : tab === 'contacts' ? fetchContacts()
          : tab === 'careers' ? fetchCareers()
          : fetchFreelancers(),
      ])
      setStats(s)
      setRows(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
      if (err instanceof Error && (err.message.includes('Unauthorized') || err.message.includes('expired'))) {
        setAuthed(false)
      }
    } finally {
      setLoading(false)
    }
  }, [tab])

  useEffect(() => {
    if (authed) loadData()
  }, [authed, loadData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(password)
      setAuthed(true)
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await adminLogout()
    setAuthed(false)
    setRows([])
    setStats(null)
  }

  if (!authed) {
    return (
      <>
        <SEO title="Admin" description="Fratelanza admin panel" path="/admin" />
        <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleLogin}
            className="glass-premium rounded-2xl p-8 w-full max-w-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-brand-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Fratelanza Admin</h1>
                <p className="text-sm text-white/50">View form submissions</p>
              </div>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="input-premium mb-4"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-mint-600 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </motion.form>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Admin Dashboard" description="View form submissions" path="/admin" />
      <div className="min-h-screen bg-dark-950">
        <header className="border-b border-white/10 glass-strong sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-300" />
              <h1 className="font-bold text-lg">Submissions Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                disabled={loading}
                className="p-2 rounded-lg glass hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title="Refresh"
              >
                <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 text-sm text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {([
                ['leads', 'Demo Requests', stats.leads],
                ['contacts', 'Contact', stats.contacts],
                ['careers', 'Careers', stats.careers],
                ['freelancers', 'Freelancers', stats.freelancers],
              ] as const).map(([id, label, count]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    'glass-premium rounded-xl p-4 text-left transition-all',
                    tab === id && 'ring-2 ring-brand-400/40 bg-brand-500/10',
                  )}
                >
                  <div className="text-2xl font-bold text-gradient-brand">{count}</div>
                  <div className="text-xs text-white/50 mt-1">{label}</div>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                  tab === id
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30'
                    : 'glass text-white/50 hover:text-white/80',
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          {tab === 'leads' && (
            <DataTable
              rows={rows}
              columns={[
                { key: 'id', label: '#' },
                { key: 'created_at', label: 'Date' },
                { key: 'company_name', label: 'Company' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'industry', label: 'Industry' },
                { key: 'expected_users', label: 'Employees' },
                { key: 'preferred_contact_time', label: 'Branches' },
                { key: 'interested_product', label: 'Product' },
                { key: 'message', label: 'Message', wide: true },
              ]}
            />
          )}

          {tab === 'contacts' && (
            <DataTable
              rows={rows}
              columns={[
                { key: 'id', label: '#' },
                { key: 'created_at', label: 'Date' },
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'subject', label: 'Subject' },
                { key: 'message', label: 'Message', wide: true },
              ]}
            />
          )}

          {tab === 'careers' && (
            <>
              <DataTable
                rows={rows}
                columns={[
                  { key: 'id', label: '#' },
                  { key: 'created_at', label: 'Date' },
                  { key: 'full_name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'position', label: 'Role' },
                  { key: 'country', label: 'Country' },
                  { key: 'experience', label: 'Experience' },
                  { key: 'skills', label: 'Skills', wide: true },
                ]}
              />
              {rows.some((r) => r.resume_path) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {rows.filter((r) => r.resume_path).map((r) => (
                    <button
                      key={String(r.id)}
                      onClick={() => downloadFile('careers', r.id as number, `cv-${r.full_name}.pdf`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm text-brand-300 hover:bg-brand-500/10 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {String(r.full_name)} CV
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'freelancers' && (
            <>
              <DataTable
                rows={rows}
                columns={[
                  { key: 'id', label: '#' },
                  { key: 'created_at', label: 'Date' },
                  { key: 'full_name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'country', label: 'Country' },
                  { key: 'technologies', label: 'Skills', wide: true },
                  { key: 'hourly_rate', label: 'Salary' },
                  { key: 'monthly_availability', label: 'Availability' },
                ]}
              />
              {rows.some((r) => r.resume_path) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {rows.filter((r) => r.resume_path).map((r) => (
                    <button
                      key={String(r.id)}
                      onClick={() => downloadFile('freelancers', r.id as number, `cv-${r.full_name}.pdf`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm text-brand-300 hover:bg-brand-500/10 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {String(r.full_name)} CV
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}
