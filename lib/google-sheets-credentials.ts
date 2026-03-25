import { readFileSync } from "fs"
import { resolve } from "path"

/**
 * Loads service account JSON for Google Sheets API.
 * Prefer a key file (GOOGLE_APPLICATION_CREDENTIALS) so you do not put multiline JSON in .env.
 */
export function loadGoogleServiceAccountJson(): Record<string, unknown> {
  const keyFile =
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim() || process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim()
  if (keyFile) {
    const p = resolve(process.cwd(), keyFile)
    return JSON.parse(readFileSync(p, "utf8")) as Record<string, unknown>
  }
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64?.trim()
  if (b64) {
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as Record<string, unknown>
  }
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim()
  if (raw) {
    return JSON.parse(raw) as Record<string, unknown>
  }
  throw new Error(
    "Set GOOGLE_APPLICATION_CREDENTIALS (path to JSON), GOOGLE_SERVICE_ACCOUNT_KEY_FILE, GOOGLE_SERVICE_ACCOUNT_KEY_BASE64, or GOOGLE_SERVICE_ACCOUNT_JSON (single-line only)."
  )
}

export function isGoogleSheetsCredentialsConfigured() {
  return Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim() ||
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim() ||
      process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() ||
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64?.trim()
  )
}
