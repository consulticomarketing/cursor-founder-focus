import { NextRequest, NextResponse } from "next/server"
import { getStripe, getStripeDepositPriceId } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const priceId = getStripeDepositPriceId()

  if (!stripe || !priceId) {
    const isDev = process.env.NODE_ENV === "development"
    return NextResponse.json(
      {
        error: "Payments are not configured. Add STRIPE_SECRET_KEY and STRIPE_DEPOSIT_PRICE_ID to .env.local and restart the dev server.",
        ...(isDev && {
          debug: {
            hasSecretKey: Boolean(stripe),
            hasPriceId: Boolean(priceId),
          },
        }),
      },
      { status: 503 }
    )
  }

  const origin =
    req.headers.get("origin") ?? req.nextUrl.origin ?? process.env.NEXT_PUBLIC_SITE_URL

  if (!origin) {
    return NextResponse.json({ error: "Could not determine site URL." }, { status: 500 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin.replace(/\/$/, "")}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin.replace(/\/$/, "")}/#reserve`,
      billing_address_collection: "required",
      customer_creation: "always",
      phone_number_collection: { enabled: true },
      metadata: { source: "founder-focus-deposit" },
    })

    if (!session.url) {
      return NextResponse.json({ error: "Checkout session had no URL." }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("[checkout]", err)
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 })
  }
}
