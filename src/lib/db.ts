import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import brand from "@/config/brand";

// ----------------------------------------------------------------------------
// Storage layer.
//
// This template uses Node's built-in `node:sqlite` module (stable since
// Node 22.5+) so the project runs with zero native/compiled dependencies —
// no build toolchain required, which matters if you're deploying to
// environments that can't compile native addons.
//
// For production multi-tenant use, or if you need concurrent writes at
// scale, swap this file for Prisma/Drizzle against Postgres — every caller
// in the app only imports the functions below, so that's a one-file change.
// ----------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, `${brand.slug}.db`);

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (db) return db;
  db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  migrate(db);
  return db;
}

function migrate(database: DatabaseSync) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      duration_minutes INTEGER NOT NULL,
      price_cents INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      service_id TEXT NOT NULL REFERENCES services(id),
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_start_time ON bookings(start_time);
    CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
  `);
}

// ---- Types -----------------------------------------------------------------

export interface ServiceRow {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price_cents: number;
  active: number;
}

export interface BookingRow {
  id: string;
  service_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
}

// ---- Services ----------------------------------------------------------------

export function listActiveServices(): ServiceRow[] {
  const database = getDb();
  return database
    .prepare("SELECT * FROM services WHERE active = 1 ORDER BY name ASC")
    .all() as unknown as ServiceRow[];
}

export function getServiceById(id: string): ServiceRow | undefined {
  const database = getDb();
  return database.prepare("SELECT * FROM services WHERE id = ?").get(id) as unknown as
    | ServiceRow
    | undefined;
}

export function upsertService(service: {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
}) {
  const database = getDb();
  database
    .prepare(
      `INSERT INTO services (id, name, description, duration_minutes, price_cents, active)
       VALUES (?, ?, ?, ?, ?, 1)
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         description = excluded.description,
         duration_minutes = excluded.duration_minutes,
         price_cents = excluded.price_cents,
         active = 1`
    )
    .run(
      service.id,
      service.name,
      service.description,
      service.durationMinutes,
      service.priceCents
    );
}

// ---- Bookings ----------------------------------------------------------------

export function listBookingsBetween(startISO: string, endISO: string): BookingRow[] {
  const database = getDb();
  return database
    .prepare(
      `SELECT * FROM bookings
       WHERE status != 'cancelled'
         AND start_time < ? AND end_time > ?
       ORDER BY start_time ASC`
    )
    .all(endISO, startISO) as unknown as BookingRow[];
}

export function listUpcomingBookings(limit = 200): BookingRow[] {
  const database = getDb();
  return database
    .prepare(
      `SELECT * FROM bookings
       WHERE status != 'cancelled'
       ORDER BY start_time ASC
       LIMIT ?`
    )
    .all(limit) as unknown as BookingRow[];
}

export function createBooking(booking: {
  id: string;
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  startISO: string;
  endISO: string;
}): BookingRow {
  const database = getDb();
  const now = new Date().toISOString();
  database
    .prepare(
      `INSERT INTO bookings
        (id, service_id, customer_name, customer_email, customer_phone, notes, start_time, end_time, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)`
    )
    .run(
      booking.id,
      booking.serviceId,
      booking.customerName,
      booking.customerEmail,
      booking.customerPhone,
      booking.notes,
      booking.startISO,
      booking.endISO,
      now
    );
  return database.prepare("SELECT * FROM bookings WHERE id = ?").get(booking.id) as unknown as BookingRow;
}

export function getBookingById(id: string): BookingRow | undefined {
  const database = getDb();
  return database.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as unknown as
    | BookingRow
    | undefined;
}
