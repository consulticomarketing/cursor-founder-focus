import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ error: "Server misconfigured." }, { status: 503 })
  }

  try {
    const body = await req.json()
    const { sessionId, companyName, website, linkedIn, goals, dietaryOrAccessibility } = body as {
      sessionId?: string
      companyName?: string
      website?: string
      linkedIn?: string
      goals?: string
      dietaryOrAccessibility?: string
    }

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing payment session." }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "This deposit has not been completed." }, { status: 400 })
    }

    const email =
      session.customer_details?.email ?? session.customer_email ?? null

    console.log("[Onboarding]", {
      stripeSessionId: sessionId,
      email,
      companyName,
      website,
      linkedIn,
      goals,
      dietaryOrAccessibility,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[onboarding]", err)
    return NextResponse.json({ error: "Could not save onboarding. Please try again." }, { status: 500 })
  }
}
