"use client"

import { motion } from "framer-motion"
import { Video, Mic, LayoutGrid, UserRound, type LucideIcon } from "lucide-react"
import { RETREAT_ADD_ONS } from "@/lib/add-ons"

const ADD_ON_ICONS: Record<string, LucideIcon> = {
  vsl: Video,
  podcast_mentoring: Mic,
  content_management: LayoutGrid,
  executive_assistant: UserRound,
}

export function AddOnsSection() {
  return (
    <section id="add-ons" className="py-32 px-6 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-950 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest text-white/50 mb-4">Optional</p>
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif text-white">Add-ons</h2>
          <p className="text-white/65 leading-relaxed text-lg">
            Each add-on is its own thing - pick what you need and we&apos;ll quote and confirm it for your cohort.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {RETREAT_ADD_ONS.map((item, i) => {
            const Icon = ADD_ON_ICONS[item.id] ?? Video
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white/90" strokeWidth={1.25} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold font-serif text-white mb-3">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-white/45 text-sm mt-12 max-w-xl mx-auto"
        >
          When you reserve or in onboarding, say which add-ons you want - we&apos;ll confirm availability and pricing for
          each.
        </motion.p>
      </div>
    </section>
  )
}
