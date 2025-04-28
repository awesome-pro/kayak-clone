'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function Dream() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const destinations = [
    {
      id: 1,
      region: 'Rishikesh',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4d/47/32/rishikesh.jpg?w=600&h=600&s=1",
      rating: 4.8,
      badge: '2025'
    },
    {
      id: 2,
      region: 'Mussoorie',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4d/45/b7/mussoorie.jpg?w=600&h=600&s=1",
      rating: 4.7,
      badge: '2025'
    },
    {
      id: 3,
      region: 'Dehradun',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/de/e2/78/view-from-upwards.jpg?w=600&h=600&s=1",
      rating: 4.6,
      badge: '2025'
    },
    {
      id: 4,
      region: 'Jim Corbett',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/1e/0d/db/the-magnificent-corbett.jpg?w=600&h=600&s=1",
      rating: 4.7,
      badge: '2025'
    },
    {
      id: 5,
      region: 'Vrindavan',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/ee/20/c6/glittering-amber-light.jpg?w=600&h=600&s=1",
      rating: 4.5,
      badge: '2025'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cardWidth = container.querySelector('div')?.clientWidth || 0;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < destinations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="max-w-screen lg:max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Dream Your Next Trip</h2>
        <p className="text-slate-700 text-lg">Weekend getaways from New Delhi</p>
      </div>
      
      {/* Carousel Container */}
      <div className="relative max-w-screen">
        {/* Navigation Button - Left */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        {/* Carousel Track */}
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar overflow-scroll"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className="min-w-[300px] sm:min-w-[320px] md:min-w-[280px] flex-shrink-0 snap-start rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full">
                <img 
                  src={destination.image} 
                  alt={`${destination.region} beaches`}
                  className="w-full h-full object-cover"
                />
              {/* White overlay on hover */}
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-black/10">
                <h3 className="text-2xl font-bold text-white">{destination.region}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Button - Right */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all rotate-180"
          aria-label="Next slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      
      {/* Custom styling to hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}