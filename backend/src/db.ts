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
`)

console.log(`Database initialized at ${dbPath}`)
