"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface DestinationCard {
  id: number;
  image: string;
  city: string;
  country: string;
  description: string;
  price: number;
}

const destinations: DestinationCard[] = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "New York",
    country: "United States",
    description: "Experience the vibrant energy of the Big Apple",
    price: 349,
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Paris",
    country: "France",
    description: "Discover the romance of the City of Light",
    price: 429,
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "London",
    country: "United Kingdom",
    description: "Explore the historic capital of England",
    price: 389,
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Tokyo",
    country: "Japan",
    description: "Experience the perfect blend of tradition and modernity",
    price: 599,
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Rome",
    country: "Italy",
    description: "Step back in time in the Eternal City",
    price: 399,
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Sydney",
    country: "Australia",
    description: "Visit one of the world's most iconic harbors",
    price: 749,
  },
];

export default function PopularDestinations() {
  const [current, setCurrent] = useState(0);
  const cardsPerPage = {
    sm: 1,
    md: 2,
    lg: 3,
  };
  
  const totalPages = Math.ceil(destinations.length / cardsPerPage.lg);
  
  const nextSlide = () => {
    setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Popular Destinations</h2>
          <p className="text-muted-foreground mt-2">
            Discover our most popular travel destinations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `calc(-${current * 100}% / ${totalPages})`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: `${totalPages * 100}%` }}
        >
          {destinations.map((destination) => (
            <div key={destination.id} className="w-full sm:w-1/2 md:w-1/3 shrink-0 p-1">
              <Link 
                href="#" 
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={`${destination.city}, ${destination.country}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white">
                      <h3 className="text-lg font-bold">{destination.city}</h3>
                      <p className="text-sm opacity-90">{destination.country}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">From</span>
                      <p className="text-lg font-bold text-blue-600">${destination.price}</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      View Deals
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === current ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}