"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

type Props = {
  className?: string
  label?: string
}

export function DepositButton({ className, label = "Pay deposit & reserve" }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleClick() {
    setState("loading")
    setMessage("")
    try {
      const res = await fetch("/api/checkout", { method: "POST" })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok) throw new Error(data.error || "Could not start checkout.")
      if (data.url) {
        window.location.href = data.url
        return
      }
      throw new Error("No checkout URL returned.")
    } catch (e) {
      setState("error")
      setMessage(e instanceof Error ? e.message : "Something went wrong.")
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <button
        type="button"
        onClick={handleClick}
        disabled={state === "loading"}
        className={
          className ??
          "relative flex w-full sm:w-auto items-center justify-center gap-0 bg-foreground text-background rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
        }
      >
        <span className="text-sm pr-4 font-medium py-2.5">
          {state === "loading" ? "Redirecting to secure checkout…" : label}
        </span>
        <span className="w-10 h-10 bg-background rounded-full flex items-center justify-center ml-auto">
          <ArrowUpRight className="w-4 h-4 text-foreground" />
        </span>
      </button>
      {state === "error" && <p className="text-sm text-red-500 mt-3 text-center sm:text-left">{message}</p>}
    </div>
  )
}
