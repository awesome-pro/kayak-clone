"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedModalDemo } from "./animated-modal"
import { Button } from "./ui/button"

interface SponsorProps {
  className?: string
  variant?: "light" | "dark"
}

export default function Sponsor({ className, variant = "light" }: SponsorProps) {
  const bgColor = variant === "light" ? "bg-[#f5f1fa]" : "bg-[#f0f0f0]"
  
  return (
    <section className={cn("w-full py-8 md:py-12 px-6 md:px-auto", bgColor, className)}>
      <div className="max-w-6xl mx-auto ">
        <div className="rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/17/5b/9c/caption.jpg?w=1200&h=-1&s=1"
                  alt="Woman with dog"
                  width={1200}
                  height={400}
                  className="object-cover w-full h-full rounded-2xl"
                  priority
                />
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
                  alt="TripAdvisor"
                  width={1200}
                  height={400}
                  className="object-contain w-6 h-6 rounded-full"
                  priority
                />
                <p className="text-sm text-gray-600">
                  Sponsored by <span className="font-semibold">CESAR®</span>
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-4">
                  It's easier than ever to go together
                </h2>
                
                <p className="text-base md:text-lg text-gray-700 text-center md:text-left mb-6">
                  Travel is better when you can share it with your 
                  best friend. Find all the tips, guides, and tools you 
                  need to take a dream trip with your dog.
                </p>
                
                <Button size={'lg'} className="bg-black  text-white font-semibold rounded-full hover:bg-teal-500">
                    Book Flight Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}