"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const backgroundImages = [
  "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1920"
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  return (
    <div className="relative h-[600px] sm:h-[650px] overflow-hidden">
      {/* Background Images with Crossfade */}
      {backgroundImages.map((image, index) => (
        <motion.div
          key={image}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          initial={{ opacity: index === 0 ? 1 : 0 }}
          animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Search hundreds of travel sites at once
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Find the best deals on flights, hotels, car rentals, and more
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)}
              >
                Find Flights
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)}
              >
                Find Hotels
              </Button>
            </div>
          </motion.div>
          
          {/* Image Indicators */}
          <div className="absolute bottom-8 flex space-x-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}