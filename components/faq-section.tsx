import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "When is the first event?",
    answer:
      "Dates are TBC — we're confirming the venue and first cohort now. Join the waitlist to be first to know. We'll share details with waitlist members before opening publicly.",
  },
  {
    question: "Who is this for?",
    answer:
      "UK founders who are running active businesses and want to produce a full content suite in one week. You should be at a stage where content is the next lever — VSL, podcast, social media, and ad creative. This isn't for pre-revenue founders.",
  },
  {
    question: "What content will I leave with?",
    answer:
      "At minimum: a recorded and edited VSL, multiple podcast episodes, a batch of social media content (reels, clips, carousels), and ad creative. Exact output varies by business and what you need most — we'll align on this before the week.",
  },
  {
    question: "What does the week cost?",
    answer:
      "Pricing will be confirmed when the first event is announced. It will reflect the cost of seven days accommodation, professional production, catering, and facilitation. Join the waitlist for early access pricing.",
  },
  {
    question: "How many founders will be there?",
    answer:
      "We're keeping cohorts small — maximum 8 founders per event. Small enough that everyone gets proper support and production time, large enough to have genuine peer energy.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "We'll send a prep guide to everyone before the week. Expect to have a rough VSL script outline, a sense of your content goals, and any existing brand assets ready. We'll support you in preparation.",
  },
  {
    question: "What is Founder Focus Events' connection to Consultico?",
    answer:
      "Founder Focus Events is an initiative by Consultico, a Glasgow-based marketing consultancy. Consultico's expertise in content strategy and founder marketing is the foundation for the event's programme.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6 pb-80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Frequently asked questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know before joining the waitlist. Something not here? Get in touch.
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
