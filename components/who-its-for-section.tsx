"use client"

import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

const forYou = [
  "You're running a business but have no content strategy — or the content you have isn't converting.",
  "You know what you need to create but keep deprioritising it for client work.",
  "You want to grow through video, podcast, or paid ads but haven't started.",
  "You work better in a structured, in-person environment than alone at a desk.",
  "You want peer founders who are at a similar stage — not a room full of beginners.",
]

const notForYou = [
  "You're looking for a passive retreat — this one is high output.",
  "You're pre-revenue and not yet ready to invest in content at scale.",
  "You can't commit to the full five nights.",
]

export function WhoItsForSection() {
  return (
    <section id="who-its-for" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center pointer-events-none z-0">
        <span className="font-bold text-center text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] leading-none tracking-tighter text-zinc-100 whitespace-nowrap font-serif">
          QUALIFY
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Is this for you?</p>
            <h2 className="text-4xl md:text-5xl font-normal leading-tight font-serif">
              Who Founder Focus is built for
            </h2>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-8"
          >
            <h3 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </span>
              This is for you if...
            </h3>
            <ul className="space-y-4">
              {forYou.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-8"
          >
            <h3 className="text-base font-semibold text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center">
                <X className="w-3 h-3 text-zinc-500" strokeWidth={2.5} />
              </span>
              This isn&apos;t for you if...
            </h3>
            <ul className="space-y-4">
              {notForYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-0.5 shrink-0 text-zinc-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#waitlist"
            className="relative inline-flex items-center justify-center gap-0 bg-foreground text-background rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden"
          >
            <span className="text-sm pr-4 font-medium">Join the Waitlist</span>
            <span className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-foreground" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
