/**
 * Writes row 1 of the configured tab with ONBOARDING_SHEET_HEADERS.
 * Run: npm run sync:sheet-headers
 */
import { resolve } from "path"
import { config } from "dotenv"
import { google } from "googleapis"
import { loadGoogleServiceAccountJson } from "../lib/google-sheets-credentials"
import { ONBOARDING_SHEET_HEADERS } from "../lib/onboarding-sheet-headers"

config({ path: resolve(process.cwd(), ".env.local") })

function sheetTabForA1Range(tabName: string) {
  const needsQuotes = tabName.includes(" ") || /[^A-Za-z0-9_]/.test(tabName)
  return needsQuotes ? `'${tabName.replace(/'/g, "''")}'` : tabName
}

/** 1-based column index → A, B, …, Z, AA, AB */
function a1ColumnLabel(indexOneBased: number): string {
  let n = indexOneBased
  let s = ""
  while (n > 0) {
    const m = (n - 1) % 26
    s = String.fromCharCode(65 + m) + s
    n = Math.floor((n - 1) / 26)
  }
  return s
}

async function main() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim()
  if (!spreadsheetId) {
    console.error("Missing GOOGLE_SHEETS_SPREADSHEET_ID")
    process.exit(1)
  }
  const tabName = (process.env.GOOGLE_SHEETS_TAB_NAME || "Onboarding").trim()
  const headers = [...ONBOARDING_SHEET_HEADERS]
  const lastCol = a1ColumnLabel(headers.length)
  const range = `${sheetTabForA1Range(tabName)}!A1:${lastCol}1`

  const credentials = loadGoogleServiceAccountJson()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
  const sheets = google.sheets({ version: "v4", auth })

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [headers] },
  })

  console.log("Row 1 updated:", range)
  console.log(`  ${headers.length} columns (${headers.join(", ").slice(0, 80)}…)`)
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e)
  process.exit(1)
})
