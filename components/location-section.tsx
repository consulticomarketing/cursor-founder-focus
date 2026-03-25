"use client"

import Image from "next/image"
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
              Location to be confirmed—but expect space, quiet, and scenery that puts London and its distractions a
              long way away. The photo below is a potential example of the calibre of property we book; it is not the
              confirmed venue.
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

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-border bg-muted shadow-sm"
        >
          <Image
            src="/location-potential-example.png"
            alt="Potential example of a private country estate—manor exterior, gardens, and interior living spaces suitable for a founder retreat."
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, min(1280px, 90vw)"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-24 pb-5 px-6 md:px-10 md:pb-6">
            <figcaption className="text-left text-xs md:text-sm text-white/95 leading-relaxed max-w-3xl">
              <span className="font-medium text-white">Potential example only.</span> Representative of the kind of
              exclusive-use estate we secure—your confirmed Highlands venue may differ.
            </figcaption>
          </div>
        </motion.figure>
      </div>
    </section>
  )
}
