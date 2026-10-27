// Per-item accent colours so cards and categories are not all the same navy/gold.
export const accents = [
  { tile: 'bg-gradient-to-br from-sky-500 to-cyan-400', hover: 'hover:ring-sky-400 hover:shadow-sky-500/20', text: 'text-sky-600', chip: 'bg-sky-50 text-sky-700 ring-sky-200', bar: 'from-sky-500 to-cyan-400' },
  { tile: 'bg-gradient-to-br from-violet-600 to-fuchsia-400', hover: 'hover:ring-violet-400 hover:shadow-violet-500/20', text: 'text-violet-600', chip: 'bg-violet-50 text-violet-700 ring-violet-200', bar: 'from-violet-600 to-fuchsia-400' },
  { tile: 'bg-gradient-to-br from-emerald-500 to-teal-400', hover: 'hover:ring-emerald-400 hover:shadow-emerald-500/20', text: 'text-emerald-600', chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200', bar: 'from-emerald-500 to-teal-400' },
  { tile: 'bg-gradient-to-br from-amber-500 to-orange-400', hover: 'hover:ring-amber-400 hover:shadow-amber-500/20', text: 'text-amber-600', chip: 'bg-amber-50 text-amber-700 ring-amber-200', bar: 'from-amber-500 to-orange-400' },
  { tile: 'bg-gradient-to-br from-rose-500 to-pink-400', hover: 'hover:ring-rose-400 hover:shadow-rose-500/20', text: 'text-rose-600', chip: 'bg-rose-50 text-rose-700 ring-rose-200', bar: 'from-rose-500 to-pink-400' },
  { tile: 'bg-gradient-to-br from-indigo-600 to-blue-400', hover: 'hover:ring-indigo-400 hover:shadow-indigo-500/20', text: 'text-indigo-600', chip: 'bg-indigo-50 text-indigo-700 ring-indigo-200', bar: 'from-indigo-600 to-blue-400' },
  { tile: 'bg-gradient-to-br from-teal-500 to-emerald-400', hover: 'hover:ring-teal-400 hover:shadow-teal-500/20', text: 'text-teal-600', chip: 'bg-teal-50 text-teal-700 ring-teal-200', bar: 'from-teal-500 to-emerald-400' },
  { tile: 'bg-gradient-to-br from-orange-500 to-amber-400', hover: 'hover:ring-orange-400 hover:shadow-orange-500/20', text: 'text-orange-600', chip: 'bg-orange-50 text-orange-700 ring-orange-200', bar: 'from-orange-500 to-amber-400' },
]
export const accent = (i: number) => accents[i % accents.length]

export const sectorAccent: Record<string, number> = { healthcare: 2, retail: 3, realestate: 1, business: 5, ai: 4 }
