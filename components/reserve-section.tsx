"use client"

import { useState, FormEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import { DepositButton } from "@/components/deposit-button"
import { EVENT_DATES_LABEL } from "@/lib/site"

type FormState = "idle" | "loading" | "success" | "error"

export function ReserveSection() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Something went wrong.")
      }

      setFormState("success")
    } catch (err) {
      setFormState("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <section id="reserve" className="py-32 px-6 pb-[14vw] sm:pb-[16vw] lg:pb-[18vw] bg-background">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Reserve</p>
        <h2 className="text-4xl md:text-5xl font-normal mb-4 text-balance font-serif">
          Reserve your spot - deposits open
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          <span className="text-foreground font-medium">{EVENT_DATES_LABEL}</span>
          <span className="text-muted-foreground"> · Scottish Highlands</span>
        </p>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Pay a deposit to secure your place. After checkout you&apos;ll complete a short onboarding form so we can
          tailor the week to your business.
        </p>

        <div className="flex flex-col items-center gap-4 mb-14">
          <DepositButton />
          <p className="text-xs text-muted-foreground max-w-md">
            Secure payment via Stripe. You&apos;ll return here automatically after paying to finish onboarding.
          </p>
        </div>

        <div className="border-t border-border pt-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Updates only</p>
          <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
            Not ready to put down a deposit? Leave your details and we&apos;ll keep you posted.
          </p>

          {formState === "success" ? (
            <div className="bg-card border border-border rounded-3xl p-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 font-serif">You&apos;re on the list.</h3>
              <p className="text-muted-foreground text-sm">
                We&apos;ll email you news about the retreat - including when full balance and travel details are due.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={formState === "loading"}
                className="w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder-muted-foreground outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
              />
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formState === "loading"}
                className="w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder-muted-foreground outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
              />

              {formState === "error" && <p className="text-sm text-red-500">{errorMessage}</p>}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full relative flex items-center justify-center gap-0 border border-border bg-transparent text-foreground rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed hover:bg-secondary/50"
              >
                <span className="text-sm pr-4 font-medium py-2.5">
                  {formState === "loading" ? "Joining…" : "Email me updates"}
                </span>
                <span className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center ml-auto">
                  <ArrowUpRight className="w-4 h-4 text-background" />
                </span>
              </button>

              <p className="text-xs text-muted-foreground text-center">
                A Wilson Vincent Events initiative. No spam - just useful updates.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
