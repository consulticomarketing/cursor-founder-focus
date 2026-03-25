import "server-only"
import { loadEnvConfig } from "@next/env"
import fs from "node:fs"
import path from "node:path"
import Stripe from "stripe"

// Ensure .env.local is merged into process.env (second arg = treat as dev when not production)
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production")

/**
 * Turbopack can inline `process.env.FOO` as undefined in server chunks. If vars are missing at
 * runtime, read `.env.local` from disk (server-only).
 */
function parseEnvLocalFile(): Record<string, string> {
  const out: Record<string, string> = {}
  try {
    const filePath = path.join(process.cwd(), ".env.local")
    if (!fs.existsSync(filePath)) return out
    const raw = fs.readFileSync(filePath, "utf8")
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      out[key] = val
    }
  } catch {
    // ignore
  }
  return out
}

let cachedFileEnv: Record<string, string> | null = null

function getFileEnv(): Record<string, string> {
  if (!cachedFileEnv) cachedFileEnv = parseEnvLocalFile()
  return cachedFileEnv
}

function getStripeSecretKey(): string | undefined {
  const k = process.env["STRIPE_SECRET_KEY"]?.trim()
  if (k) return k
  return getFileEnv()["STRIPE_SECRET_KEY"]?.trim()
}

export function getStripeDepositPriceId(): string | undefined {
  const p = process.env["STRIPE_DEPOSIT_PRICE_ID"]?.trim()
  if (p) return p
  return getFileEnv()["STRIPE_DEPOSIT_PRICE_ID"]?.trim()
}

function getStripe(): Stripe | null {
  const key = getStripeSecretKey()
  if (!key) return null
  return new Stripe(key, {
    apiVersion: "2026-02-25.clover",
    typescript: true,
  })
}

export { getStripe }
