"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const trendingDestinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/63/42/de/caption.jpg?w=600&h=600&s=1",
    trend: "+124% searches",
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/59/92/c1/caption.jpg?w=600&h=600&s=1",
    trend: "+98% searches",
  },
  {
    id: 3,
    name: "Cancun",
    country: "Mexico",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5b/8c/a1/caption.jpg?w=600&h=600&s=1",
    trend: "+87% searches",
  },
  {
    id: 4,
    name: "Dubai",
    country: "United Arab Emirates",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cd/4b/74/caption.jpg?w=600&h=600&s=1",
    trend: "+76% searches",
  },
  {
    id: 5,
    name: "Maldives",
    country: "Maldives",
    image: "/placeholder.svg?height=400&width=600",
    trend: "+65% searches",
  },
]

export default function TrendingDestinations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {trendingDestinations.map((destination) => (
          <motion.div
            key={destination.id}
            className="min-w-[280px] md:min-w-[320px]"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/destinations/${destination.id}`}>
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                  <p className="text-muted-foreground">{destination.country}</p>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {destination.trend}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md hidden md:flex"
        onClick={scrollLeft}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md hidden md:flex"
        onClick={scrollRight}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
