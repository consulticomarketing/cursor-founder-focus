import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

/**
 * Validates a Checkout Session after redirect from Stripe (session_id in URL).
 * Returns customer email when paid so onboarding can display it without trusting the client.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id")
  if (!sessionId) {
    return NextResponse.json({ ok: false as const, error: "Missing session_id." }, { status: 400 })
  }

  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ ok: false as const, error: "Server misconfigured." }, { status: 503 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== "paid") {
      return NextResponse.json({
        ok: false as const,
        error:
          "This payment is not complete yet. If you just finished paying, wait a few seconds and refresh the page.",
      })
    }

    const email = session.customer_details?.email ?? session.customer_email ?? null

    return NextResponse.json({ ok: true as const, email })
  } catch {
    return NextResponse.json(
      { ok: false as const, error: "We could not verify this payment link. Use the link from Stripe or start again from the site." },
      { status: 404 }
    )
  }
}
