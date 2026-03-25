import type { OnboardingPayload } from "./onboarding-types"

const MAX_BUSINESS_DOES = 300

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
  const s3 = d.section3_contentStrategy
  const s4 = d.section4_contentOutput
  const s5 = d.section5_adsFunnel
  const s6 = d.section6_logistics

  switch (stepIndex) {
    case 0:
      if (!s1.fullName.trim()) return { ok: false, message: "Full name is required." }
      if (!s1.email.trim() || !isValidEmail(s1.email)) return { ok: false, message: "Valid email is required." }
      if (!s1.businessName.trim()) return { ok: false, message: "Business name is required." }
      if (s1.website.trim() && !isValidUrlOptional(s1.website)) return { ok: false, message: "Enter a valid website URL." }
      return { ok: true }
    case 1:
      if (!s1.linkedIn.trim() || !isValidLinkedInUrl(s1.linkedIn))
        return { ok: false, message: "A valid LinkedIn profile URL is required." }
      if (!s1.instagramHandle.trim()) return { ok: false, message: "Instagram handle is required." }
      if (!s1.beenOnPodcast) return { ok: false, message: "Please answer whether you have been on a podcast." }
      return { ok: true }
    case 2:
      if (!s2.whatBusinessDoes.trim()) return { ok: false, message: "Tell us what your business does." }
      if (s2.whatBusinessDoes.length > MAX_BUSINESS_DOES)
        return { ok: false, message: `Keep this under ${MAX_BUSINESS_DOES} characters.` }
      if (!s2.idealClient.trim()) return { ok: false, message: "Ideal client is required." }
      if (!s2.primaryOffer.trim()) return { ok: false, message: "Primary offer is required." }
      return { ok: true }
    case 3:
      if (!s2.monthlyRevenue) return { ok: false, message: "Select average monthly revenue." }
      if (!s2.mainGoal) return { ok: false, message: "Select your main goal for the retreat." }
      if (s2.mainGoal === "other" && !s2.mainGoalOther.trim())
        return { ok: false, message: "Please describe your goal." }
      return { ok: true }
    case 4:
      if (!s3.salesObjections.trim()) return { ok: false, message: "Sales objections are required." }
      if (!s3.repeatedQuestions.trim()) return { ok: false, message: "This field is required." }
      if (!s3.misunderstandings.trim()) return { ok: false, message: "This field is required." }
      if (!s3.knowBeforeBuy.trim()) return { ok: false, message: "This field is required." }
      return { ok: true }
    case 5:
      if (!s3.differentiator.trim()) return { ok: false, message: "This field is required." }
      if (!s3.resultsConfident.trim()) return { ok: false, message: "This field is required." }
      if (!s3.topics30to60.trim()) return { ok: false, message: "This field is required." }
      return { ok: true }
    case 6:
      if (!s3.threePriorityPieces.trim()) return { ok: false, message: "The three priority pieces field is required." }
      return { ok: true }
    case 7:
      if (!s4.contentPriorities.length) return { ok: false, message: "Select at least one content priority." }
      if (s4.contentPriorities.includes("other") && !s4.contentPrioritiesOther.trim())
        return { ok: false, message: "Please specify other content priorities." }
      if (!s4.publishChannels.length) return { ok: false, message: "Select at least one channel." }
      if (s4.publishChannels.includes("other") && !s4.publishChannelsOther.trim())
        return { ok: false, message: "Please specify other channels." }
      if (!s4.postFrequency) return { ok: false, message: "Select posting frequency." }
      return { ok: true }
    case 8:
      if (!s5.ranPaidAds) return { ok: false, message: "Please answer about paid ads." }
      if (!s5.hasLandingPage) return { ok: false, message: "Please answer about landing page." }
      if (!s5.hasOfferPage) return { ok: false, message: "Please answer about offer page." }
      if (!s5.hasCrm) return { ok: false, message: "Please answer about CRM." }
      return { ok: true }
    case 9:
      if (!s6.consentFilmingMarketing)
        return { ok: false, message: "Consent for filming / marketing use is required to continue." }
      return { ok: true }
    default:
      return { ok: true }
  }
}

export function validateFullOnboarding(d: OnboardingPayload): StepValidation {
  for (let i = 0; i < 10; i++) {
    const v = validateStep(i, d)
    if (!v.ok) return v
  }
  return { ok: true }
}
