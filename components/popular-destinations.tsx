'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function BeachDestinationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const destinations = [
    {
      id: 1,
      region: 'Europe',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/50/7b/caption.jpg?w=600&h=-1&s=1",
      rating: 4.8,
      badge: '2025'
    },
    {
      id: 2,
      region: 'Asia',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/50/f6/caption.jpg?w=600&h=-1&s=1",
      rating: 4.7,
      badge: '2025'
    },
    {
      id: 3,
      region: 'South Pacific',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/51/0b/caption.jpg?w=600&h=-1&s=1",
      rating: 4.6,
      badge: '2025'
    },
    {
      id: 4,
      region: 'Caribbean',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/51/9a/caption.jpg?w=600&h=-1&s=1",
      rating: 4.7,
      badge: '2025'
    },
    {
      id: 5,
      region: 'Americas',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c1/4f/f7/caption.jpg?w=600&h=-1&s=1",
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
    <div className="mx-auto px-4 py-8 max-w-screen lg:max-w-6xl overflow-scroll">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Explore the world's most stunning seasides</h2>
        <p className="text-slate-700 text-md">2025's Travelers' Choice Awards Best of the Best Beaches</p>
      </div>
      
      {/* Carousel Container */}
      <div className="relative">
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