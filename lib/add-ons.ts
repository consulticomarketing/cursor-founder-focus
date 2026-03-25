/**
 * Optional retreat add-ons — single source for homepage (#add-ons) and onboarding.
 */
export const RETREAT_ADD_ONS = [
  {
    id: "vsl",
    title: "VSL",
    description:
      "Script-to-screen video sales letter production - direction, recording, and edit to a standard that matches how you sell.",
  },
  {
    id: "podcast_mentoring",
    title: "Production-grade podcast mentoring & storyboarding",
    description:
      "Hands-on help shaping episodes, narrative arcs, and episode plans so what you record in the week lands as a coherent show.",
  },
  {
    id: "content_management",
    title: "Content management & release",
    description:
      "Planning and coordination so episodes, clips, and assets don't stall after you leave - clear next steps for publish and distribution.",
  },
  {
    id: "executive_assistant",
    title: "Executive assistant for the week",
    description:
      "Dedicated support on-site - scheduling, follow-ups, and admin cleared so you stay in creator mode, not inbox mode.",
  },
] as const

export type RetreatAddOnId = (typeof RETREAT_ADD_ONS)[number]["id"]
