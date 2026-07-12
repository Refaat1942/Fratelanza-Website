import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Lock, LogOut, Download, RefreshCw, Users, Mail, Briefcase, UserPlus, FileText, FileSpreadsheet } from 'lucide-react'
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
import { exportSheetToExcel, exportWorkbookToExcel } from '@/lib/exportExcel'
import { useTranslation } from '@/i18n/useTranslation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { SEO } from '@/components/SEO'
import { cn } from '@/lib/utils'

type Tab = 'leads' | 'contacts' | 'careers' | 'freelancers'

function formatDate(d: string, locale: string) {
  if (!d) return '—'
  try {
    return new Date(d.includes('T') ? d : d + 'Z').toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')
  } catch {
    return d
  }
}

type Column = { key: string; label: string; wide?: boolean }

function DataTable({
  rows,
  columns,
  emptyText,
  dir,
  locale,
}: {
  rows: Record<string, unknown>[]
  columns: Column[]
  emptyText: string
  dir: string
  locale: string
}) {
  if (rows.length === 0) {
    return <p className="text-white/40 text-center py-12">{emptyText}</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10" dir={dir}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wider text-brand-300 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-white/70 text-start', col.wide && 'max-w-xs truncate')}>
                  {col.key === 'created_at' ? formatDate(String(row[col.key] ?? ''), locale) : String(row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AdminPage() {
  const { ui, dir, locale } = useTranslation()
  const [authed, setAuthed] = useState(!!getAdminToken())
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [tab, setTab] = useState<Tab>('leads')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [rows, setRows] = useState<Record<string, unknown>[]>([])

  const tabs: { id: Tab; label: string; icon: typeof Mail }[] = useMemo(() => [
    { id: 'leads', label: ui('admin', 'tabLeads'), icon: FileText },
    { id: 'contacts', label: ui('admin', 'tabContacts'), icon: Mail },
    { id: 'careers', label: ui('admin', 'tabCareers'), icon: Briefcase },
    { id: 'freelancers', label: ui('admin', 'tabFreelancers'), icon: UserPlus },
  ], [ui])

  const leadColumns: Column[] = useMemo(() => [
    { key: 'id', label: ui('admin', 'colId') },
    { key: 'created_at', label: ui('admin', 'colDate') },
    { key: 'company_name', label: ui('admin', 'colCompany') },
    { key: 'email', label: ui('admin', 'colEmail') },
    { key: 'phone', label: ui('admin', 'colPhone') },
    { key: 'whatsapp', label: ui('admin', 'colWhatsapp') },
    { key: 'industry', label: ui('admin', 'colIndustry') },
    { key: 'expected_users', label: ui('admin', 'colEmployees') },
    { key: 'preferred_contact_time', label: ui('admin', 'colBranches') },
    { key: 'interested_product', label: ui('admin', 'colProduct') },
    { key: 'current_system', label: ui('admin', 'colCurrentSystem') },
    { key: 'message', label: ui('admin', 'colMessage'), wide: true },
  ], [ui])

  const contactColumns: Column[] = useMemo(() => [
    { key: 'id', label: ui('admin', 'colId') },
    { key: 'created_at', label: ui('admin', 'colDate') },
    { key: 'name', label: ui('admin', 'colName') },
    { key: 'email', label: ui('admin', 'colEmail') },
    { key: 'phone', label: ui('admin', 'colPhone') },
    { key: 'subject', label: ui('admin', 'colSubject') },
    { key: 'message', label: ui('admin', 'colMessage'), wide: true },
  ], [ui])

  const careerColumns: Column[] = useMemo(() => [
    { key: 'id', label: ui('admin', 'colId') },
    { key: 'created_at', label: ui('admin', 'colDate') },
    { key: 'full_name', label: ui('admin', 'colName') },
    { key: 'email', label: ui('admin', 'colEmail') },
    { key: 'phone', label: ui('admin', 'colPhone') },
    { key: 'position', label: ui('admin', 'colRole') },
    { key: 'country', label: ui('admin', 'colCountry') },
    { key: 'experience', label: ui('admin', 'colExperience') },
    { key: 'skills', label: ui('admin', 'colSkills'), wide: true },
    { key: 'portfolio', label: ui('admin', 'colPortfolio') },
    { key: 'linkedin', label: ui('admin', 'colLinkedin') },
    { key: 'github', label: ui('admin', 'colGithub') },
  ], [ui])

  const freelancerColumns: Column[] = useMemo(() => [
    { key: 'id', label: ui('admin', 'colId') },
    { key: 'created_at', label: ui('admin', 'colDate') },
    { key: 'full_name', label: ui('admin', 'colName') },
    { key: 'email', label: ui('admin', 'colEmail') },
    { key: 'phone', label: ui('admin', 'colPhone') },
    { key: 'country', label: ui('admin', 'colCountry') },
    { key: 'technologies', label: ui('admin', 'colSkills'), wide: true },
    { key: 'hourly_rate', label: ui('admin', 'colSalary') },
    { key: 'monthly_availability', label: ui('admin', 'colAvailability') },
    { key: 'portfolio', label: ui('admin', 'colPortfolio') },
    { key: 'linkedin', label: ui('admin', 'colLinkedin') },
    { key: 'github', label: ui('admin', 'colGithub') },
  ], [ui])

  const getColumns = (t: Tab) => {
    switch (t) {
      case 'leads': return leadColumns
      case 'contacts': return contactColumns
      case 'careers': return careerColumns
      case 'freelancers': return freelancerColumns
    }
  }

  const getSheetName = (t: Tab) => {
    switch (t) {
      case 'leads': return ui('admin', 'sheetLeads')
      case 'contacts': return ui('admin', 'sheetContacts')
      case 'careers': return ui('admin', 'sheetCareers')
      case 'freelancers': return ui('admin', 'sheetFreelancers')
    }
  }

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

  const handleExportCurrent = () => {
    const cols = getColumns(tab)
    const name = getSheetName(tab)
    exportSheetToExcel(rows, cols, name, `${ui('admin', 'fileAll')}-${tab}.xlsx`)
  }

  const handleExportAll = async () => {
    setExporting(true)
    try {
      const [leads, contacts, careers, freelancers] = await Promise.all([
        fetchLeads(), fetchContacts(), fetchCareers(), fetchFreelancers(),
      ])
      exportWorkbookToExcel([
        { name: ui('admin', 'sheetLeads'), rows: leads, columns: leadColumns },
        { name: ui('admin', 'sheetContacts'), rows: contacts, columns: contactColumns },
        { name: ui('admin', 'sheetCareers'), rows: careers, columns: careerColumns },
        { name: ui('admin', 'sheetFreelancers'), rows: freelancers, columns: freelancerColumns },
      ], `${ui('admin', 'fileAll')}-all.xlsx`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setExporting(false)
    }
  }

  if (!authed) {
    return (
      <div dir={dir} className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
        <SEO title={ui('admin', 'title')} description={ui('admin', 'subtitle')} path="/admin" />
        <div className="absolute top-4 end-4">
          <LanguageSwitcher />
        </div>
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
              <h1 className="text-xl font-bold">{ui('admin', 'title')}</h1>
              <p className="text-sm text-white/50">{ui('admin', 'subtitle')}</p>
            </div>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={ui('admin', 'password')}
            className="input-premium mb-4"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-mint-600 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? ui('admin', 'signingIn') : ui('admin', 'signIn')}
          </button>
        </motion.form>
      </div>
    )
  }

  const statCards = [
    ['leads', ui('admin', 'tabLeads'), stats?.leads],
    ['contacts', ui('admin', 'tabContacts'), stats?.contacts],
    ['careers', ui('admin', 'tabCareers'), stats?.careers],
    ['freelancers', ui('admin', 'tabFreelancers'), stats?.freelancers],
  ] as const

  return (
    <div dir={dir} className="min-h-screen bg-dark-950">
      <SEO title={ui('admin', 'dashboard')} description={ui('admin', 'subtitle')} path="/admin" />
      <header className="border-b border-white/10 glass-strong sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-brand-300" />
            <h1 className="font-bold text-lg">{ui('admin', 'dashboard')}</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <LanguageSwitcher />
            <button
              onClick={handleExportAll}
              disabled={exporting}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/10 text-sm text-mint-300 hover:text-mint-200 transition-colors disabled:opacity-50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              {ui('admin', 'exportAll')}
            </button>
            <button
              onClick={handleExportCurrent}
              disabled={rows.length === 0}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/10 text-sm text-brand-300 transition-colors disabled:opacity-50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              {ui('admin', 'exportExcel')}
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg glass hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title={ui('admin', 'refresh')}
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 text-sm text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {ui('admin', 'logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map(([id, label, count]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  'glass-premium rounded-xl p-4 text-start transition-all',
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

        <DataTable
          rows={rows}
          columns={getColumns(tab)}
          emptyText={ui('admin', 'noData')}
          dir={dir}
          locale={locale}
        />

        {(tab === 'careers' || tab === 'freelancers') && rows.some((r) => r.resume_path) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {rows.filter((r) => r.resume_path).map((r) => (
              <button
                key={String(r.id)}
                onClick={() => downloadFile(tab, r.id as number, `cv-${r.full_name}.pdf`)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm text-brand-300 hover:bg-brand-500/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                {ui('admin', 'downloadCv')}: {String(r.full_name)}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
