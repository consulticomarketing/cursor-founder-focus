/**
 * Onboarding payload grouped by section for CRM / Airtable export.
 */

export type MonthlyRevenue = "5k_10k" | "10k_25k" | "25k_plus" | ""

export type MainRetreatGoal =
  | "clarify_offer"
  | "consistent_content"
  | "authority"
  | "messaging"
  | "other"
  | ""

export type PostFrequency = "rarely" | "1_2" | "3_5" | "daily" | ""

export type YesNo = "yes" | "no" | ""

export const CONTENT_PRIORITY_OPTIONS = [
  { id: "short_form_video", label: "Short-form video (Reels / TikTok)" },
  { id: "long_form_video", label: "Long-form video (YouTube / podcast)" },
  { id: "written_content", label: "Written content (LinkedIn / Twitter)" },
  { id: "ads_creatives", label: "Ads creatives" },
  { id: "other", label: "Other" },
] as const

export const PUBLISH_CHANNEL_OPTIONS = [
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "other", label: "Other" },
] as const

export type OnboardingPayload = {
  section1_basicDetails: {
    fullName: string
    email: string
    businessName: string
    website: string
    linkedIn: string
    instagramHandle: string
    beenOnPodcast: YesNo
  }
  section2_businessSnapshot: {
    whatBusinessDoes: string
    idealClient: string
    primaryOffer: string
    monthlyRevenue: MonthlyRevenue
    mainGoal: MainRetreatGoal
    mainGoalOther: string
  }
  section3_contentStrategy: {
    salesObjections: string
    repeatedQuestions: string
    misunderstandings: string
    knowBeforeBuy: string
    differentiator: string
    resultsConfident: string
    topics30to60: string
    storiesCaseStudies: string
    contrarianTakes: string
    threePriorityPieces: string
    topicsToAvoid: string
  }
  section4_contentOutput: {
    contentPriorities: string[]
    contentPrioritiesOther: string
    publishChannels: string[]
    publishChannelsOther: string
    postFrequency: PostFrequency
  }
  section5_adsFunnel: {
    ranPaidAds: YesNo
    hasLandingPage: YesNo
    hasOfferPage: YesNo
    hasCrm: YesNo
  }
  section6_logistics: {
    dietaryRequirements: string
    roomPreferences: string
    consentFilmingMarketing: boolean
  }
}

export function emptyOnboardingPayload(): OnboardingPayload {
  return {
    section1_basicDetails: {
      fullName: "",
      email: "",
      businessName: "",
      website: "",
      linkedIn: "",
      instagramHandle: "",
      beenOnPodcast: "",
    },
    section2_businessSnapshot: {
      whatBusinessDoes: "",
      idealClient: "",
      primaryOffer: "",
      monthlyRevenue: "",
      mainGoal: "",
      mainGoalOther: "",
    },
    section3_contentStrategy: {
      salesObjections: "",
      repeatedQuestions: "",
      misunderstandings: "",
      knowBeforeBuy: "",
      differentiator: "",
      resultsConfident: "",
      topics30to60: "",
      storiesCaseStudies: "",
      contrarianTakes: "",
      threePriorityPieces: "",
      topicsToAvoid: "",
    },
    section4_contentOutput: {
      contentPriorities: [],
      contentPrioritiesOther: "",
      publishChannels: [],
      publishChannelsOther: "",
      postFrequency: "",
    },
    section5_adsFunnel: {
      ranPaidAds: "",
      hasLandingPage: "",
      hasOfferPage: "",
      hasCrm: "",
    },
    section6_logistics: {
      dietaryRequirements: "",
      roomPreferences: "",
      consentFilmingMarketing: false,
    },
  }
}

export function onboardingStorageKey(sessionId: string) {
  return `ffe-onboarding:${sessionId}`
}
