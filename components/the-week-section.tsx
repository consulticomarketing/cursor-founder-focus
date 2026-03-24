"use client"

import { motion } from "framer-motion"
import { EVENT_DATES_LABEL } from "@/lib/site"

/**
 * Day-by-day schedule for the retreat. Edit `weekDays` to update copy.
 */
const weekDays = [
  {
    day: "Monday",
    focus: "Arrive & Orient",
    description:
      "Arrive at the house, settle in, and meet the cohort. Evening kick-off: align on goals for the week and set the tone for deep work.",
    tags: ["Arrivals", "Team dinner", "Goal-setting"],
    accent: "border-l-slate-400",
  },
  {
    day: "Tuesday",
    focus: "Studio & long-form",
    description:
      "Deep studio day for podcast episodes, interviews, and supporting video - crew, lighting, and audio dialled in for release-ready capture.",
    tags: ["Podcast", "Interviews", "Studio capture"],
    accent: "border-l-blue-500",
  },
  {
    day: "Wednesday",
    focus: "Podcast & Audio",
    description:
      "Record multiple podcast episodes - solo and with fellow founders as guests. Studio-quality audio, post-production handled for you.",
    tags: ["Podcast recording", "Guest episodes", "Post-production"],
    accent: "border-l-violet-500",
  },
  {
    day: "Thursday",
    focus: "Social & Ad Creative",
    description:
      "Batch-create social content: reels, talking-head clips, carousels. Afternoon session for ad creative - video and static formats.",
    tags: ["Reels", "Ad creative", "Social batch"],
    accent: "border-l-amber-500",
  },
  {
    day: "Friday",
    focus: "Review, sales & depart",
    description:
      "Morning review of the week's output, then sales and pipeline work. Afternoon depart with a full content suite, a clearer pipeline, and a network of founders who get what you're building.",
    tags: ["Content review", "Sales", "Depart"],
    accent: "border-l-emerald-500",
  },
]

export function TheWeekSection() {
  return (
    <section id="the-week" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16 max-w-2xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Day by day</p>
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">What happens during the week</h2>
          <p className="text-muted-foreground leading-relaxed">
            Four nights, Monday to Friday. {EVENT_DATES_LABEL}.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-5 md:gap-6">
          {weekDays.map((d) => (
            <article
              key={d.day}
              className={`rounded-2xl border border-border bg-card pl-5 pr-6 py-6 md:pl-6 md:pr-8 md:py-8 border-l-4 ${d.accent} shadow-sm`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{d.day}</span>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground">{d.focus}</h3>
                </div>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">{d.description}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {d.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
