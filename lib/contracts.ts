import Database from "better-sqlite3";
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { site } from "./site";

export type ContractStatus = "draft" | "shared";

export type ContractData = {
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  projectTitle: string;
  effectiveDate: string;
  validUntil: string;
  currency: string;
  totalFee: string;
  timeline: string;
  scope: string;
  deliverables: string;
  milestones: string;
  paymentSchedule: string;
  revisions: string;
  supportPeriod: string;
  clientResponsibilities: string;
  governingLaw: string;
  specialTerms: string;
};

export type ContractRecord = {
  id: string;
  enquiryId: string | null;
  shareToken: string;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
  data: ContractData;
};

export type ContractVersion = { id: number; contractId: string; version: number; createdAt: string; data: ContractData };
export type ContractFeedback = { id: number; type: "comment" | "changes_requested" | "approved"; name: string; email: string; message: string; createdAt: string; signatureName: string; documentVersion: number; documentHash: string };

const contractFields: Array<keyof ContractData> = [
  "clientName", "clientCompany", "clientEmail", "clientPhone", "clientAddress", "projectTitle",
  "effectiveDate", "validUntil", "currency", "totalFee", "timeline", "scope",
  "deliverables", "milestones", "paymentSchedule", "revisions", "supportPeriod",
  "clientResponsibilities", "governingLaw", "specialTerms",
];

type ContractRow = {
  id: string;
  enquiry_id: string | null;
  share_token: string;
  status: ContractStatus;
  created_at: string;
  updated_at: string;
  payload: string;
};

const globalContractDatabase = globalThis as typeof globalThis & { __cinemContractDatabase?: Database.Database };

function databasePath() {
  return process.env.CINEM_DB_PATH || path.join(process.cwd(), "data", "cinem.sqlite");
}

function database() {
  if (globalContractDatabase.__cinemContractDatabase) return globalContractDatabase.__cinemContractDatabase;
  const file = databasePath();
  mkdirSync(path.dirname(file), { recursive: true });
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS contracts (
      id TEXT PRIMARY KEY,
      enquiry_id TEXT,
      share_token TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','shared')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      payload TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS contracts_updated_idx ON contracts(updated_at DESC);
    CREATE INDEX IF NOT EXISTS contracts_enquiry_idx ON contracts(enquiry_id);
    CREATE TABLE IF NOT EXISTS contract_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contract_id TEXT NOT NULL,
      version_number INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      payload TEXT NOT NULL,
      UNIQUE(contract_id, version_number)
    );
    CREATE TABLE IF NOT EXISTS contract_feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contract_id TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('comment','changes_requested','approved')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    INSERT INTO contract_versions (contract_id, version_number, created_at, payload)
    SELECT c.id, 1, c.created_at, c.payload FROM contracts c
    WHERE NOT EXISTS (SELECT 1 FROM contract_versions v WHERE v.contract_id = c.id);
  `);
  const feedbackColumns = db.prepare("PRAGMA table_info(contract_feedback)").all() as Array<{ name: string }>;
  const existing = new Set(feedbackColumns.map((column) => column.name));
  if (!existing.has("signature_name")) db.exec("ALTER TABLE contract_feedback ADD COLUMN signature_name TEXT NOT NULL DEFAULT ''");
  if (!existing.has("document_version")) db.exec("ALTER TABLE contract_feedback ADD COLUMN document_version INTEGER NOT NULL DEFAULT 0");
  if (!existing.has("document_hash")) db.exec("ALTER TABLE contract_feedback ADD COLUMN document_hash TEXT NOT NULL DEFAULT ''");
  if (!existing.has("ip_hash")) db.exec("ALTER TABLE contract_feedback ADD COLUMN ip_hash TEXT NOT NULL DEFAULT ''");
  if (!existing.has("user_agent")) db.exec("ALTER TABLE contract_feedback ADD COLUMN user_agent TEXT NOT NULL DEFAULT ''");
  globalContractDatabase.__cinemContractDatabase = db;
  return db;
}

function encryptionKey() {
  const encoded = process.env.ENQUIRY_ENCRYPTION_KEY;
  if (!encoded) throw new Error("ENQUIRY_ENCRYPTION_KEY is not configured.");
  const key = Buffer.from(encoded, "base64");
  if (key.length !== 32) throw new Error("ENQUIRY_ENCRYPTION_KEY must decode to exactly 32 bytes.");
  return key;
}

function encrypt(data: ContractData) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  return ["v1", iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), body.toString("base64url")].join(".");
}

function decrypt(payload: string) {
  const [version, iv, tag, body] = payload.split(".");
  if (version !== "v1" || !iv || !tag || !body) throw new Error("Contract payload is invalid.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(body, "base64url")), decipher.final()]).toString("utf8")) as ContractData;
}

function mapRow(row: ContractRow): ContractRecord {
  return {
    id: row.id,
    enquiryId: row.enquiry_id,
    shareToken: row.share_token,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    data: normalizeData(decrypt(row.payload), defaultContractData()),
  };
}

export function defaultContractData(seed: Partial<ContractData> = {}): ContractData {
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + 14);
  return {
    clientName: "",
    clientCompany: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    projectTitle: "Digital Product Development Agreement",
    effectiveDate: today.toISOString().slice(0, 10),
    validUntil: validUntil.toISOString().slice(0, 10),
    currency: "USD",
    totalFee: "",
    timeline: "To be agreed after kickoff",
    scope: "Describe the product, target users, platforms, integrations and the exact boundary of work.",
    deliverables: "Design and approved source files\nProduction-ready implementation\nDeployment and handover walkthrough",
    milestones: "Discovery and scope confirmation\nDesign / working demo approval\nDevelopment and integrations\nQuality assurance, launch and handover",
    paymentSchedule: "50% when the agreed work reaches 50% completion\n50% at 100% completion before final production handover",
    revisions: "Two consolidated revision rounds per approved milestone",
    supportPeriod: "30 days of defect support after launch",
    clientResponsibilities: "Provide content, brand assets, credentials and consolidated feedback on time.",
    governingLaw: "To be confirmed for the client's jurisdiction",
    specialTerms: "",
    ...seed,
  };
}

function normalizeData(input: Partial<ContractData>, fallback: ContractData) {
  const normalized = { ...fallback };
  for (const field of contractFields) {
    const value = input[field];
    if (typeof value === "string") normalized[field] = value.trim().slice(0, 10_000);
  }
  return normalized;
}

export function createContract(enquiryId: string | null, seed: Partial<ContractData>) {
  const db = database();
  const id = `ctr_${randomUUID()}`;
  const now = new Date().toISOString();
  const shareToken = randomBytes(24).toString("base64url");
  const data = normalizeData(seed, defaultContractData());
  db.prepare("INSERT INTO contracts (id, enquiry_id, share_token, status, created_at, updated_at, payload) VALUES (?, ?, ?, 'draft', ?, ?, ?)")
    .run(id, enquiryId, shareToken, now, now, encrypt(data));
  db.prepare("INSERT INTO contract_versions (contract_id, version_number, created_at, payload) VALUES (?, 1, ?, ?)").run(id, now, encrypt(data));
  return getContract(id)!;
}

export function listContracts() {
  return (database().prepare("SELECT * FROM contracts ORDER BY updated_at DESC").all() as ContractRow[]).map(mapRow);
}

export function getContract(id: string) {
  const row = database().prepare("SELECT * FROM contracts WHERE id = ?").get(id) as ContractRow | undefined;
  return row ? mapRow(row) : null;
}

export function getSharedContract(token: string) {
  const row = database().prepare("SELECT * FROM contracts WHERE share_token = ? AND status = 'shared'").get(token) as ContractRow | undefined;
  return row ? mapRow(row) : null;
}

export function updateContract(id: string, update: { data?: ContractData; status?: ContractStatus }) {
  const current = getContract(id);
  if (!current) return null;
  const data = update.data ? normalizeData(update.data, current.data) : current.data;
  const status = update.status ?? current.status;
  if (status === "shared" && (!data.clientEmail || (!data.clientName && !data.clientCompany) || !data.projectTitle || !data.scope || !data.totalFee)) {
    throw new Error("Client, project title, scope and total fee are required before publishing.");
  }
  const updatedAt = new Date().toISOString();
  database().prepare("UPDATE contracts SET status = ?, updated_at = ?, payload = ? WHERE id = ?")
    .run(status, updatedAt, encrypt(data), id);
  if (update.data) {
    const nextVersion = ((database().prepare("SELECT MAX(version_number) AS value FROM contract_versions WHERE contract_id = ?").get(id) as { value: number | null }).value || 0) + 1;
    database().prepare("INSERT INTO contract_versions (contract_id, version_number, created_at, payload) VALUES (?, ?, ?, ?)").run(id, nextVersion, updatedAt, encrypt(data));
  }
  return { ...current, data, status, updatedAt };
}

export function listContractVersions(contractId: string): ContractVersion[] {
  const rows = database().prepare("SELECT id, contract_id, version_number, created_at, payload FROM contract_versions WHERE contract_id = ? ORDER BY version_number DESC").all(contractId) as Array<{ id: number; contract_id: string; version_number: number; created_at: string; payload: string }>;
  return rows.map((row) => ({ id: row.id, contractId: row.contract_id, version: row.version_number, createdAt: row.created_at, data: decrypt(row.payload) }));
}

export function restoreContractVersion(contractId: string, version: number) {
  const row = database().prepare("SELECT payload FROM contract_versions WHERE contract_id = ? AND version_number = ?").get(contractId, version) as { payload: string } | undefined;
  return row ? updateContract(contractId, { data: decrypt(row.payload), status: "draft" }) : null;
}

export function addContractFeedback(contractId: string, input: { type: ContractFeedback["type"]; name: string; email: string; message: string; signatureName?: string; identity?: string; userAgent?: string }) {
  const createdAt = new Date().toISOString();
  const contract = getContract(contractId);
  if (!contract) throw new Error("Contract not found.");
  const version = listContractVersions(contractId)[0]?.version || 1;
  const documentHash = createHash("sha256").update(JSON.stringify(contract.data)).digest("hex");
  const ipHash = createHmac("sha256", process.env.ADMIN_SESSION_SECRET || "cinem").update(input.identity || "unknown").digest("hex");
  database().prepare("INSERT INTO contract_feedback (contract_id, type, name, email, message, created_at, signature_name, document_version, document_hash, ip_hash, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .run(contractId, input.type, input.name.slice(0, 120), input.email.slice(0, 254), input.message.slice(0, 3000), createdAt, (input.signatureName || "").slice(0, 120), version, documentHash, ipHash, (input.userAgent || "").slice(0, 500));
}

export function listContractFeedback(contractId: string): ContractFeedback[] {
  return database().prepare("SELECT id, type, name, email, message, created_at AS createdAt, signature_name AS signatureName, document_version AS documentVersion, document_hash AS documentHash FROM contract_feedback WHERE contract_id = ? ORDER BY created_at DESC").all(contractId) as ContractFeedback[];
}

export const providerDetails = { name: site.legalName, email: site.email, website: site.url };
