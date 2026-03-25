import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs: { question: string; paragraphs: string[] }[] = [
  {
    question: "When is the next event?",
    paragraphs: [
      "4–8 May 2026, Monday to Friday, in the Scottish Highlands. Pay a deposit to reserve your place, then complete onboarding, or join the email list for updates only.",
    ],
  },
  {
    question: "Who is this for?",
    paragraphs: [
      "UK founders who are running active businesses and want to produce a serious content suite in one week. You should be at a stage where content is the next lever: podcast, social media, and ad creative are in scope for everyone. This isn't for pre-revenue founders.",
    ],
  },
  {
    question: "What content will I leave with?",
    paragraphs: [
      "Multiple podcast episodes, a batch of social media content (reels, clips, carousels), ad creative, and protected time for sales work. Exact output varies by business; we'll align with you before the week.",
      "Optional add-ons—VSL production, podcast mentoring and storyboarding, content management and release, or an executive assistant for the week—can be quoted separately.",
    ],
  },
  {
    question: "What optional add-ons are available?",
    paragraphs: [
      "VSL production; production-grade podcast mentoring and storyboarding; content management and release; and an executive assistant for the week.",
      "Tell us what you need and we'll quote each item.",
    ],
  },
  {
    question: "What does the week cost?",
    paragraphs: [
      "Full pricing reflects four nights' accommodation, professional production, catering, and facilitation. We're taking deposits now; your balance and payment schedule are confirmed after you reserve. Email updates are available if you're not ready to commit yet.",
    ],
  },
  {
    question: "How many founders will be there?",
    paragraphs: [
      "We're keeping cohorts focused: a maximum of 21 founders per retreat. Enough for genuine peer energy and collaboration, with proper support and production time for everyone.",
    ],
  },
  {
    question: "Do I need to prepare anything?",
    paragraphs: [
      "We'll send a prep guide before the week. Expect a clear sense of your content goals, rough outlines for what you want to record, and any existing brand assets ready to hand.",
      "If you book VSL production, we'll brief you on script and messaging prep separately.",
    ],
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6 pb-80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Details</p>
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Frequently asked questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Everything you need to know before reserving. Something missing?{" "}
            <a href="#reserve" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Get in touch via the form there
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="rounded-xl border border-border bg-card px-5 md:px-6 shadow-sm data-[state=open]:border-foreground/25"
            >
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5 [&>svg]:shrink-0">
                <span className="text-pretty pr-2">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="space-y-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed text-pretty">
                  {faq.paragraphs.map((p, i) => (
                    <p key={i} className="m-0">
                      {p}
                    </p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
