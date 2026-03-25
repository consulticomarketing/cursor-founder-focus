/**
 * Onboarding payload grouped by section for CRM / Airtable export.
 */

import { RETREAT_ADD_ONS, type RetreatAddOnId } from "./add-ons"

export type MonthlyRevenue = "5_10" | "10_20" | "20_35" | "35_50" | "50_plus" | ""

export type MainRetreatGoal =
  | "clarify_offer"
  | "consistent_content"
  | "authority"
  | "messaging"
  | "other"
  | ""

export type PostFrequency = "rarely" | "1_2" | "3_5" | "daily" | ""

export type YesNo = "yes" | "no" | ""

export type AddOnInterestById = Record<RetreatAddOnId, YesNo>

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
  section4_contentOutput: {
    postFrequency: PostFrequency
  }
  section5_setupAndExtras: {
    ranPaidAds: YesNo
    hasLandingPage: YesNo
    hasOfferPage: YesNo
    hasCrm: YesNo
    /** Yes = wants to hear more / pricing; no = not interested for now */
    addOnInterest: AddOnInterestById
  }
  section6_logistics: {
    dietaryRequirements: string
    roomPreferences: string
    consentFilmingMarketing: boolean
  }
}

export function emptyAddOnInterest(): AddOnInterestById {
  return Object.fromEntries(RETREAT_ADD_ONS.map(({ id }) => [id, "" as YesNo])) as AddOnInterestById
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
    section4_contentOutput: {
      postFrequency: "",
    },
    section5_setupAndExtras: {
      ranPaidAds: "",
      hasLandingPage: "",
      hasOfferPage: "",
      hasCrm: "",
      addOnInterest: emptyAddOnInterest(),
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

/** Bump when step shape changes so local drafts restore the correct step. */
export const ONBOARDING_STORE_VERSION = 2
