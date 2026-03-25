"use client"

import { motion } from "framer-motion"
import { EVENT_DATES_LABEL } from "@/lib/site"

/**
 * Day-by-day schedule for the retreat. Edit `weekDays` to update copy.
 */
const weekDays = [
  {
    day: "Monday",
    focus: "Arrive, connect, exhale",
    description:
      "You land, drop your bags, and meet the room—no agenda crush on day one. Expect real conversation over good food, easy networking, and space to unwind before the week picks up pace.",
    tags: ["Arrivals", "Networking", "Food & leisure"],
    accent: "border-l-slate-400",
  },
  {
    day: "Tuesday",
    focus: "Create with the crew",
    description:
      "Booked slots with the podcast and video team, fulfilment space to actually ship client work, and recording blocks that go from idea to usable assets. After hours: a mastermind session, plus optional one-to-one time with other founders—trade tactics, intros, and hard-won lessons in private.",
    tags: ["Podcast & video", "Fulfilment", "Recording", "Evening mastermind", "Founder 1:1s (optional)"],
    accent: "border-l-blue-500",
  },
  {
    day: "Wednesday",
    focus: "Same engine, a lighter evening",
    description:
      "Same rhythm as Tuesday: creation windows with crew, space to fulfil and record, and the evening mastermind. Instead of founder 1:1s, there’s an optional entertainment slot—so you can switch off together without losing the group energy.",
    tags: ["Podcast & video", "Fulfilment", "Recording", "Evening mastermind", "Entertainment (optional)"],
    accent: "border-l-violet-500",
  },
  {
    day: "Thursday",
    focus: "The knowledge & growth day",
    description:
      "We tilt from production to leverage: an agency-growth mastermind, dedicated workspace blocks for fulfilment and sales, then an online-growth mastermind—how you win attention, pipeline, and compounding reach after you leave the house.",
    tags: ["Agency growth", "Fulfilment & sales workspace", "Online growth mastermind"],
    accent: "border-l-amber-500",
  },
  {
    day: "Friday",
    focus: "Close the loop, then go",
    description:
      "Final activities to land the week—last conversations, loose ends tied, relationships that don’t end at checkout. You leave on your terms, with the work moved forward and a network that keeps working after the last handshake.",
    tags: ["Final sessions", "Networking", "Departures"],
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
            Four nights, Monday through Friday—land softly, stack output mid-week, then double down on how the business scales. {EVENT_DATES_LABEL}.
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
