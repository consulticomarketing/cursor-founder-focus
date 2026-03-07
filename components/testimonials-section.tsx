"use client"

import { useState, useEffect, useRef } from "react"

const testimonials = [
  {
    name: "James Thornton",
    role: "Founder, Thornton Digital",
    content:
      "The idea of spending a full week away to get content done sounded ambitious. It was actually the most productive week I've had in two years of running a business.",
    initials: "JT",
  },
  {
    name: "Sarah McKinlay",
    role: "Founder, Branda Studio",
    content:
      "I left with a VSL, six podcast episodes, and enough social content to last three months. The founder connections were just as valuable.",
    initials: "SM",
  },
  {
    name: "Rory Campbell",
    role: "Founder, Campbell Consulting",
    content:
      "I'd been 'meaning to record my VSL' for eight months. By Tuesday it was done. That's the point of Founder Focus — it just gets done.",
    initials: "RC",
  },
]

const testimonials2 = [
  {
    name: "Priya Shah",
    role: "Founder, Shah Health",
    content:
      "The cohort model is what makes it work. You're around people who are building real businesses and the energy is different to any event I've been to.",
    initials: "PS",
  },
  {
    name: "Tom Aldridge",
    role: "Co-founder, Aldridge Media",
    content:
      "We came as co-founders and left with our whole content strategy mapped out, recorded, and ready to go. Incredible use of seven days.",
    initials: "TA",
  },
  {
    name: "Fiona Grant",
    role: "Founder, Grant Advisory",
    content:
      "Scotland was the perfect backdrop. Being removed from the city, from the emails, from the noise — it genuinely changed how we worked that week.",
    initials: "FG",
  },
]

const duplicated1 = [...testimonials, ...testimonials, ...testimonials]
const duplicated2 = [...testimonials2, ...testimonials2, ...testimonials2]

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef2.current) {
        scrollRef2.current.scrollLeft = scrollRef2.current.scrollWidth / 3
      }
      setIsInitialized(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isPaused || !isInitialized || !scrollRef.current) return
    const el = scrollRef.current
    let rafId: number
    let active = true

    const scroll = () => {
      if (!active || !el) return
      el.scrollLeft += 1
      if (el.scrollLeft >= el.scrollWidth / 3) el.scrollLeft = 0
      rafId = requestAnimationFrame(scroll)
    }
    rafId = requestAnimationFrame(scroll)
    return () => { active = false; cancelAnimationFrame(rafId) }
  }, [isPaused, isInitialized])

  useEffect(() => {
    if (isPaused || !isInitialized || !scrollRef2.current) return
    const el = scrollRef2.current
    let rafId: number
    let active = true

    const scroll = () => {
      if (!active || !el) return
      el.scrollLeft -= 1
      if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 3
      rafId = requestAnimationFrame(scroll)
    }
    rafId = requestAnimationFrame(scroll)
    return () => { active = false; cancelAnimationFrame(rafId) }
  }, [isPaused, isInitialized])

  const Card = ({ t }: { t: { name: string; role: string; content: string; initials: string } }) => (
    <div className="flex-shrink-0 w-full sm:w-[400px] bg-card border border-border rounded-2xl py-4 px-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-white">{t.initials}</span>
        </div>
        <p className="text-foreground leading-relaxed flex-1 text-lg">&ldquo;{t.content}&rdquo;</p>
      </div>
      <div>
        <p className="text-foreground text-sm font-bold">{t.name}</p>
        <p className="text-muted-foreground text-xs">{t.role}</p>
      </div>
    </div>
  )

  return (
    <section id="testimonials" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal leading-tight font-serif">What founders say</h2>
          <p className="text-muted-foreground mt-4 text-sm">Placeholder — real testimonials added after first cohort</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ scrollBehavior: "auto" }}
            >
              {duplicated1.map((t, i) => <Card key={i} t={t} />)}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div
              ref={scrollRef2}
              className="flex gap-6 overflow-x-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ scrollBehavior: "auto" }}
            >
              {duplicated2.map((t, i) => <Card key={i} t={t} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
