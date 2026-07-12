import * as XLSX from 'xlsx'

type Column = { key: string; label: string }

function cellValue(row: Record<string, unknown>, key: string): string {
  const val = row[key]
  if (val === null || val === undefined) return ''
  return String(val)
}

export function exportSheetToExcel(
  rows: Record<string, unknown>[],
  columns: Column[],
  sheetName: string,
  filename: string,
) {
  const headers = columns.map((c) => c.label)
  const data = rows.map((row) =>
    columns.map((col) => cellValue(row, col.key)),
  )

  const ws = XLSX.utils.aoa_to_sheet([headers, ...data])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31))
  XLSX.writeFile(wb, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`)
}

export function exportWorkbookToExcel(
  sheets: { name: string; rows: Record<string, unknown>[]; columns: Column[] }[],
  filename: string,
) {
  const wb = XLSX.utils.book_new()

  for (const sheet of sheets) {
    const headers = sheet.columns.map((c) => c.label)
    const data = sheet.rows.map((row) =>
      sheet.columns.map((col) => cellValue(row, col.key)),
    )
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data])
    XLSX.utils.book_append_sheet(wb, ws, sheet.name.slice(0, 31))
  }

  XLSX.writeFile(wb, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`)
}
