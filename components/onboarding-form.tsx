"use client"

import { FormEvent, useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react"
import { EVENT_DATES_LABEL } from "@/lib/site"
import { cn } from "@/lib/utils"
import {
  emptyOnboardingPayload,
  onboardingStorageKey,
  CONTENT_PRIORITY_OPTIONS,
  PUBLISH_CHANNEL_OPTIONS,
  type OnboardingPayload,
  type YesNo,
  type MonthlyRevenue,
  type MainRetreatGoal,
  type PostFrequency,
} from "@/lib/onboarding-types"
import { validateStep, validateFullOnboarding } from "@/lib/onboarding-validate"

const TOTAL_STEPS = 10

const MAX_BUSINESS_DOES = 300

const STEP_META = [
  { section: "Basic details", label: "Contact" },
  { section: "Basic details", label: "Profiles" },
  { section: "Business snapshot", label: "What you do" },
  { section: "Business snapshot", label: "Revenue & goal" },
  { section: "Content strategy", label: "Objections & buyers" },
  { section: "Content strategy", label: "Angles & proof" },
  { section: "Content strategy", label: "Priorities" },
  { section: "Content output", label: "Formats & cadence" },
  { section: "Ads & funnel", label: "Setup" },
  { section: "Logistics", label: "Final" },
] as const

type FormState = "idle" | "loading" | "success" | "error"
type SessionValidation = "idle" | "checking" | "valid" | "invalid"
type SessionResponse = { ok: boolean; error?: string; email?: string | null }

function mergeStoredPayload(stored: Partial<OnboardingPayload> | undefined): OnboardingPayload {
  const e = emptyOnboardingPayload()
  if (!stored) return e
  return {
    section1_basicDetails: { ...e.section1_basicDetails, ...stored.section1_basicDetails },
    section2_businessSnapshot: { ...e.section2_businessSnapshot, ...stored.section2_businessSnapshot },
    section3_contentStrategy: { ...e.section3_contentStrategy, ...stored.section3_contentStrategy },
    section4_contentOutput: {
      ...e.section4_contentOutput,
      ...stored.section4_contentOutput,
      contentPriorities: stored.section4_contentOutput?.contentPriorities ?? e.section4_contentOutput.contentPriorities,
      publishChannels: stored.section4_contentOutput?.publishChannels ?? e.section4_contentOutput.publishChannels,
    },
    section5_adsFunnel: { ...e.section5_adsFunnel, ...stored.section5_adsFunnel },
    section6_logistics: { ...e.section6_logistics, ...stored.section6_logistics },
  }
}

function toggleId(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

function YesNoRow({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string
  value: YesNo
  onChange: (v: YesNo) => void
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">
        {label} <span className="text-red-500">*</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {(["yes", "no"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm transition-colors disabled:opacity-50",
              value === opt
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-foreground hover:border-foreground/25"
            )}
          >
            {opt === "yes" ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  )
}

function inputClass(disabled?: boolean) {
  return cn(
    "w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground outline-none transition focus:border-foreground/25 focus:ring-2 focus:ring-ring/15 disabled:opacity-50",
    disabled && "cursor-not-allowed"
  )
}

export function OnboardingForm() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [validation, setValidation] = useState<SessionValidation>(sessionId ? "checking" : "idle")
  const [sessionError, setSessionError] = useState("")
  const [customerEmail, setCustomerEmail] = useState<string | null>(null)

  const [step, setStep] = useState(0)
  const [data, setData] = useState<OnboardingPayload>(() => emptyOnboardingPayload())
  const [hydrated, setHydrated] = useState(false)

  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldError, setFieldError] = useState("")

  useEffect(() => {
    if (!sessionId) {
      setValidation("idle")
      return
    }

    let cancelled = false
    setValidation("checking")
    setSessionError("")

    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const payload = (await res.json()) as SessionResponse
        if (cancelled) return
        if (payload.ok) {
          setValidation("valid")
          setCustomerEmail(payload.email ?? null)
        } else {
          setValidation("invalid")
          setSessionError(payload.error || "Could not verify payment.")
        }
      })
      .catch(() => {
        if (!cancelled) {
          setValidation("invalid")
          setSessionError("Could not verify payment.")
        }
      })

    return () => {
      cancelled = true
    }
  }, [sessionId])

  useEffect(() => {
    if (!sessionId || validation !== "valid") return
    try {
      const raw = localStorage.getItem(onboardingStorageKey(sessionId))
      if (raw) {
        const parsed = JSON.parse(raw) as { data?: Partial<OnboardingPayload>; step?: number }
        if (parsed.data) setData(mergeStoredPayload(parsed.data))
        if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step < TOTAL_STEPS) {
          setStep(parsed.step)
        }
      }
    } catch {
      /* ignore */
    } finally {
      setHydrated(true)
    }
  }, [sessionId, validation])

  useEffect(() => {
    if (validation !== "valid" || !customerEmail) return
    setData((d) => {
      if (d.section1_basicDetails.email.trim()) return d
      return {
        ...d,
        section1_basicDetails: { ...d.section1_basicDetails, email: customerEmail },
      }
    })
  }, [validation, customerEmail])

  useEffect(() => {
    if (!sessionId || validation !== "valid" || !hydrated) return
    const key = onboardingStorageKey(sessionId)
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify({ data, step, savedAt: Date.now() }))
      } catch {
        /* quota / private mode */
      }
      void fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, draft: true, currentStep: step, data }),
      })
    }, 750)
    return () => window.clearTimeout(t)
  }, [data, step, sessionId, validation, hydrated])

  const progressPct = useMemo(() => Math.round(((step + 1) / TOTAL_STEPS) * 100), [step])

  function patchS1(up: Partial<OnboardingPayload["section1_basicDetails"]>) {
    setData((d) => ({ ...d, section1_basicDetails: { ...d.section1_basicDetails, ...up } }))
  }
  function patchS2(up: Partial<OnboardingPayload["section2_businessSnapshot"]>) {
    setData((d) => ({ ...d, section2_businessSnapshot: { ...d.section2_businessSnapshot, ...up } }))
  }
  function patchS3(up: Partial<OnboardingPayload["section3_contentStrategy"]>) {
    setData((d) => ({ ...d, section3_contentStrategy: { ...d.section3_contentStrategy, ...up } }))
  }
  function patchS4(up: Partial<OnboardingPayload["section4_contentOutput"]>) {
    setData((d) => ({ ...d, section4_contentOutput: { ...d.section4_contentOutput, ...up } }))
  }
  function patchS5(up: Partial<OnboardingPayload["section5_adsFunnel"]>) {
    setData((d) => ({ ...d, section5_adsFunnel: { ...d.section5_adsFunnel, ...up } }))
  }
  function patchS6(up: Partial<OnboardingPayload["section6_logistics"]>) {
    setData((d) => ({ ...d, section6_logistics: { ...d.section6_logistics, ...up } }))
  }

  function goNext() {
    setFieldError("")
    const v = validateStep(step, data)
    if (!v.ok) {
      setFieldError(v.message)
      return
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }

  function goBack() {
    setFieldError("")
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleFinalSubmit(e: FormEvent) {
    e.preventDefault()
    if (!sessionId || validation !== "valid") return

    setFieldError("")
    const stepV = validateStep(9, data)
    if (!stepV.ok) {
      setFieldError(stepV.message)
      return
    }
    const full = validateFullOnboarding(data)
    if (!full.ok) {
      setFieldError(full.message)
      return
    }

    setFormState("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, data }),
      })
      const payload = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(payload.error || "Something went wrong.")
      try {
        localStorage.removeItem(onboardingStorageKey(sessionId))
      } catch {
        /* ignore */
      }
      setFormState("success")
    } catch (err) {
      setFormState("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  const busy = formState === "loading"
  const meta = STEP_META[step]

  if (!sessionId) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 md:py-20 text-center">
        <h1 className="text-2xl font-serif font-normal mb-4">Start from the site</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Complete a deposit first to unlock onboarding. If you already paid, use the link from your confirmation email
          or return from Stripe checkout.
        </p>
        <Link
          href="/#reserve"
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium"
        >
          Reserve with a deposit
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  if (validation === "checking") {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 md:py-28 text-center">
        <p className="text-muted-foreground text-sm tracking-wide">Verifying your payment…</p>
      </div>
    )
  }

  if (validation === "invalid") {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 md:py-20 text-center">
        <h1 className="text-2xl font-serif font-normal mb-4">Payment could not be verified</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">{sessionError}</p>
        <Link
          href="/#reserve"
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium"
        >
          Back to reserve
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  if (formState === "success") {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 md:py-24 text-center">
        <div className="w-14 h-14 rounded-full border border-border bg-card flex items-center justify-center mx-auto mb-6">
          <Check className="w-7 h-7 text-foreground" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-serif font-normal mb-2">You&apos;re all set</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Thanks for completing onboarding. We&apos;ll use your answers to shape podcast topics, content angles, and the
          week ahead.
        </p>
        <Link href="/" className="text-sm underline underline-offset-4 hover:text-foreground transition-colors">
          Back to the site
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-5 sm:px-6 py-10 md:py-16 pb-24">
      <div className="mb-10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          <span>
            Step {step + 1} of {TOTAL_STEPS}
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-0.5 w-full rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">{meta.section}</p>
      <h1 className="text-2xl sm:text-3xl font-serif font-normal mb-2 text-balance">{meta.label}</h1>
      {step === 0 && customerEmail && (
        <p className="text-sm text-muted-foreground mb-6">
          Payment confirmed for <span className="text-foreground font-medium">{customerEmail}</span>
        </p>
      )}
      {step === 0 && !customerEmail && <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Retreat week: {EVENT_DATES_LABEL}</p>}
      {step === 0 && (
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          Built for agency owners and founders doing roughly £5k–£25k+ / month. We focus on positioning, offer clarity, and
          content that handles objections and drives inbound — tell us what we need to produce with you.
        </p>
      )}

      {step === 9 && (
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-foreground/20 pl-4">
          Arrival details and full event logistics will be sent via email separately.
        </p>
      )}

      <form
        onSubmit={step === TOTAL_STEPS - 1 ? handleFinalSubmit : (e) => e.preventDefault()}
        className="space-y-6"
      >
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                value={data.section1_basicDetails.fullName}
                onChange={(e) => patchS1({ fullName: e.target.value })}
                disabled={busy}
                className={inputClass(busy)}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={data.section1_basicDetails.email}
                onChange={(e) => patchS1({ email: e.target.value })}
                disabled={busy}
                className={inputClass(busy)}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                Business / trading name <span className="text-red-500">*</span>
              </label>
              <input
                id="businessName"
                value={data.section1_basicDetails.businessName}
                onChange={(e) => patchS1({ businessName: e.target.value })}
                disabled={busy}
                className={inputClass(busy)}
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">
                Website <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                id="website"
                type="url"
                inputMode="url"
                value={data.section1_basicDetails.website}
                onChange={(e) => patchS1({ website: e.target.value })}
                disabled={busy}
                className={inputClass(busy)}
                placeholder="https://"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="linkedIn" className="block text-sm font-medium mb-2">
                LinkedIn profile <span className="text-red-500">*</span>
              </label>
              <input
                id="linkedIn"
                type="url"
                inputMode="url"
                value={data.section1_basicDetails.linkedIn}
                onChange={(e) => patchS1({ linkedIn: e.target.value })}
                disabled={busy}
                className={inputClass(busy)}
                placeholder="https://linkedin.com/in/…"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                Instagram handle <span className="text-red-500">*</span>
              </label>
              <input
                id="instagram"
                value={data.section1_basicDetails.instagramHandle}
                onChange={(e) => patchS1({ instagramHandle: e.target.value })}
                disabled={busy}
                className={inputClass(busy)}
                placeholder="@yourhandle"
              />
            </div>
            <YesNoRow
              label="Have you been on a podcast before?"
              value={data.section1_basicDetails.beenOnPodcast}
              onChange={(v) => patchS1({ beenOnPodcast: v })}
              disabled={busy}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="what" className="block text-sm font-medium mb-2">
                What does your business do? <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">Short paragraph, max {MAX_BUSINESS_DOES} characters.</p>
              <textarea
                id="what"
                rows={4}
                maxLength={MAX_BUSINESS_DOES}
                value={data.section2_businessSnapshot.whatBusinessDoes}
                onChange={(e) => patchS2({ whatBusinessDoes: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "min-h-[100px] resize-y")}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {data.section2_businessSnapshot.whatBusinessDoes.length}/{MAX_BUSINESS_DOES}
              </p>
            </div>
            <div>
              <label htmlFor="ideal" className="block text-sm font-medium mb-2">
                Who is your ideal client? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="ideal"
                rows={3}
                value={data.section2_businessSnapshot.idealClient}
                onChange={(e) => patchS2({ idealClient: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "min-h-[88px] resize-y")}
              />
            </div>
            <div>
              <label htmlFor="offer" className="block text-sm font-medium mb-2">
                What is your primary offer right now? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="offer"
                rows={3}
                value={data.section2_businessSnapshot.primaryOffer}
                onChange={(e) => patchS2({ primaryOffer: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "min-h-[88px] resize-y")}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="revenue" className="block text-sm font-medium mb-2">
                Average monthly revenue <span className="text-red-500">*</span>
              </label>
              <select
                id="revenue"
                value={data.section2_businessSnapshot.monthlyRevenue}
                onChange={(e) => patchS2({ monthlyRevenue: e.target.value as MonthlyRevenue })}
                disabled={busy}
                className={inputClass(busy)}
              >
                <option value="">Select range</option>
                <option value="5k_10k">£5k–£10k</option>
                <option value="10k_25k">£10k–£25k</option>
                <option value="25k_plus">£25k+</option>
              </select>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">
                What is your main goal for this retreat? <span className="text-red-500">*</span>
              </p>
              <div className="space-y-2">
                {(
                  [
                    { v: "clarify_offer" as const, t: "Clarify my offer / positioning" },
                    { v: "consistent_content" as const, t: "Build enough content to post consistently" },
                    { v: "authority" as const, t: "Grow authority in my niche" },
                    { v: "messaging" as const, t: "Develop better messaging / content angles" },
                    { v: "other" as const, t: "Other" },
                  ] satisfies { v: MainRetreatGoal; t: string }[]
                ).map((opt) => (
                  <label
                    key={opt.v}
                    className="flex items-start gap-3 cursor-pointer rounded-xl border border-border bg-card px-4 py-3 has-[:checked]:border-foreground/30"
                  >
                    <input
                      type="radio"
                      name="mainGoal"
                      className="mt-1"
                      checked={data.section2_businessSnapshot.mainGoal === opt.v}
                      onChange={() => patchS2({ mainGoal: opt.v })}
                      disabled={busy}
                    />
                    <span className="text-sm leading-snug">{opt.t}</span>
                  </label>
                ))}
              </div>
              {data.section2_businessSnapshot.mainGoal === "other" && (
                <input
                  value={data.section2_businessSnapshot.mainGoalOther}
                  onChange={(e) => patchS2({ mainGoalOther: e.target.value })}
                  disabled={busy}
                  className={inputClass(busy)}
                  placeholder="Describe your goal"
                />
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            {[
              {
                k: "salesObjections" as const,
                label: "What are the most common objections you hear on sales calls?",
              },
              { k: "repeatedQuestions" as const, label: "What questions do potential clients repeatedly ask before buying?" },
              { k: "misunderstandings" as const, label: "What do people misunderstand about your service or industry?" },
              { k: "knowBeforeBuy" as const, label: "What should people know before working with you that would make them more likely to buy?" },
            ].map((f) => (
              <div key={f.k}>
                <label className="block text-sm font-medium mb-2">
                  {f.label} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={data.section3_contentStrategy[f.k]}
                  onChange={(e) => patchS3({ [f.k]: e.target.value })}
                  disabled={busy}
                  className={cn(inputClass(busy), "min-h-[120px] resize-y")}
                />
              </div>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            {[
              { k: "differentiator" as const, label: "What makes your approach different or better than competitors?" },
              { k: "resultsConfident" as const, label: "What results have you delivered that you’re most confident talking about?" },
              { k: "topics30to60" as const, label: "What topics could you speak about confidently for 30–60 minutes?" },
            ].map((f) => (
              <div key={f.k}>
                <label className="block text-sm font-medium mb-2">
                  {f.label} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={data.section3_contentStrategy[f.k]}
                  onChange={(e) => patchS3({ [f.k]: e.target.value })}
                  disabled={busy}
                  className={cn(inputClass(busy), "min-h-[120px] resize-y")}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-2">
                Are there specific stories, experiences, or case studies you want to share?{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                rows={4}
                value={data.section3_contentStrategy.storiesCaseStudies}
                onChange={(e) => patchS3({ storiesCaseStudies: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "min-h-[100px] resize-y")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Are there any strong opinions or contrarian takes you have in your space?{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                rows={4}
                value={data.section3_contentStrategy.contrarianTakes}
                onChange={(e) => patchS3({ contrarianTakes: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "min-h-[100px] resize-y")}
              />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                If we could only create 3 pieces of content that would actually move your business forward, what would they
                be? <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={data.section3_contentStrategy.threePriorityPieces}
                onChange={(e) => patchS3({ threePriorityPieces: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "min-h-[140px] resize-y")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Are there any topics you want to avoid? <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                rows={4}
                value={data.section3_contentStrategy.topicsToAvoid}
                onChange={(e) => patchS3({ topicsToAvoid: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "min-h-[100px] resize-y")}
              />
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-7">
            <div>
              <p className="text-sm font-medium mb-3">
                What type of content do you want to prioritise? <span className="text-red-500">*</span>
              </p>
              <div className="space-y-2">
                {CONTENT_PRIORITY_OPTIONS.map((o) => (
                  <label
                    key={o.id}
                    className="flex items-start gap-3 cursor-pointer rounded-xl border border-border bg-card px-4 py-3 has-[:checked]:border-foreground/30"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-border"
                      checked={data.section4_contentOutput.contentPriorities.includes(o.id)}
                      onChange={() =>
                        patchS4({ contentPriorities: toggleId(data.section4_contentOutput.contentPriorities, o.id) })
                      }
                      disabled={busy}
                    />
                    <span className="text-sm">{o.label}</span>
                  </label>
                ))}
              </div>
              {data.section4_contentOutput.contentPriorities.includes("other") && (
                <input
                  value={data.section4_contentOutput.contentPrioritiesOther}
                  onChange={(e) => patchS4({ contentPrioritiesOther: e.target.value })}
                  disabled={busy}
                  className={cn(inputClass(busy), "mt-3")}
                  placeholder="Describe other priorities"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium mb-3">
                Where do you primarily want to publish content? <span className="text-red-500">*</span>
              </p>
              <div className="space-y-2">
                {PUBLISH_CHANNEL_OPTIONS.map((o) => (
                  <label
                    key={o.id}
                    className="flex items-start gap-3 cursor-pointer rounded-xl border border-border bg-card px-4 py-3 has-[:checked]:border-foreground/30"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-border"
                      checked={data.section4_contentOutput.publishChannels.includes(o.id)}
                      onChange={() =>
                        patchS4({ publishChannels: toggleId(data.section4_contentOutput.publishChannels, o.id) })
                      }
                      disabled={busy}
                    />
                    <span className="text-sm">{o.label}</span>
                  </label>
                ))}
              </div>
              {data.section4_contentOutput.publishChannels.includes("other") && (
                <input
                  value={data.section4_contentOutput.publishChannelsOther}
                  onChange={(e) => patchS4({ publishChannelsOther: e.target.value })}
                  disabled={busy}
                  className={cn(inputClass(busy), "mt-3")}
                  placeholder="Other channels"
                />
              )}
            </div>
            <div>
              <label htmlFor="freq" className="block text-sm font-medium mb-2">
                How often do you currently post content? <span className="text-red-500">*</span>
              </label>
              <select
                id="freq"
                value={data.section4_contentOutput.postFrequency}
                onChange={(e) => patchS4({ postFrequency: e.target.value as PostFrequency })}
                disabled={busy}
                className={inputClass(busy)}
              >
                <option value="">Select frequency</option>
                <option value="rarely">Rarely / never</option>
                <option value="1_2">1–2x per week</option>
                <option value="3_5">3–5x per week</option>
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-6">
            <YesNoRow label="Have you run paid ads before?" value={data.section5_adsFunnel.ranPaidAds} onChange={(v) => patchS5({ ranPaidAds: v })} disabled={busy} />
            <YesNoRow label="Do you currently have a landing page?" value={data.section5_adsFunnel.hasLandingPage} onChange={(v) => patchS5({ hasLandingPage: v })} disabled={busy} />
            <YesNoRow label="Do you currently have a clear offer page?" value={data.section5_adsFunnel.hasOfferPage} onChange={(v) => patchS5({ hasOfferPage: v })} disabled={busy} />
            <YesNoRow
              label="Do you currently have a CRM or lead tracking system?"
              value={data.section5_adsFunnel.hasCrm}
              onChange={(v) => patchS5({ hasCrm: v })}
              disabled={busy}
            />
          </div>
        )}

        {step === 9 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="diet" className="block text-sm font-medium mb-2">
                Dietary requirements <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                id="diet"
                rows={3}
                value={data.section6_logistics.dietaryRequirements}
                onChange={(e) => patchS6({ dietaryRequirements: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "resize-y")}
              />
            </div>
            <div>
              <label htmlFor="room" className="block text-sm font-medium mb-2">
                Room preferences or notes <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                id="room"
                rows={3}
                value={data.section6_logistics.roomPreferences}
                onChange={(e) => patchS6({ roomPreferences: e.target.value })}
                disabled={busy}
                className={cn(inputClass(busy), "resize-y")}
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-border bg-card px-4 py-4 has-[:checked]:border-foreground/30">
              <input
                type="checkbox"
                className="mt-1 rounded border-border"
                checked={data.section6_logistics.consentFilmingMarketing}
                onChange={(e) => patchS6({ consentFilmingMarketing: e.target.checked })}
                disabled={busy}
              />
              <span className="text-sm leading-relaxed">
                I consent to being filmed and to footage / content being used for marketing.{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
          </div>
        )}

        {(fieldError || formState === "error") && (
          <p className="text-sm text-red-600 dark:text-red-400">{fieldError || errorMessage}</p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border mt-8">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0 || busy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted/50 disabled:opacity-40 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={busy}
              className="sm:ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium disabled:opacity-50"
            >
              Continue
              <ArrowUpRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={busy}
              className="sm:ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium disabled:opacity-50"
            >
              {busy ? "Submitting…" : "Submit onboarding"}
              {!busy && <ArrowUpRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
