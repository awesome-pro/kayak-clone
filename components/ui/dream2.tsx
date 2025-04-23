'use client';

import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function Dream2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const destinations = [
    {
      id: 1,
      region: 'Las Vegas, NV',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/34/2d/28/caption.jpg?w=600&h=600&s=1&cx=662&cy=604&chk=v1_8984ddf3493edfb8c896",
      rating: 4.8,
      badge: '2025'
    },
    {
      id: 2,
      region: 'Reyklavik, Iceland',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/84/4d/17/caption.jpg?w=600&h=600&s=1",
      rating: 4.7,
      badge: '2025'
    },
    {
      id: 3,
      region: 'London, UK',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/af/70/3c/the-white-tower-the-norman.jpg?w=600&h=-1&s=1",
      rating: 4.6,
      badge: '2025'
    },
    {
      id: 4,
      region: 'Florance, Italy',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/dc/8a/caption.jpg?w=600&h=600&s=1",
      rating: 4.7,
      badge: '2025'
    },
    {
      id: 5,
      region: 'Barcelona, Spain',
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/ae/5d/da/caption.jpg?w=600&h=600&s=1",
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <p className="text-slate-700 text-2xl font-semibold">Top Destinations for you</p>
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
              className="min-w-[300px] sm:min-w-[320px] md:min-w-[280px] flex-shrink-0 snap-start rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full">
                <img 
                  src={destination.image} 
                  alt={`${destination.region} beaches`}
                  className="w-full h-full object-cover"
                />
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