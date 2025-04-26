"use client"

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function WinnersSection() {
  return (
    <section className="relative overflow-hidden bg-[#fdf7d9] px-6 md:px-auto py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            className="max-w-xl "
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image src={'https://static.tacdn.com/img2/travelers_choice/2023/TC_badge_yellow.svg'} alt="Travelers' Choice" width={100} height={100} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Travelers' Choice Awards Best of the Best
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Among our top 1% of places, stays, eats, and experiences—decided by you.
            </p>
            <Button 
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-full text-lg"
            >
              See the winners
            </Button>
          </motion.div>
          <div className="rounded-full -rotate-45 overflow-hidden relative">
              <Image 
                src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
                alt="Traveler exploring temple"
                width={1100}
                height={200}
                className="w-full object-cover rotate-45"
                priority
              />
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFB700] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#00AA6C] rounded-full" />
            <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#f43c7d] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}