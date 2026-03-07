"use client"

import { useEffect, useState } from "react"
import { AnimatedText } from "./animated-text"
import { ArrowUpRight, ArrowRight } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let rafId: number
    let currentProgress = 0

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 400
      const targetProgress = Math.min(scrollY / maxScroll, 1)

      const smoothUpdate = () => {
        currentProgress += (targetProgress - currentProgress) * 0.1
        if (Math.abs(targetProgress - currentProgress) > 0.001) {
          setScrollProgress(currentProgress)
          rafId = requestAnimationFrame(smoothUpdate)
        } else {
          setScrollProgress(targetProgress)
        }
      }

      cancelAnimationFrame(rafId)
      smoothUpdate()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const easeOutQuad = (t: number) => t * (2 - t)
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const scale = 1 - easeOutQuad(scrollProgress) * 0.15
  const borderRadius = easeOutCubic(scrollProgress) * 48
  const heightVh = 100 - easeOutQuad(scrollProgress) * 37.5

  return (
    <section className="pt-32 pb-12 px-6 min-h-screen flex items-center relative overflow-hidden bg-zinc-950">
      {/* Atmospheric background */}
      <div className="absolute inset-0 top-0">
        <div
          className="w-full will-change-transform overflow-hidden"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            height: `${heightVh}vh`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-stone-950" />
          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Large watermark brand text */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-[5] flex items-end justify-center"
        style={{
          transform: `translateY(${scrollProgress * 150}px)`,
          opacity: 1 - scrollProgress * 0.8,
          height: "100%",
        }}
      >
        <span className="block text-white/10 font-bold text-[28vw] sm:text-[25vw] md:text-[22vw] lg:text-[20vw] tracking-tighter select-none text-center leading-none font-serif">
          FOCUS
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <div
            className={`transition-all duration-1000 delay-[400ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          >
            <p className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-widest text-white/70 uppercase backdrop-blur-sm">
              Scotland — 2025
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-[600ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          >
            <h1 className="font-serif text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-normal leading-tight mb-6 w-full px-4 max-w-5xl mx-auto text-balance text-white">
              <AnimatedText text="One week. Every piece of content your business needs." delay={0.3} className="font-serif text-white" />
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-[800ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/60">
              A small-group retreat in a large Scottish house — seven days of content creation, dedicated sales time,
              and real founder community. Leave with your VSL, podcast, social media, and ads done.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#waitlist"
                className="relative flex items-center justify-center gap-0 bg-white text-black rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden"
              >
                <span className="text-sm pr-4 font-medium">Join the Waitlist</span>
                <span className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </a>

              <a
                href="#the-week"
                className="relative flex items-center justify-center gap-0 border border-white/30 rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-white rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300" />
                <span className="text-sm text-white group-hover:text-black pr-4 relative z-10 transition-colors duration-300 font-medium">
                  See the programme
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10">
                  <ArrowRight className="w-4 h-4 text-white group-hover:opacity-0 absolute transition-opacity duration-300" />
                  <ArrowUpRight className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
              </a>
            </div>

            <p className="mt-6 text-sm text-white/30">Limited spots — UK founders only</p>
          </div>
        </div>
      </div>
    </section>
  )
}
