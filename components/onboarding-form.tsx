"use client"

import { FormEvent, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { EVENT_DATES_LABEL } from "@/lib/site"

type FormState = "idle" | "loading" | "success" | "error"

export function OnboardingForm() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [website, setWebsite] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [goals, setGoals] = useState("")
  const [dietaryOrAccessibility, setDietaryOrAccessibility] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!sessionId) return

    setFormState("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          companyName,
          website,
          linkedIn,
          goals,
          dietaryOrAccessibility,
        }),
      })

      const data = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(data.error || "Something went wrong.")

      setFormState("success")
    } catch (err) {
      setFormState("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  if (!sessionId) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
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

  if (formState === "success") {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h1 className="text-2xl font-serif font-normal mb-2">You&apos;re all set</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Thanks for your deposit and onboarding details. We&apos;ll be in touch with next steps before the retreat.
        </p>
        <Link href="/" className="text-sm underline underline-offset-2 hover:text-foreground transition-colors">
          Back to the site
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-20 md:py-28">
      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center">Onboarding</p>
      <h1 className="text-3xl md:text-4xl font-serif font-normal mb-3 text-center text-balance">
        Tell us about you and your business
      </h1>
      <p className="text-muted-foreground text-center mb-10 leading-relaxed">
        You&apos;ve secured your deposit for{" "}
        <span className="text-foreground">{EVENT_DATES_LABEL}</span>. This helps us prepare
        the week around your goals.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-2">
            Business / trading name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={formState === "loading"}
            className="w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder-muted-foreground outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
            placeholder="e.g. Acme Ltd"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium mb-2">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={formState === "loading"}
            className="w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder-muted-foreground outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
            placeholder="https://"
          />
        </div>

        <div>
          <label htmlFor="linkedIn" className="block text-sm font-medium mb-2">
            LinkedIn (personal or company)
          </label>
          <input
            id="linkedIn"
            type="url"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            disabled={formState === "loading"}
            className="w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder-muted-foreground outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
            placeholder="https://linkedin.com/in/…"
          />
        </div>

        <div>
          <label htmlFor="goals" className="block text-sm font-medium mb-2">
            What do you most want from the week? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="goals"
            required
            rows={4}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            disabled={formState === "loading"}
            className="w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder-muted-foreground outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 disabled:opacity-50 resize-y min-h-[120px]"
            placeholder="Content priorities, sales focus, anything we should know."
          />
        </div>

        <div>
          <label htmlFor="dietaryOrAccessibility" className="block text-sm font-medium mb-2">
            Dietary needs or accessibility
          </label>
          <textarea
            id="dietaryOrAccessibility"
            rows={3}
            value={dietaryOrAccessibility}
            onChange={(e) => setDietaryOrAccessibility(e.target.value)}
            disabled={formState === "loading"}
            className="w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder-muted-foreground outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 disabled:opacity-50 resize-y"
            placeholder="Optional - helps us brief the venue."
          />
        </div>

        {formState === "error" && <p className="text-sm text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          disabled={formState === "loading"}
          className="w-full relative flex items-center justify-center gap-0 bg-foreground text-background rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="text-sm pr-4 font-medium py-2.5">
            {formState === "loading" ? "Submitting…" : "Submit onboarding"}
          </span>
          <span className="w-10 h-10 bg-background rounded-full flex items-center justify-center ml-auto">
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </span>
        </button>
      </form>
    </div>
  )
}
