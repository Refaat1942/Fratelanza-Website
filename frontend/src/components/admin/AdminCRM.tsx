import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchCrmOverview, fetchLeads, fetchLeadDetail, updateLead,
  fetchSourceReport, fetchProjectTypeReport, fetchBudgetReport,
  fetchFollowUps, fetchEventFunnel, type CrmOverview, type LeadRow,
} from '@/lib/adminApi'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

const PIPELINE = ['NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST', 'NOT_QUALIFIED']

function fmtMoney(n: number) {
  return n ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '—'
}

function weighted(lead: LeadRow) {
  const v = Number(lead.estimated_value) || 0
  const p = Number(lead.probability_pct) || 0
  return v * p / 100
}

export function AdminDashboard() {
  const { ui } = useTranslation()
  const [crm, setCrm] = useState<CrmOverview | null>(null)
  const [funnel, setFunnel] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    fetchCrmOverview().then(setCrm).catch(() => {})
    fetchEventFunnel().then(setFunnel).catch(() => {})
  }, [])

  if (!crm) return <p className="text-body-subtle text-sm">{ui('admin', 'loading')}</p>

  const cards = [
    [ui('admin', 'totalLeads'), crm.totalLeads],
    [ui('admin', 'newLeads'), crm.byStatus.NEW || 0],
    [ui('admin', 'qualifiedLeads'), crm.qualified],
    [ui('admin', 'proposals'), crm.proposals],
    [ui('admin', 'won'), crm.won],
    [ui('admin', 'lost'), crm.lost],
    [ui('admin', 'totalPipeline'), fmtMoney(crm.totalPipeline)],
    [ui('admin', 'weightedPipeline'), fmtMoney(crm.weightedPipeline)],
    [ui('admin', 'wonRevenue'), fmtMoney(crm.wonRevenue)],
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map(([label, val]) => (
          <div key={String(label)} className="glass-premium rounded-xl p-4 border border-slate-200">
            <p className="text-xs font-semibold uppercase text-body-subtle">{label}</p>
            <p className="text-2xl font-bold text-gradient-brand mt-1">{val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-premium rounded-xl p-4 border border-slate-200">
          <p className="text-sm font-bold mb-3">{ui('admin', 'conversion')}</p>
          <ul className="text-sm space-y-2 text-body-muted">
            <li>{ui('admin', 'visitorToLead')}: {crm.conversion.visitorToLead ?? '—'}%</li>
            <li>{ui('admin', 'leadToQualified')}: {crm.conversion.leadToQualified ?? '—'}%</li>
            <li>{ui('admin', 'qualifiedToProposal')}: {crm.conversion.qualifiedToProposal ?? '—'}%</li>
            <li>{ui('admin', 'proposalToWon')}: {crm.conversion.proposalToWon ?? '—'}%</li>
          </ul>
        </div>
        <div className="glass-premium rounded-xl p-4 border border-slate-200">
          <p className="text-sm font-bold mb-3">{ui('admin', 'followUps')}</p>
          <ul className="text-sm space-y-2">
            <li>{ui('admin', 'dueToday')}: <strong>{crm.followUps.dueToday}</strong></li>
            <li className="text-red-600">{ui('admin', 'overdue')}: <strong>{crm.followUps.overdue}</strong></li>
            <li>{ui('admin', 'upcoming7d')}: <strong>{crm.followUps.upcoming7d}</strong></li>
          </ul>
        </div>
      </div>

      {funnel && (
        <div className="glass-premium rounded-xl p-4 border border-slate-200 text-sm text-body-muted">
          <p className="font-bold text-ink mb-2">{ui('admin', 'eventFunnel')}</p>
          <p>{ui('admin', 'formStarted')}: {String(funnel.formStarted ?? 0)} · {ui('admin', 'formCompleted')}: {String(funnel.formCompleted ?? 0)}</p>
        </div>
      )}
    </div>
  )
}

export function AdminPipeline() {
  const [leads, setLeads] = useState<LeadRow[]>([])

  const load = useCallback(() => { fetchLeads().then(setLeads).catch(() => {}) }, [])
  useEffect(() => { load() }, [load])

  const byStatus = useMemo(() => {
    const map: Record<string, LeadRow[]> = {}
    for (const s of PIPELINE) map[s] = []
    for (const l of leads) {
      const st = String(l.status || 'NEW')
      if (!map[st]) map[st] = []
      map[st].push(l)
    }
    return map
  }, [leads])

  const move = async (id: number, status: string) => {
    await updateLead(id, { status })
    load()
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3 min-w-max">
        {PIPELINE.filter((s) => s !== 'NOT_QUALIFIED').map((status) => (
          <div key={status} className="w-56 shrink-0">
            <p className="text-xs font-bold uppercase text-brand-800 mb-2 px-1">{status} ({byStatus[status]?.length || 0})</p>
            <div className="space-y-2 min-h-[120px] bg-slate-50/80 rounded-xl p-2 border border-slate-200">
              {(byStatus[status] || []).map((lead) => (
                <div key={String(lead.id)} className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm text-xs">
                  <p className="font-bold truncate">{String(lead.company_name)}</p>
                  <p className="text-body-subtle truncate">{String(lead.contact_person || lead.email)}</p>
                  <p className="text-brand-700 mt-1">{fmtMoney(Number(lead.estimated_value) || 0)}</p>
                  <select
                    className="mt-2 w-full text-[10px] border rounded p-1"
                    value={String(lead.status || 'NEW')}
                    onChange={(e) => move(Number(lead.id), e.target.value)}
                  >
                    {PIPELINE.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminLeadsCRM() {
  const { ui } = useTranslation()
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [detail, setDetail] = useState<Awaited<ReturnType<typeof fetchLeadDetail>> | null>(null)
  const [search, setSearch] = useState('')

  const load = useCallback(() => { fetchLeads().then(setLeads).catch(() => {}) }, [])
  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (selected) fetchLeadDetail(selected).then(setDetail).catch(() => setDetail(null))
    else setDetail(null)
  }, [selected])

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase()
    return !q || String(l.company_name).toLowerCase().includes(q) || String(l.email).toLowerCase().includes(q)
  })

  const save = async (patch: Record<string, unknown>) => {
    if (!selected) return
    await updateLead(selected, patch)
    fetchLeadDetail(selected).then(setDetail)
    load()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <input className="input-premium mb-4" placeholder={ui('admin', 'searchLeads')} value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="max-h-[60vh] overflow-y-auto space-y-2">
          {filtered.map((l) => (
            <button
              key={String(l.id)}
              type="button"
              onClick={() => setSelected(Number(l.id))}
              className={cn('w-full text-start p-3 rounded-xl border transition-all', selected === l.id ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:bg-slate-50')}
            >
              <div className="flex justify-between gap-2">
                <span className="font-semibold text-sm">{String(l.company_name)}</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">{String(l.status || 'NEW')}</span>
              </div>
              <p className="text-xs text-body-subtle mt-1">{String(l.project_type || l.interested_product || '—')} · {String(l.priority || l.lead_score || '')}</p>
            </button>
          ))}
        </div>
      </div>

      {detail && (
        <div className="glass-premium rounded-xl p-5 border border-slate-200 space-y-4 max-h-[70vh] overflow-y-auto text-sm">
          <h3 className="font-bold text-lg">{String(detail.lead.company_name)}</h3>

          <div>
            <p className="text-xs font-bold uppercase text-body-subtle mb-2">{ui('admin', 'sectionIdentity')}</p>
            <p>{String(detail.lead.contact_person)} · {String(detail.lead.email)}</p>
            <p>{String(detail.lead.whatsapp || '')} · {String(detail.lead.country || '')}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase text-body-subtle mb-2">{ui('admin', 'sectionProject')}</p>
            <p>{ui('admin', 'colProject')}: {String(detail.lead.project_type || detail.lead.interested_product || '—')}</p>
            <p>{ui('admin', 'projectStage')}: {String(detail.lead.project_stage || '—')}</p>
            <p>{ui('admin', 'budget')}: {String(detail.lead.estimated_budget || '—')}</p>
            <p className="mt-1 text-body-muted">{String(detail.lead.message || '')}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase text-body-subtle mb-2">{ui('admin', 'sectionMarketing')}</p>
            <p>{ui('admin', 'source')}: {String(detail.lead.first_source || detail.lead.source || '—')}</p>
            <p>UTM: {String(detail.lead.utm_source || '—')} / {String(detail.lead.utm_medium || '—')}</p>
            <p>{ui('admin', 'landingPage')}: {String(detail.lead.landing_page || '—')}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs">{ui('admin', 'status')}
              <select className="input-premium mt-1" value={String(detail.lead.status || 'NEW')} onChange={(e) => save({ status: e.target.value })}>
                {PIPELINE.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="text-xs">{ui('admin', 'estimatedValue')}
              <input type="number" className="input-premium mt-1" value={Number(detail.lead.estimated_value) || ''} onChange={(e) => save({ estimatedValue: Number(e.target.value) })} />
            </label>
            <label className="text-xs">{ui('admin', 'probability')}
              <input type="number" min={0} max={100} className="input-premium mt-1" value={Number(detail.lead.probability_pct) || ''} onChange={(e) => save({ probabilityPct: Number(e.target.value) })} />
            </label>
            <label className="text-xs">{ui('admin', 'weightedValue')}
              <input readOnly className="input-premium mt-1 bg-slate-50" value={fmtMoney(weighted(detail.lead))} />
            </label>
            <label className="text-xs col-span-2">{ui('admin', 'nextFollowUp')}
              <input type="datetime-local" className="input-premium mt-1" value={String(detail.lead.next_follow_up_at || '').slice(0, 16)} onChange={(e) => save({ nextFollowUpAt: e.target.value })} />
            </label>
            <label className="text-xs col-span-2">{ui('admin', 'notes')}
              <textarea className="input-premium mt-1" rows={3} value={String(detail.lead.notes || '')} onChange={(e) => save({ notes: e.target.value })} />
            </label>
          </div>

          <div>
            <p className="text-xs font-bold uppercase text-body-subtle mb-2">{ui('admin', 'activity')}</p>
            <ul className="space-y-1 text-xs text-body-muted">
              {detail.activities.map((a) => (
                <li key={a.id}>{a.created_at}: {a.description}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export function AdminFollowUps() {
  const { ui } = useTranslation()
  const [filter, setFilter] = useState<'today' | 'overdue' | 'upcoming'>('today')
  const [rows, setRows] = useState<LeadRow[]>([])

  useEffect(() => {
    fetchFollowUps(filter).then(setRows).catch(() => setRows([]))
  }, [filter])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['today', 'overdue', 'upcoming'] as const).map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} className={cn('px-4 py-2 rounded-full text-sm font-semibold', filter === f ? 'bg-brand-700 text-white' : 'bg-white border border-slate-200')}>
            {ui('admin', f === 'today' ? 'dueToday' : f === 'overdue' ? 'overdue' : 'upcoming7d')}
          </button>
        ))}
      </div>
      {rows.length === 0 ? <p className="text-body-subtle">{ui('admin', 'noFollowUps')}</p> : (
        <ul className="space-y-2">
          {rows.map((l) => (
            <li key={String(l.id)} className="p-3 rounded-xl border border-slate-200 bg-white text-sm">
              <strong>{String(l.company_name)}</strong> — {String(l.next_follow_up_at)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function AdminReports() {
  const { ui } = useTranslation()
  const [sources, setSources] = useState<Record<string, unknown>[]>([])
  const [types, setTypes] = useState<Record<string, unknown>[]>([])
  const [budgets, setBudgets] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    fetchSourceReport().then(setSources).catch(() => {})
    fetchProjectTypeReport().then(setTypes).catch(() => {})
    fetchBudgetReport().then(setBudgets).catch(() => {})
  }, [])

  const table = (title: string, rows: Record<string, unknown>[], keyField: string) => (
    <div className="glass-premium rounded-xl p-4 border border-slate-200 overflow-x-auto mb-6">
      <p className="font-bold mb-3">{title}</p>
      {rows.length === 0 ? <p className="text-sm text-body-subtle">{ui('admin', 'insufficientData')}</p> : (
        <table className="w-full text-xs">
          <thead><tr className="text-left border-b"><th className="pb-2">{keyField}</th><th className="pb-2">Leads</th><th className="pb-2">Qual.</th><th className="pb-2">Prop.</th><th className="pb-2">Won</th><th className="pb-2">Rev.</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="py-2 font-semibold">{String(r[keyField] || r.source || r.project_type || r.budget_range)}</td>
                <td className="py-2">{String(r.leads)}</td>
                <td className="py-2">{String(r.qualified)}</td>
                <td className="py-2">{String(r.proposals)}</td>
                <td className="py-2">{String(r.won)}</td>
                <td className="py-2">{fmtMoney(Number(r.revenue) || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )

  return (
    <div>
      {table(ui('admin', 'sourceReport'), sources, 'source')}
      {table(ui('admin', 'serviceDemand'), types, 'project_type')}
      {table(ui('admin', 'budgetReport'), budgets, 'budget_range')}
    </div>
  )
}
