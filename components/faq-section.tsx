import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "When is the first event?",
    answer:
      "The first cohort runs 4–8 May 2026 (Monday to Friday) in the Scottish Highlands. Pay a deposit to reserve your place, then complete onboarding - or join the email list for updates only.",
  },
  {
    question: "Who is this for?",
    answer:
      "UK founders who are running active businesses and want to produce a serious content suite in one week. You should be at a stage where content is the next lever - podcast, social media, and ad creative are in scope for everyone. This isn't for pre-revenue founders.",
  },
  {
    question: "What content will I leave with?",
    answer:
      "Base retreat: multiple podcast episodes, a batch of social media content (reels, clips, carousels), ad creative, and protected time for sales work - exact output varies by business and we'll align before the week. A full VSL is not included by default. You can add individual optional extras (VSL production, podcast mentoring & storyboarding, content management & release, executive assistant for the week) - each is priced and confirmed separately.",
  },
  {
    question: "What optional add-ons are available?",
    answer:
      "Four separate add-ons, none included in the standard ticket: VSL production; production-grade podcast mentoring and storyboarding; content management and release; executive assistant for the week. Pick only what you need - we'll quote each. A combined bundle is planned and will be announced separately.",
  },
  {
    question: "What does the week cost?",
    answer:
      "Full pricing reflects four nights' accommodation, professional production, catering, and facilitation. We're taking deposits for the first cohort now; balance and payment schedule are confirmed after you reserve. Email updates are available if you're not ready to commit yet.",
  },
  {
    question: "How many founders will be there?",
    answer:
      "We're keeping cohorts focused - maximum 21 founders per retreat. Enough for genuine peer energy and collaboration, with proper support and production time for everyone.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "We'll send a prep guide to everyone before the week. Expect to have a clear sense of your content goals, rough outlines for what you want to record, and any existing brand assets ready. If you add VSL production as an add-on, we'll brief you on script and messaging prep separately.",
  },
  {
    question: "What is Founder Focus Events' connection to Wilson Vincent Events?",
    answer:
      "Founder Focus Events is an initiative by Wilson Vincent Events. Their focus on curated rooms for founders, operators and decision-makers - and building systems for serious growth - is the foundation for this retreat's programme.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6 pb-80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Details</p>
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Frequently asked questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know before reserving. Something missing?{" "}
            <a href="#reserve" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Get in touch via the form there
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3 py-0 my-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-foreground/30"
            >
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
