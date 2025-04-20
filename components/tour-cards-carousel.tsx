'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TourCard {
  id: number;
  title: string;
  image: string;  
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  badge?: string;
  isFavorite?: boolean;
  isLikelyToSellOut?: boolean;
}

interface TourCardsCarouselProps {
  title: string;
  subtitle: string;
  tours: TourCard[];
}

export default function TourCardsCarousel({ title, subtitle, tours }: TourCardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [visibleCards, setVisibleCards] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calculate number of visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1.2); // Show 1 card with a peek at the next on mobile
      } else if (width < 768) {
        setVisibleCards(2);
      } else if (width < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cardWidth = container.clientWidth / visibleCards;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < tours.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Function to render stars based on rating
  const renderRatingStars = (rating: number, reviewCount: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        <div className="flex mr-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4">
              <svg 
                viewBox="0 0 24 24" 
                fill={i < fullStars ? "#00aa6c" : (i === fullStars && hasHalfStar ? "url(#half-green)" : "none")} 
                stroke="#00aa6c" 
                strokeWidth="2"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="half-green" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor="#00aa6c" />
                    <stop offset="50%" stopColor="white" />
                  </linearGradient>
                </defs>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500 ml-1">({reviewCount.toLocaleString()})</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-700">{subtitle}</p>
      </div>
      
      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Button - Left */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        {/* Carousel Track */}
        <div 
          ref={carouselRef}
          className="grid grid-flow-col auto-cols-fr gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            gridAutoColumns: `calc((100% - ${(visibleCards - 1) * 16}px) / ${visibleCards})`
          }}
        >
          {tours.map((tour) => (
            <motion.div 
              key={tour.id}
              whileHover={{ y: -5 }}
              className="h-full flex-shrink-0 snap-start rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge */}
                {tour.badge && (
                  <div className="absolute bottom-2 left-2 bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded-md">
                    {tour.badge}
                  </div>
                )}
                
                {/* Favorite Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(tour.id);
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart 
                    className={cn(
                      "h-5 w-5 transition-colors", 
                      favorites.includes(tour.id) ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
                    )} 
                  />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-4 flex flex-col h-[calc(100%-33.33%)]">
                {tour.isLikelyToSellOut && (
                  <div className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 mb-2 rounded-sm font-medium self-start">
                    LIKELY TO SELL OUT
                  </div>
                )}
                
                <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 text-sm md:text-base">{tour.title}</h3>
                
                {/* Rating */}
                <div className="mb-auto">
                  {renderRatingStars(tour.rating, tour.reviewCount)}
                </div>
                
                {/* Price */}
                <div className="text-sm text-gray-600 mt-2">
                  from <span className="font-bold text-black">{tour.currency}{tour.price}</span> per adult
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation Button - Right */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
          disabled={currentIndex >= tours.length - visibleCards}
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
