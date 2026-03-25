import { Suspense } from "react"
import { OnboardingHeader } from "@/components/onboarding-header"
import { OnboardingForm } from "@/components/onboarding-form"

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-background">
      <OnboardingHeader />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center px-6 text-muted-foreground">
            Loading…
          </div>
        }
      >
        <OnboardingForm />
      </Suspense>
    </main>
  )
}
