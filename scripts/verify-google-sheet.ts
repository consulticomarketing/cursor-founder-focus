/**
 * Quick check: service account can read the spreadsheet.
 * Run: npx tsx scripts/verify-google-sheet.ts
 */
import { resolve } from "path"
import { config } from "dotenv"
import { google } from "googleapis"
import { loadGoogleServiceAccountJson } from "../lib/google-sheets-credentials"

config({ path: resolve(process.cwd(), ".env.local") })

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim()
if (!spreadsheetId) {
  console.error("Missing GOOGLE_SHEETS_SPREADSHEET_ID")
  process.exit(1)
}

const tabName = (process.env.GOOGLE_SHEETS_TAB_NAME || "Onboarding").trim()

async function main() {
  const credentials = loadGoogleServiceAccountJson()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
  const sheets = google.sheets({ version: "v4", auth })

  const res = await sheets.spreadsheets.get({ spreadsheetId })
  const title = res.data.properties?.title ?? "(no title)"
  const sheetsNames = res.data.sheets?.map((s) => s.properties?.title).filter(Boolean) ?? []

  console.log("Sheets API OK")
  console.log("  Spreadsheet:", title)
  console.log("  Tabs:", sheetsNames.join(", ") || "(none)")
  if (!sheetsNames.includes(tabName)) {
    console.warn(`  ⚠ Tab "${tabName}" not found — create it or set GOOGLE_SHEETS_TAB_NAME`)
    process.exitCode = 2
  } else {
    console.log(`  Tab "${tabName}" exists — ready for onboarding rows`)
  }
}

main().catch((e) => {
  console.error("Failed:", e instanceof Error ? e.message : e)
  process.exit(1)
})
