"use client"

import { motion } from "framer-motion"

export function LocationSection() {
  return (
    <section id="location" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">The Venue</p>
            <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">
              A private estate in the Scottish Highlands
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Location to be confirmed - but expect space, quiet, and scenery that puts London and its distractions
              a long way away.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {[
            {
              title: "Private estate",
              description: "The whole property is yours for the retreat. No other guests. No interruptions.",
              emoji: "🏡",
            },
            {
              title: "Studio setup",
              description: "Professional content production setup on-site - cameras, lighting, audio, editing.",
              emoji: "🎬",
            },
            {
              title: "Fully catered",
              description: "Meals taken care of. No cooking, no admin - just work and connection.",
              emoji: "🍽️",
            },
            {
              title: "Fast broadband",
              description: "Working rooms, reliable internet, and space to think clearly.",
              emoji: "⚡",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl p-6 hover:bg-zinc-50 transition-colors duration-300"
            >
              <div className="text-3xl mb-4">{item.emoji}</div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Image placeholder block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-200 via-zinc-100 to-stone-200 flex items-center justify-center border border-border"
        >
          <div className="text-center">
            <p className="text-6xl mb-4">🏴󠁧󠁢󠁳󠁣󠁴󠁿</p>
            <p className="text-muted-foreground text-sm font-medium">Venue photo coming soon</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Scottish Highlands · May 2026</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
