import type { Metadata } from "next"
import KayakLandingPage from "@/components/kayak-landing-page"

export const metadata: Metadata = {
  title: "KAYAK | Search Flights, Hotels & Rental Cars",
  description:
    "Search hundreds of travel sites at once for flights, hotels, and rental cars. KAYAK compares prices to help you find the best travel deals.",
}

export default function Home() {
  return <KayakLandingPage />
}
