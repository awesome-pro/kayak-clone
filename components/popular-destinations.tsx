"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/50/7b/caption.jpg?w=600&h=-1&s=1",
    rating: 4.8,
    reviewCount: 12453,
  },
  {
    id: 2,
    name: "Rome",
    country: "Italy",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/50/f6/caption.jpg?w=600&h=-1&s=1",
    rating: 4.7,
    reviewCount: 10982,
  },
  {
    id: 3,
    name: "London",
    country: "United Kingdom",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/51/0b/caption.jpg?w=600&h=-1&s=1",
    rating: 4.6,
    reviewCount: 15321,
  },
  {
    id: 4,
    name: "Barcelona",
    country: "Spain",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/51/9a/caption.jpg?w=600&h=-1&s=1",
    rating: 4.7,
    reviewCount: 9876,
  },
  {
    id: 5,
    name: "New York",
    country: "United States",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/4f/f7/caption.jpg?w=600&h=-1&s=1",
    rating: 4.5,
    reviewCount: 18432,
  },
  {
    id: 6,
    name: "Tokyo",
    country: "Japan",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/51/9a/caption.jpg?w=600&h=-1&s=1",
    rating: 4.9,
    reviewCount: 7654,
  },
]

export default function PopularDestinations() {
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
        {destinations.map((destination) => (
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
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white text-black hover:bg-white/90">
                      {destination.rating} ★ ({destination.reviewCount})
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                  <p className="text-muted-foreground">{destination.country}</p>
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
