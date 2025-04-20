"use client"

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WinnersSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF1ED] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#FF5D5D] w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
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

          {/* Right Image */}
          <motion.div 
            className="relative w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
                alt="Traveler exploring temple"
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFB700] rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#00AA6C] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}