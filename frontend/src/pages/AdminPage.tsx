import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Lock, LogOut, Download, RefreshCw, Users, Mail, Briefcase, UserPlus, FileText, FileSpreadsheet, Eye, BarChart3 } from 'lucide-react'
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
    return <p className="text-body-subtle text-center py-12">{emptyText}</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white" dir={dir}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-brand-50/80">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wider text-brand-800 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-brand-50/40 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-ink-muted text-start', col.wide && 'max-w-xs truncate')}>
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
      <div dir={dir} className="min-h-screen flex items-center justify-center bg-surface px-4">
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
              <Lock className="w-5 h-5 text-brand-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink">{ui('admin', 'title')}</h1>
              <p className="text-sm text-body-subtle">{ui('admin', 'subtitle')}</p>
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-700 to-mint-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
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
    <div dir={dir} className="min-h-screen bg-surface">
      <SEO title={ui('admin', 'dashboard')} description={ui('admin', 'subtitle')} path="/admin" />
      <header className="border-b border-slate-200 glass-strong sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-brand-700" />
            <h1 className="font-bold text-lg text-ink">{ui('admin', 'dashboard')}</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <LanguageSwitcher />
            <button
              onClick={handleExportAll}
              disabled={exporting}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-brand-50 text-sm text-brand-800 hover:text-brand-900 transition-colors disabled:opacity-50 shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              {ui('admin', 'exportAll')}
            </button>
            <button
              onClick={handleExportCurrent}
              disabled={rows.length === 0}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-brand-50 text-sm text-brand-800 transition-colors disabled:opacity-50 shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              {ui('admin', 'exportExcel')}
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-brand-50 text-ink-muted hover:text-brand-800 transition-colors shadow-sm"
              title={ui('admin', 'refresh')}
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-red-50 text-sm text-ink-muted hover:text-red-700 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              {ui('admin', 'logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {stats && (
          <>
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-800 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {ui('admin', 'visitorsTitle')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="glass-premium rounded-xl p-4 border border-brand-200/60">
                  <div className="flex items-center gap-2 text-brand-700 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase">{ui('admin', 'todayVisitors')}</span>
                  </div>
                  <div className="text-3xl font-bold text-gradient-brand">{stats.todayVisitors}</div>
                </div>
                <div className="glass-premium rounded-xl p-4 border border-brand-200/60">
                  <div className="text-xs font-semibold uppercase text-brand-700 mb-1">{ui('admin', 'todayPageViews')}</div>
                  <div className="text-3xl font-bold text-gradient-brand">{stats.todayPageViews}</div>
                </div>
                <div className="glass-premium rounded-xl p-4 border border-brand-200/60">
                  <div className="text-xs font-semibold uppercase text-brand-700 mb-1">{ui('admin', 'totalVisitors')}</div>
                  <div className="text-3xl font-bold text-gradient-brand">{stats.totalVisitors}</div>
                </div>
              </div>
              {stats.last7Days.length > 0 && (
                <div className="glass-premium rounded-xl p-4 border border-slate-200 overflow-x-auto">
                  <p className="text-xs font-semibold uppercase text-body-subtle mb-3">{ui('admin', 'last7Days')}</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-body-subtle border-b border-slate-200">
                        <th className="pb-2 pe-4">{ui('admin', 'colDate')}</th>
                        <th className="pb-2 pe-4">{ui('admin', 'visitors')}</th>
                        <th className="pb-2">{ui('admin', 'pageViews')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.last7Days.map((row) => (
                        <tr key={row.date} className="border-b border-slate-100 last:border-0">
                          <td className="py-2 pe-4 text-ink-muted">{row.date}</td>
                          <td className="py-2 pe-4 font-semibold text-brand-800">{row.visitors}</td>
                          <td className="py-2 text-ink-muted">{row.page_views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-800 mb-3">{ui('admin', 'submissionsTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map(([id, label, count]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  'glass-premium rounded-xl p-4 text-start transition-all',
                  tab === id && 'ring-2 ring-brand-400/50 bg-brand-50',
                )}
              >
                <div className="text-2xl font-bold text-gradient-brand">{count}</div>
                <div className="text-xs text-body-subtle mt-1">{label}</div>
              </button>
            ))}
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                tab === id
                  ? 'bg-brand-100 text-brand-800 border border-brand-400/50 shadow-sm'
                  : 'bg-white text-body-subtle border border-slate-200 hover:bg-brand-50 hover:text-brand-800',
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
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-brand-800 hover:bg-brand-50 transition-colors shadow-sm"
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
