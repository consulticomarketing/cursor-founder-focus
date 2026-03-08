"use client"

import Image from "next/image"
import { Camera, Mic, Share2, Video, Shield, Users } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const services = [
  {
    icon: Video,
    title: "VSL Recording",
    description:
      "A professional video sales letter recorded, directed, and edited for your business — ready to convert.",
  },
  {
    icon: Mic,
    title: "Podcast Episodes",
    description:
      "Record multiple podcast episodes with fellow founders and guest co-hosts in a properly equipped studio.",
  },
  {
    icon: Share2,
    title: "Social Media Content",
    description:
      "A full batch of reels, carousels, and short-form clips — enough to stay consistent for months.",
  },
  {
    icon: Camera,
    title: "Ad Creative",
    description: "Video and static ad creative recorded and produced, ready to launch on Meta, YouTube, or LinkedIn.",
  },
  {
    icon: Shield,
    title: "Fulfilment Time",
    description:
      "Protected deep-work sessions every day. Sales calls, outreach, and accountability with a small group who gets it.",
  },
  {
    icon: Users,
    title: "Founder Community",
    description:
      "Shared space, shared meals, and evening sessions with founders at a similar stage — no beginners, no tourists.",
  },
]

function AnimatedIcon({ Icon, delay = 0 }: { Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 },
    )
    if (iconRef.current) observer.observe(iconRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={iconRef} className="relative">
      <Icon
        className={`text-foreground h-16 w-16 ${isVisible ? "animate-draw-icon" : ""}`}
        strokeWidth={1}
      />
    </div>
  )
}

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 px-6 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-0">
        <span className="font-bold text-center text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] leading-none tracking-tighter text-zinc-100 whitespace-nowrap font-serif">
          MISSION
        </span>
      </div>

      <style jsx>{`
        @keyframes drawPath {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        :global(.animate-draw-icon) :global(path),
        :global(.animate-draw-icon) :global(line),
        :global(.animate-draw-icon) :global(polyline),
        :global(.animate-draw-icon) :global(circle),
        :global(.animate-draw-icon) :global(rect) {
          animation: drawPath 2s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mission hero block */}
        <div
          ref={sectionRef}
          className="relative px-6 lg:px-16 py-16 lg:py-20 mb-32 overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 w-full h-full">
            {/* Background image: right on desktop, full behind text on tablet/mobile */}
            <Image
              src="/about-recording.png"
              alt="Founder Focus recording session — professional interview setup in a studio environment"
              fill
              className="object-cover object-center lg:object-right"
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority={false}
            />
            <div
              className={`absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-900/85 via-zinc-800/75 to-stone-900/70 transition-transform duration-1000 ease-out ${
                isVisible ? "scale-100" : "scale-110"
              }`}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-1 lg:order-2">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70 font-medium mb-4">Our mission</p>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-white text-balance mb-8">
                Give founders a week they&apos;ll build their business on
              </h2>
              <div className="space-y-5 text-white/80 leading-relaxed">
                <p>
                  Most founders know what content they need to create. They don&apos;t have the time, the setup, or the
                  environment to actually do it. Founder Focus Events fixes that in a week.
                </p>
                <p>
                  We bring a cohort of UK founders to a large private house in Scotland for five nights — with
                  professional production, structured work time, and the kind of peer energy that makes things happen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">
            Everything that happens in the week
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Content production, sales focus, and founder community — all in one structured, five-night retreat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl hover:bg-zinc-50 transition-colors duration-300 text-center"
            >
              <div className="mb-6 flex justify-center">
                <AnimatedIcon Icon={service.icon} delay={index * 0.2} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
