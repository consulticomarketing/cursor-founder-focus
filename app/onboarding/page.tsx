import { Suspense } from "react"
import { OnboardingForm } from "@/components/onboarding-form"

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center px-6 text-muted-foreground">
            Loading…
          </div>
        }
      >
        <OnboardingForm />
      </Suspense>
    </main>
  )
}
