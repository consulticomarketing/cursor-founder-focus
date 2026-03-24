import Stripe from "stripe"

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, {
    apiVersion: "2026-02-25.clover",
    typescript: true,
  })
}

export { getStripe }
