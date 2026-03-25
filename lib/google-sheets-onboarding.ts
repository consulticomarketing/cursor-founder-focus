import "server-only"

import { google } from "googleapis"
import { RETREAT_ADD_ONS } from "@/lib/add-ons"
import { isGoogleSheetsCredentialsConfigured, loadGoogleServiceAccountJson } from "@/lib/google-sheets-credentials"
import { ONBOARDING_SHEET_HEADERS } from "@/lib/onboarding-sheet-headers"
import type { OnboardingPayload } from "@/lib/onboarding-types"

export type OnboardingSheetExport = {
  meta: {
    stripeSessionId: string
    stripeEmail: string | null
    submittedAt: string
  }
} & OnboardingPayload

export { ONBOARDING_SHEET_HEADERS }

function sheetRangeForAppend(tabName: string) {
  const q = tabName.includes(" ") || /[^A-Za-z0-9_]/.test(tabName)
  const name = q ? `'${tabName.replace(/'/g, "''")}'` : tabName
  return `${name}!A:ZZ`
}

export function isOnboardingSheetsConfigured() {
  return Boolean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() && isGoogleSheetsCredentialsConfigured())
}

export function payloadToSheetRow(p: OnboardingSheetExport): string[] {
  const s1 = p.section1_basicDetails
  const s2 = p.section2_businessSnapshot
  const s4 = p.section4_contentOutput
  const s5 = p.section5_setupAndExtras
  const s6 = p.section6_logistics
  return [
    p.meta.submittedAt,
    p.meta.stripeSessionId,
    p.meta.stripeEmail ?? "",
    s1.fullName,
    s1.email,
    s1.businessName,
    s1.website,
    s1.linkedIn,
    s1.instagramHandle,
    s1.beenOnPodcast,
    s2.whatBusinessDoes,
    s2.idealClient,
    s2.primaryOffer,
    s2.monthlyRevenue,
    s2.mainGoal,
    s2.mainGoalOther,
    s4.postFrequency,
    s5.ranPaidAds,
    s5.hasLandingPage,
    s5.hasOfferPage,
    s5.hasCrm,
    ...RETREAT_ADD_ONS.map((a) => s5.addOnInterest[a.id]),
    s6.dietaryRequirements,
    s6.roomPreferences,
    s6.consentFilmingMarketing ? "yes" : "no",
  ]
}

export async function appendOnboardingToGoogleSheet(
  exportPayload: OnboardingSheetExport
): Promise<{ ok: true } | { ok: false; error: string }> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim()
  const tabName = (process.env.GOOGLE_SHEETS_TAB_NAME || "Onboarding").trim()
  if (!spreadsheetId) {
    return { ok: false, error: "GOOGLE_SHEETS_SPREADSHEET_ID is not set." }
  }

  try {
    const credentials = loadGoogleServiceAccountJson()
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })
    const sheets = google.sheets({ version: "v4", auth })

    const row = payloadToSheetRow(exportPayload)

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetRangeForAppend(tabName),
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    })

    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false, error: msg }
  }
}
