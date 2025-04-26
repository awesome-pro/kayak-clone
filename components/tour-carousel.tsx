'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';

interface TourCardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  isLikelyToSellOut?: boolean;
  badge?: string;
}

export default function TourCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Delhi tour data
  const delhiTours = [
    {
      id: 1,
      title: "Full Day Old and New Delhi City Tour",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/db/8f/99/caption.jpg?w=600&h=600&s=1",
      rating: 4.9,
      reviewCount: 2816,
      price: 37,
      currency: "$",
      badge: "2024"
    },
    {
      id: 2,
      title: "All Inclusive Day Trip to Taj Mahal, Agra Fort and Baby Taj from Delhi by Car",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5a/ea/82/caption.jpg?w=600&h=600&s=1",
      rating: 4.7,
      reviewCount: 315,
      price: 45,
      currency: "$",
      isLikelyToSellOut: true
    },
    {
      id: 3,
      title: "Private Sunrise Taj Mahal Trip from Delhi all Inclusive",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/7f/47/3a/caption.jpg?w=600&h=600&s=1",
      rating: 4.9,
      reviewCount: 1458,
      price: 88,
      currency: "$"
    },
    {
      id: 4,
      title: "Same Day Taj Mahal, Agra Fort & Baby Taj Tour from Delhi by Car",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/67/e5/07/caption.jpg?w=600&h=600&s=1",
      rating: 4.9,
      reviewCount: 2787,
      price: 57,
      currency: "$"
    },
    {
      id: 5,
      title: "Delhi to Agra and Taj Mahal Private Day Trip by Express Train with Lunch",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/1a/b2/8e/caption.jpg?w=600&h=600&s=1",
      rating: 4.8,
      reviewCount: 1245,
      price: 69,
      currency: "$"
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
    } else if (direction === 'right' && currentIndex < delhiTours.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to render star ratings
  const renderRating = (rating: number, reviewCount: number) => {
    return (
      <div className="flex items-center">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-green-500' : 'text-gray-300'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
        <span className="ml-1 text-sm text-gray-500">({reviewCount.toLocaleString()})</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 overflow-scroll">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Ways to tour New Delhi</h2>
        <p className="text-slate-700 text-md">Book these experiences for a close-up look at New Delhi.</p>
      </div>
      
      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Button - Left */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all"
          aria-label="Previous slide"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        {/* Carousel Track */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar overflow-scroll"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {delhiTours.map((tour) => (
            <div 
              key={tour.id}
              className="min-w-[280px] snap-start rounded-xl overflow-hidden relative group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                {/* Heart Icon */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-700" />
                </button>
                
                {/* Badge */}
                {tour.badge && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    {tour.badge}
                  </div>
                )}
                
                {/* Likely to Sell Out */}
                {tour.isLikelyToSellOut && (
                  <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded border border-black">
                    LIKELY TO SELL OUT
                  </div>
                )}
              </div>
              
              {/* Tour Details */}
              <div className="mt-3">
                <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[48px]">{tour.title}</h3>
                {renderRating(tour.rating, tour.reviewCount)}
                <p className="mt-1 text-sm text-gray-900">
                  from <span className="font-bold">{tour.currency}{tour.price}</span> per adult
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Button - Right */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all rotate-180"
          aria-label="Next slide"
          disabled={currentIndex === delhiTours.length - 1}
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
