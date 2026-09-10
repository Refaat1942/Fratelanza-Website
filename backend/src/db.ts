import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const dbPath = path.join(dataDir, 'fratelanza.db')
export const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    business_type TEXT,
    industry TEXT,
    country TEXT,
    city TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT NOT NULL,
    expected_users TEXT,
    interested_product TEXT,
    current_system TEXT,
    message TEXT,
    preferred_contact_time TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS careers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT,
    portfolio TEXT,
    github TEXT,
    linkedin TEXT,
    experience TEXT,
    availability TEXT,
    expected_salary TEXT,
    country TEXT,
    skills TEXT,
    resume_path TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS freelancers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    specialization TEXT,
    years_experience TEXT,
    portfolio TEXT,
    linkedin TEXT,
    github TEXT,
    hourly_rate TEXT,
    monthly_availability TEXT,
    technologies TEXT,
    english_level TEXT,
    arabic_level TEXT,
    notes TEXT,
    resume_path TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_hash TEXT NOT NULL,
    path TEXT NOT NULL,
    visit_date TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(visit_date);
  CREATE INDEX IF NOT EXISTS idx_page_views_hash_date ON page_views(visitor_hash, visit_date);
`)

const pageViewColumns = ['ip_address', 'country', 'referrer', 'device', 'user_agent'] as const
for (const col of pageViewColumns) {
  try {
    db.exec(`ALTER TABLE page_views ADD COLUMN ${col} TEXT`)
  } catch {
    // column already exists
  }
}

const leadColumns: [string, string][] = [
  ['project_type', 'TEXT'],
  ['project_stage', 'TEXT'],
  ['estimated_budget', 'TEXT'],
  ['desired_timeline', 'TEXT'],
  ['existing_website', 'TEXT'],
  ['existing_system', 'TEXT'],
  ['attachment_path', 'TEXT'],
  ['source', 'TEXT'],
  ['first_source', 'TEXT'],
  ['last_source', 'TEXT'],
  ['utm_source', 'TEXT'],
  ['utm_medium', 'TEXT'],
  ['utm_campaign', 'TEXT'],
  ['utm_content', 'TEXT'],
  ['landing_page', 'TEXT'],
  ['referrer_url', 'TEXT'],
  ['device_type', 'TEXT'],
  ['visitor_country', 'TEXT'],
  ['first_visit_at', 'TEXT'],
  ['conversion_page', 'TEXT'],
  ['status', "TEXT DEFAULT 'NEW'"],
  ['priority', 'TEXT'],
  ['lead_score', 'INTEGER'],
  ['assigned_to', 'TEXT'],
  ['estimated_value', 'REAL'],
  ['probability_pct', 'INTEGER'],
  ['won_revenue', 'REAL'],
  ['last_contact_at', 'TEXT'],
  ['next_follow_up_at', 'TEXT'],
  ['notes', 'TEXT'],
]
for (const [col, type] of leadColumns) {
  try {
    db.exec(`ALTER TABLE leads ADD COLUMN ${col} ${type}`)
  } catch {
    // column already exists
  }
}

db.exec(`
  CREATE TABLE IF NOT EXISTS lead_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata_json TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS lead_status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    from_status TEXT,
    to_status TEXT NOT NULL,
    changed_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    path TEXT,
    metadata_json TEXT,
    visitor_hash TEXT,
    session_id TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
  CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON leads(next_follow_up_at);
  CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
  CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id);
`)

console.log(`Database initialized at ${dbPath}`)
