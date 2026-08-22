import Database from "better-sqlite3";
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  randomUUID,
} from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { pipelineStages, type EnquiryPayload, type EnquiryRecord, type EnquiryStatus, type PipelineStage } from "./enquiry-types";
export { enquiryStatuses } from "./enquiry-types";
export type { EnquiryPayload, EnquiryRecord, EnquiryStatus } from "./enquiry-types";

type Row = {
  id: string;
  received_at: string;
  updated_at: string;
  status: EnquiryStatus;
  source: string;
  payload: string;
};

const globalDatabase = globalThis as typeof globalThis & {
  __cinemDatabase?: Database.Database;
};

function databasePath() {
  return process.env.CINEM_DB_PATH || path.join(process.cwd(), "data", "cinem.sqlite");
}

function getDatabase() {
  if (globalDatabase.__cinemDatabase) return globalDatabase.__cinemDatabase;
  const file = databasePath();
  mkdirSync(path.dirname(file), { recursive: true });
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");
  db.pragma("foreign_keys = ON");
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      received_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
        CHECK(status IN ('new','contacted','qualified','won','closed','archived')),
      source TEXT NOT NULL DEFAULT 'website',
      payload TEXT NOT NULL,
      ip_hash TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS enquiries_received_idx ON enquiries(received_at DESC);
    CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries(status);
  `);
  globalDatabase.__cinemDatabase = db;
  return db;
}

function encryptionKey() {
  const encoded = process.env.ENQUIRY_ENCRYPTION_KEY;
  if (!encoded) throw new Error("ENQUIRY_ENCRYPTION_KEY is not configured.");
  const key = Buffer.from(encoded, "base64");
  if (key.length !== 32) {
    throw new Error("ENQUIRY_ENCRYPTION_KEY must decode to exactly 32 bytes.");
  }
  return key;
}

function encrypt(value: EnquiryPayload) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  return [
    "v1",
    iv.toString("base64url"),
    cipher.getAuthTag().toString("base64url"),
    ciphertext.toString("base64url"),
  ].join(".");
}

function decrypt(value: string): EnquiryPayload {
  const [version, iv, tag, ciphertext] = value.split(".");
  if (version !== "v1" || !iv || !tag || !ciphertext) {
    throw new Error("Encrypted enquiry payload is invalid.");
  }
  const decipher = createDecipheriv(
    "aes-256-gcm",
    encryptionKey(),
    Buffer.from(iv, "base64url"),
  );
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return JSON.parse(
    Buffer.concat([
      decipher.update(Buffer.from(ciphertext, "base64url")),
      decipher.final(),
    ]).toString("utf8"),
  ) as EnquiryPayload;
}

function mapRow(row: Row): EnquiryRecord {
  const payload = decrypt(row.payload);
  return {
    id: row.id,
    receivedAt: row.received_at,
    updatedAt: row.updated_at,
    status: row.status,
    source: row.source,
    ...payload,
    pipelineStage: payload.pipelineStage || (row.source === "whatsapp" ? "whatsapp_lead" : "contacted"),
  };
}

export function createEnquiry(
  payload: Omit<EnquiryPayload, "notes" | "pipelineStage"> & { pipelineStage?: PipelineStage },
  identity: string,
  source = "website",
) {
  const db = getDatabase();
  const id = `enq_${randomUUID()}`;
  const now = new Date().toISOString();
  const ipHash = createHmac("sha256", process.env.ADMIN_SESSION_SECRET || "cinem")
    .update(identity)
    .digest("hex");
  db.prepare(
    `INSERT INTO enquiries (id, received_at, updated_at, status, source, payload, ip_hash)
     VALUES (?, ?, ?, 'new', ?, ?, ?)`,
  ).run(id, now, now, source, encrypt({ ...payload, pipelineStage: payload.pipelineStage || (source === "whatsapp" ? "whatsapp_lead" : "contacted"), notes: "" }), ipHash);
  return id;
}

export function listEnquiries() {
  const rows = getDatabase()
    .prepare("SELECT id, received_at, updated_at, status, source, payload FROM enquiries ORDER BY received_at DESC")
    .all() as Row[];
  return rows.map(mapRow);
}

export function updateEnquiry(
  id: string,
  update: { status?: EnquiryStatus; notes?: string; pipelineStage?: PipelineStage },
) {
  const db = getDatabase();
  const row = db
    .prepare("SELECT id, received_at, updated_at, status, source, payload FROM enquiries WHERE id = ?")
    .get(id) as Row | undefined;
  if (!row) return null;

  const current = decrypt(row.payload);
  const status = update.status ?? row.status;
  const notes = update.notes === undefined ? current.notes : update.notes.slice(0, 5_000);
  const updatedAt = new Date().toISOString();
  const pipelineStage = update.pipelineStage && pipelineStages.includes(update.pipelineStage) ? update.pipelineStage : current.pipelineStage || "contacted";
  const encryptedPayload = encrypt({ ...current, pipelineStage, notes });
  db.prepare("UPDATE enquiries SET status = ?, updated_at = ?, payload = ? WHERE id = ?")
    .run(status, updatedAt, encryptedPayload, id);

  return mapRow({ ...row, status, updated_at: updatedAt, payload: encryptedPayload });
}

export function enquirySummary(records: EnquiryRecord[]) {
  const active = records.filter((item) => !["closed", "archived"].includes(item.status));
  return {
    total: records.length,
    new: records.filter((item) => item.status === "new").length,
    active: active.length,
    won: records.filter((item) => item.status === "won").length,
  };
}
