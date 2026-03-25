import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import type { OnboardingPayload } from "@/lib/onboarding-types"
import { validateFullOnboarding } from "@/lib/onboarding-validate"

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ error: "Server misconfigured." }, { status: 503 })
  }

  try {
    const body = await req.json()
    const {
      sessionId,
      draft,
      currentStep,
      data,
    } = body as {
      sessionId?: string
      draft?: boolean
      currentStep?: number
      data?: OnboardingPayload
    }

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing payment session." }, { status: 400 })
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Missing onboarding data." }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "This deposit has not been completed." }, { status: 400 })
    }

    const stripeEmail = session.customer_details?.email ?? session.customer_email ?? null

    if (draft) {
      console.log("[Onboarding draft]", {
        stripeSessionId: sessionId,
        stripeEmail,
        currentStep: currentStep ?? null,
        payload: data,
      })
      return NextResponse.json({ success: true, draft: true })
    }

    const full = validateFullOnboarding(data)
    if (!full.ok) {
      return NextResponse.json({ error: full.message }, { status: 400 })
    }

    const exportReady = {
      meta: {
        stripeSessionId: sessionId,
        stripeEmail,
        submittedAt: new Date().toISOString(),
      },
      ...data,
    }

    console.log("[Onboarding submitted]", JSON.stringify(exportReady, null, 2))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[onboarding]", err)
    return NextResponse.json({ error: "Could not save onboarding. Please try again." }, { status: 500 })
  }
}
