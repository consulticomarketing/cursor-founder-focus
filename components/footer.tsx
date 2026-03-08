import Link from "next/link"
import { Linkedin } from "lucide-react"

const footerLinks = {
  programme: [
    { label: "The Week", href: "#the-week" },
    { label: "Who It's For", href: "#who-its-for" },
    { label: "Location", href: "#location" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "Wilson Vincent Events", href: "https://www.linkedin.com/company/wilson-vincent-events" },
    { label: "About", href: "#about" },
  ],
  legal: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ],
  connect: [
    { label: "Join the Waitlist", href: "#waitlist" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
}

export function Footer() {
  return (
    <div className="relative">
      <div className="absolute -top-[6vw] sm:-top-[8vw] lg:-top-[10vw] left-0 right-0 flex items-end justify-center overflow-visible pointer-events-none z-10">
        <h2 className="font-bold text-center text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] leading-[0.85] tracking-tighter text-zinc-100 whitespace-nowrap font-serif">
          FOCUS
        </h2>
      </div>

      <footer id="contact" className="relative z-20 border-t border-border py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <span className="text-base font-medium text-foreground font-serif">Founder Focus</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6">One week. Every piece of content your business needs.</p>
              <div className="flex gap-4">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Programme</h4>
              <ul className="space-y-3">
                {footerLinks.programme.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Founder Focus Events. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              A{" "}
              <Link href="https://www.linkedin.com/company/wilson-vincent-events" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
                Wilson Vincent Events
              </Link>{" "}
              initiative
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
