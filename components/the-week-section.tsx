"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

const weekDays = [
  {
    day: "Monday",
    focus: "Arrive & Orient",
    description:
      "Arrive at the house, settle in, and meet the cohort. Evening kick-off: align on goals for the week and set the tone for deep work.",
    tags: ["Arrivals", "Team dinner", "Goal-setting"],
    color: "from-slate-400 to-zinc-500",
  },
  {
    day: "Tuesday",
    focus: "VSL Day",
    description:
      "Full day dedicated to scripting and recording Video Sales Letters. Professional setup on-site, director on hand, editing begins same day.",
    tags: ["VSL recording", "Direction", "Same-day edit"],
    color: "from-blue-400 to-indigo-500",
  },
  {
    day: "Wednesday",
    focus: "Podcast & Audio",
    description:
      "Record multiple podcast episodes — solo and with fellow founders as guests. Studio-quality audio, post-production handled for you.",
    tags: ["Podcast recording", "Guest episodes", "Post-production"],
    color: "from-violet-400 to-purple-500",
  },
  {
    day: "Thursday",
    focus: "Social & Ad Creative",
    description:
      "Batch-create social content: reels, talking-head clips, carousels. Afternoon session for ad creative — video and static formats.",
    tags: ["Reels", "Ad creative", "Social batch"],
    color: "from-amber-400 to-orange-500",
  },
  {
    day: "Friday",
    focus: "Sales & Fulfilment",
    description:
      "Deep-work day. Sales calls, outreach, and pipeline work in a focused environment. Accountability pairs keep momentum high.",
    tags: ["Sales calls", "Deep work", "Accountability"],
    color: "from-emerald-400 to-teal-500",
  },
  {
    day: "Saturday",
    focus: "Review & Debrief",
    description:
      "Review the week's output together. Group feedback on content, connections for future collaboration, and plans for what comes next.",
    tags: ["Content review", "Peer feedback", "Next steps"],
    color: "from-rose-400 to-pink-500",
  },
  {
    day: "Sunday",
    focus: "Depart",
    description:
      "Pack up, depart with a full content suite, a renewed sales pipeline, and a network of founders who actually understand what you're building.",
    tags: ["Depart", "Full content library", "Founder network"],
    color: "from-cyan-400 to-blue-500",
  },
]

export function TheWeekSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const positionRef = useRef(0)
  const animationRef = useRef<number>(0)

  const tripled = [...weekDays, ...weekDays, ...weekDays]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const speed = isHovered ? 0.3 : 1
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      positionRef.current += speed * (deltaTime / 16)

      const totalWidth = scrollContainer.scrollWidth / 3
      if (positionRef.current >= totalWidth) positionRef.current = 0

      scrollContainer.style.transform = `translateX(-${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered])

  return (
    <section id="the-week" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Day by day</p>
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">What happens during the week</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Five nights, structured around content creation, deep work, and founder community. Every day has a purpose.
          </p>
        </motion.div>
      </div>

      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={scrollRef} className="flex gap-6 px-6" style={{ width: "fit-content" }}>
          {tripled.map((day, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[380px] bg-card border border-border rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${day.color} mb-6 flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{day.day.slice(0, 2).toUpperCase()}</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{day.day}</p>
              <h3 className="text-xl font-semibold text-foreground mb-4 font-serif">{day.focus}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{day.description}</p>
              <div className="flex flex-wrap gap-2">
                {day.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
