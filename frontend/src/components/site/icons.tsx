import {
  Puzzle, Layers, KeyRound, Store, Building2, Server, Rocket, MessageCircle, Ruler, CodeXml, Pill, FlaskConical,
  Stethoscope, ShoppingCart, LayoutDashboard, Users, UserCheck, Megaphone, Bot, Terminal, Shield, Factory, GraduationCap,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  Puzzle, Layers, KeyRound, Store, Building2, Server, Rocket, MessageCircle, Ruler, CodeXml, Pill, FlaskConical,
  Stethoscope, ShoppingCart, LayoutDashboard, Users, UserCheck, Megaphone, Bot, Terminal, Shield, Factory, GraduationCap,
}

export function SiteIcon({ name, className }: { name: string; className?: string }) {
  const I = map[name] ?? Puzzle
  return <I className={className} aria-hidden="true" />
}
