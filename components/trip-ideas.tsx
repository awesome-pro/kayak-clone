"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const tripIdeas = [
  {
    id: 1,
    title: "Weekend Getaways Near You",
    description: "Perfect short trips just a few hours away",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=600&h=600&s=1",
  },
  {
    id: 2,
    title: "Family-Friendly Destinations",
    description: "Places the whole family will love",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=600&h=600&s=1",
  },
  {
    id: 3,
    title: "Budget-Friendly Europe",
    description: "See Europe without breaking the bank",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/34/2d/28/caption.jpg?w=600&h=600&s=1&cx=662&cy=604&chk=v1_8984ddf3493edfb8c896",
  },
  {
    id: 4,
    title: "Romantic Escapes",
    description: "Idyllic destinations for couples",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/84/4d/17/caption.jpg?w=600&h=600&s=1",
  },
  {
    id: 5,
    title: "Adventure Travel",
    description: "Thrilling experiences for adrenaline seekers",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/af/70/3c/the-white-tower-the-norman.jpg?w=600&h=-1&s=1",
  },
]

export default function TripIdeas() {
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
        {tripIdeas.map((idea) => (
          <motion.div
            key={idea.id}
            className="min-w-[280px] md:min-w-[320px]"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/trip-ideas/${idea.id}`}>
              <Card className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={idea.image || "/placeholder.svg"}
                    alt={idea.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="font-semibold text-lg">{idea.title}</h3>
                    <p className="text-sm text-white/80">{idea.description}</p>
                  </div>
                </div>
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
