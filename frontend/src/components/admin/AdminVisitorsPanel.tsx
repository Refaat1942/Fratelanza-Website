import { useCallback, useEffect, useMemo, useState } from 'react'
import { Download, Eye } from 'lucide-react'
import {
  fetchDailyAnalytics,
  fetchVisitorLog,
  type DailyAnalytics,
  type VisitorLogRow,
} from '@/lib/adminApi'
import { exportWorkbookToExcel } from '@/lib/exportExcel'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

type Preset = 'today' | '7d' | '30d' | 'custom'

function formatDateInput(d: Date) {
  return d.toISOString().slice(0, 10)
}

function rangeForPreset(preset: Preset): { from: string; to: string } {
  const today = formatDateInput(new Date())
  if (preset === 'today') return { from: today, to: today }
  if (preset === '7d') {
    const from = formatDateInput(new Date(Date.now() - 6 * 86400000))
    return { from, to: today }
  }
  if (preset === '30d') {
    const from = formatDateInput(new Date(Date.now() - 29 * 86400000))
    return { from, to: today }
  }
  return { from: today, to: today }
}

function formatTime(d: string, locale: string) {
  try {
    return new Date(d.includes('T') ? d : `${d}Z`).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')
  } catch {
    return d
  }
}

export function AdminVisitorsPanel() {
  const { ui, locale } = useTranslation()
  const [preset, setPreset] = useState<Preset>('7d')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [daily, setDaily] = useState<DailyAnalytics | null>(null)
  const [visitors, setVisitors] = useState<VisitorLogRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const activeRange = useMemo(() => {
    if (preset === 'custom' && from && to) return { from, to }
    return rangeForPreset(preset)
  }, [preset, from, to])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [dailyData, visitorData] = await Promise.all([
        fetchDailyAnalytics(activeRange.from, activeRange.to),
        fetchVisitorLog(activeRange.from, activeRange.to),
      ])
      setDaily(dailyData)
      setVisitors(visitorData.rows)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [activeRange.from, activeRange.to])

  useEffect(() => {
    load()
  }, [load])

  const visitorColumns = useMemo(() => [
    { key: 'last_seen', label: ui('admin', 'colDate') },
    { key: 'ip_address', label: ui('admin', 'colIp') },
    { key: 'country', label: ui('admin', 'colCountry') },
    { key: 'device', label: ui('admin', 'colDevice') },
    { key: 'referrer', label: ui('admin', 'colReferrer') },
    { key: 'page_views', label: ui('admin', 'pageViews') },
    { key: 'pages', label: ui('admin', 'colPages'), wide: true },
  ], [ui])

  const dailyExportRows = useMemo(() =>
    (daily?.rows || []).map((r) => ({
      date: r.date,
      visitors: r.visitors,
      page_views: r.page_views,
    })),
  [daily])

  const visitorExportRows = useMemo(() =>
    visitors.map((r) => ({
      last_seen: formatTime(r.last_seen, locale),
      ip_address: r.ip_address,
      country: r.country,
      device: r.device,
      referrer: r.referrer,
      page_views: r.page_views,
      pages: r.pages,
    })),
  [visitors, locale])

  const handleExport = () => {
    exportWorkbookToExcel(
      [
        {
          name: ui('admin', 'dailyBreakdown'),
          rows: dailyExportRows,
          columns: [
            { key: 'date', label: ui('admin', 'colDate') },
            { key: 'visitors', label: ui('admin', 'visitors') },
            { key: 'page_views', label: ui('admin', 'pageViews') },
          ],
        },
        { name: ui('admin', 'visitorLog'), rows: visitorExportRows, columns: visitorColumns },
      ],
      `visitors-${activeRange.from}-${activeRange.to}.xlsx`,
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink font-display flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-700" />
            {ui('admin', 'visitorsReport')}
          </h2>
          <p className="text-sm text-body-subtle mt-1">{ui('admin', 'visitorsReportSub')}</p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          disabled={!daily?.rows.length && !visitors.length}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-brand-50 text-sm text-brand-800 shadow-sm disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {ui('admin', 'exportVisitors')}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 items-end">
        {(['today', '7d', '30d', 'custom'] as Preset[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPreset(p)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-all',
              preset === p
                ? 'bg-brand-700 text-white shadow-md'
                : 'bg-white text-brand-800 border border-slate-200 hover:bg-brand-50',
            )}
          >
            {ui('admin', p === 'today' ? 'filterToday' : p === '7d' ? 'filter7d' : p === '30d' ? 'filter30d' : 'filterCustom')}
          </button>
        ))}
        {preset === 'custom' && (
          <>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input-premium w-auto"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input-premium w-auto"
            />
            <button
              type="button"
              onClick={load}
              className="px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-semibold"
            >
              {ui('admin', 'applyFilter')}
            </button>
          </>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading && <p className="text-body-subtle text-sm">{ui('admin', 'loadingVisitors')}</p>}

      {daily && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-premium rounded-xl p-4 border border-brand-200/60">
            <p className="text-xs font-semibold uppercase text-brand-700">{ui('admin', 'rangeVisitors')}</p>
            <p className="text-3xl font-bold text-gradient-brand mt-1">{daily.totals.visitors}</p>
            <p className="text-xs text-body-subtle mt-1">{activeRange.from} → {activeRange.to}</p>
          </div>
          <div className="glass-premium rounded-xl p-4 border border-brand-200/60">
            <p className="text-xs font-semibold uppercase text-brand-700">{ui('admin', 'rangePageViews')}</p>
            <p className="text-3xl font-bold text-gradient-brand mt-1">{daily.totals.page_views}</p>
          </div>
        </div>
      )}

      {daily && daily.rows.length > 0 && (
        <div className="glass-premium rounded-xl p-4 border border-slate-200 overflow-x-auto">
          <p className="text-xs font-semibold uppercase text-body-subtle mb-3">{ui('admin', 'dailyBreakdown')}</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-body-subtle border-b border-slate-200">
                <th className="pb-2 pe-4">{ui('admin', 'colDate')}</th>
                <th className="pb-2 pe-4">{ui('admin', 'visitors')}</th>
                <th className="pb-2">{ui('admin', 'pageViews')}</th>
              </tr>
            </thead>
            <tbody>
              {daily.rows.map((row) => (
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

      <div className="glass-premium rounded-xl border border-slate-200 overflow-x-auto">
        <p className="text-xs font-semibold uppercase text-body-subtle p-4 pb-0">{ui('admin', 'visitorLog')}</p>
        <p className="text-xs text-body-subtle px-4 pb-3">{ui('admin', 'visitorLogSub')}</p>
        {visitors.length === 0 ? (
          <p className="text-body-subtle text-center py-12">{ui('admin', 'noVisitors')}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-brand-50/80">
                {visitorColumns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wider text-brand-800 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visitors.map((row) => (
                <tr key={row.visitor_hash} className="border-b border-slate-100 hover:bg-brand-50/40">
                  <td className="px-4 py-3 text-ink-muted whitespace-nowrap">{formatTime(row.last_seen, locale)}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.ip_address}</td>
                  <td className="px-4 py-3">{row.country}</td>
                  <td className="px-4 py-3">{row.device}</td>
                  <td className="px-4 py-3 max-w-[140px] truncate" title={row.referrer}>{row.referrer}</td>
                  <td className="px-4 py-3 font-semibold text-brand-800">{row.page_views}</td>
                  <td className="px-4 py-3 text-xs text-body-muted max-w-xs truncate" title={row.pages}>{row.pages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
