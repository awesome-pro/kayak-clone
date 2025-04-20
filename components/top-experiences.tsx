"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    title: "Skip-the-Line Colosseum Tour",
    location: "Rome, Italy",
    image: "/placeholder.svg?height=400&width=600",
    price: 59.99,
    rating: 4.8,
    reviewCount: 3245,
  },
  {
    id: 2,
    title: "Eiffel Tower Summit Access",
    location: "Paris, France",
    image: "/placeholder.svg?height=400&width=600",
    price: 79.99,
    rating: 4.7,
    reviewCount: 2876,
  },
  {
    id: 3,
    title: "Sagrada Familia Guided Tour",
    location: "Barcelona, Spain",
    image: "/placeholder.svg?height=400&width=600",
    price: 49.99,
    rating: 4.9,
    reviewCount: 4532,
  },
  {
    id: 4,
    title: "Grand Canyon Helicopter Tour",
    location: "Las Vegas, USA",
    image: "/placeholder.svg?height=400&width=600",
    price: 299.99,
    rating: 4.8,
    reviewCount: 1987,
  },
  {
    id: 5,
    title: "Tokyo Food Tour",
    location: "Tokyo, Japan",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    rating: 4.9,
    reviewCount: 2345,
  },
]

export default function TopExperiences() {
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
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            className="min-w-[280px] md:min-w-[320px]"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/experiences/${experience.id}`}>
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white text-black hover:bg-white/90">From ${experience.price}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2">{experience.title}</h3>
                  <p className="text-muted-foreground">{experience.location}</p>
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center text-yellow-500">
                      <Star className="mr-1 h-4 w-4 fill-current" />
                      <span>{experience.rating}</span>
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">({experience.reviewCount} reviews)</span>
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
