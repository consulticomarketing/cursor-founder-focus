"use client"

import { useEffect, useState } from "react"

function useCountUp(end: number, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  return { value: count + suffix, start: () => setHasStarted(true), hasStarted }
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  const nights = useCountUp(4, 1500, "")
  const founders = useCountUp(21, 1500, "")
  const pieces = useCountUp(4, 1500, "")
  const retreats = useCountUp(1, 800, "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          nights.start()
          founders.start()
          pieces.start()
          retreats.start()
        }
      },
      { threshold: 0.3 },
    )
    const section = document.getElementById("stats-section")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [isVisible])

  const stats = [
    { stat: nights, label: "Nights at the retreat" },
    { stat: founders, label: "Founders per cohort" },
    { stat: pieces, label: "Content types produced" },
    { stat: retreats, label: "Retreat. Fully focused." },
  ]

  return (
    <section id="stats-section" className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {stats.map(({ stat, label }, i) => (
            <div
              key={label}
              className={`text-center transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <p className="font-light text-foreground mb-2 text-6xl md:text-7xl leading-none">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
