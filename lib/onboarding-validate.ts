import { RETREAT_ADD_ONS } from "./add-ons"
import type { OnboardingPayload, MonthlyRevenue } from "./onboarding-types"

const MAX_BUSINESS_DOES = 300

const REVENUE_BANDS: MonthlyRevenue[] = ["5_10", "10_20", "20_35", "35_50", "50_plus"]

export function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

export function isValidUrlOptional(v: string) {
  if (!v.trim()) return true
  try {
    const u = new URL(v.includes("://") ? v : `https://${v}`)
    return Boolean(u.hostname)
  } catch {
    return false
  }
}

export function isValidLinkedInUrl(v: string) {
  if (!v.trim()) return false
  try {
    const u = new URL(v.includes("://") ? v : `https://${v}`)
    return /linkedin\.com/i.test(u.hostname)
  } catch {
    return false
  }
}

export type StepValidation = { ok: true } | { ok: false; message: string }

export function validateStep(stepIndex: number, d: OnboardingPayload): StepValidation {
  const s1 = d.section1_basicDetails
  const s2 = d.section2_businessSnapshot
  const s4 = d.section4_contentOutput
  const s5 = d.section5_setupAndExtras
  const s6 = d.section6_logistics

  switch (stepIndex) {
    case 0:
      if (!s1.fullName.trim()) return { ok: false, message: "Full name is required." }
      if (!s1.email.trim() || !isValidEmail(s1.email)) return { ok: false, message: "Valid email is required." }
      if (!s1.businessName.trim()) return { ok: false, message: "Business name is required." }
      if (s1.website.trim() && !isValidUrlOptional(s1.website)) return { ok: false, message: "Enter a valid website URL." }
      if (!s1.linkedIn.trim() || !isValidLinkedInUrl(s1.linkedIn))
        return { ok: false, message: "A valid LinkedIn profile URL is required." }
      if (!s1.instagramHandle.trim()) return { ok: false, message: "Business Instagram handle is required." }
      if (!s1.beenOnPodcast) return { ok: false, message: "Please answer whether you have been on a podcast." }
      return { ok: true }
    case 1:
      if (!s2.whatBusinessDoes.trim()) return { ok: false, message: "Tell us what your business does." }
      if (s2.whatBusinessDoes.length > MAX_BUSINESS_DOES)
        return { ok: false, message: `Keep this under ${MAX_BUSINESS_DOES} characters.` }
      if (!s2.idealClient.trim()) return { ok: false, message: "Ideal client is required." }
      if (!s2.primaryOffer.trim()) return { ok: false, message: "Primary offer is required." }
      if (!s2.monthlyRevenue || !REVENUE_BANDS.includes(s2.monthlyRevenue))
        return { ok: false, message: "Select average monthly revenue." }
      if (!s2.mainGoal) return { ok: false, message: "Select your main goal for the retreat." }
      if (s2.mainGoal === "other" && !s2.mainGoalOther.trim())
        return { ok: false, message: "Please describe your goal." }
      if (!s4.postFrequency) return { ok: false, message: "Select how often you currently post content." }
      return { ok: true }
    case 2:
      if (!s5.ranPaidAds) return { ok: false, message: "Please answer about paid ads." }
      if (!s5.hasLandingPage) return { ok: false, message: "Please answer about landing page." }
      if (!s5.hasOfferPage) return { ok: false, message: "Please answer about offer page." }
      if (!s5.hasCrm) return { ok: false, message: "Please answer about CRM." }
      for (const { id, title } of RETREAT_ADD_ONS) {
        if (!s5.addOnInterest[id])
          return { ok: false, message: `Please answer whether you’d like to hear more about: ${title}.` }
      }
      return { ok: true }
    case 3:
      if (!s6.consentFilmingMarketing)
        return { ok: false, message: "Consent for filming / marketing use is required to continue." }
      return { ok: true }
    default:
      return { ok: true }
  }
}

export function validateFullOnboarding(d: OnboardingPayload): StepValidation {
  for (let i = 0; i < 4; i++) {
    const v = validateStep(i, d)
    if (!v.ok) return v
  }
  return { ok: true }
}
