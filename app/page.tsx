import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Hotel, Utensils, Ticket, Coffee, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search-bar"
import PopularDestinations from "@/components/popular-destinations"
import TrendingDestinations from "@/components/trending-destinations"
import TopExperiences from "@/components/top-experiences"
import TripIdeas from "@/components/trip-ideas"
import Footer from "@/components/footer"
import { ReviewsSection } from "@/components/recent-reviews"
import { WinnersSection } from "@/components/winner"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" width={150} height={40} className="h-10 w-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium flex items-center gap-1">
              <Hotel className="h-4 w-4" />
              Hotels
            </Link>
            <Link href="#" className="text-sm font-medium flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              Restaurants
            </Link>
            <Link href="#" className="text-sm font-medium flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              Things to Do
            </Link>
            <Link href="#" className="text-sm font-medium flex items-center gap-1">
              <Coffee className="h-4 w-4" />
              Vacation Rentals
            </Link>
            <Link href="#" className="text-sm font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Travel Stories
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden md:flex text-sm font-medium">
              Review
            </Link>
            <Link href="#" className="hidden md:flex text-sm font-medium">
              Trips
            </Link>
            <Link href="#" className="hidden md:flex text-sm font-medium">
              Alerts
            </Link>
            <Link href="#" className="hidden md:flex text-sm font-medium">
              Sign in
            </Link>
            <Button size="sm" className="hidden md:flex bg-black hover:bg-gray-800">
              Join
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
          <div className="relative h-[500px] w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Travel destinations"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Find your perfect trip
            </h1>
            <p className="mt-4 max-w-[600px] text-white md:text-xl">
              Plan and book your next adventure with recommendations from travelers like you
            </p>
            <div className="mt-8 w-full max-w-3xl">
              <Suspense fallback={<div className="h-14 bg-white/20 rounded-full animate-pulse" />}>
                <SearchBar />
              </Suspense>
            </div>
          </div>
        </section>

        <PopularDestinations />

        <TrendingDestinations />

        <TopExperiences />

        <ReviewsSection />

        <TripIdeas />
        <WinnersSection />
      </main>
      <Footer />
    </div>
  )
}
