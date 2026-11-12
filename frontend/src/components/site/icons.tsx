import {
  Search, Network, Workflow, Receipt, PackageCheck, Handshake, FileText, BookOpen, GraduationCap, Store, Building2,
  Server, Rocket, KeyRound, CodeXml, UserCheck, Users, ChartColumn, Smartphone, Bot, LayoutDashboard, Puzzle,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  Search, Network, Workflow, Receipt, PackageCheck, Handshake, FileText, BookOpen, GraduationCap, Store, Building2,
  Server, Rocket, KeyRound, CodeXml, UserCheck, Users, ChartColumn, Smartphone, Bot, LayoutDashboard, Puzzle,
}

export function SiteIcon({ name, className }: { name: string; className?: string }) {
  const I = map[name] ?? Puzzle
  return <I className={className} aria-hidden="true" />
}
