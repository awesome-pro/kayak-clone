"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface TravelTip {
  id: number;
  category: 'destinations' | 'planning' | 'budget';
  title: string;
  description: string;
  image: string;
  date: string;
  location?: string;
}

const travelTips: TravelTip[] = [
  {
    id: 1,
    category: 'destinations',
    title: '10 Hidden Gems in Europe You Need to Visit',
    description: 'Discover these off-the-beaten-path destinations that offer authentic experiences without the crowds.',
    image: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 15, 2025',
    location: 'Europe',
  },
  {
    id: 2,
    category: 'planning',
    title: 'How to Pack for a Long-Term Trip',
    description: 'Expert packing tips that will help you fit everything you need for months of travel into a single backpack.',
    image: 'https://images.pexels.com/photos/5081375/pexels-photo-5081375.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 12, 2025',
  },
  {
    id: 3,
    category: 'budget',
    title: 'Travel on $50 a Day: Budget Travel Guide',
    description: 'Learn how to experience amazing destinations around the world without breaking the bank.',
    image: 'https://images.pexels.com/photos/3614167/pexels-photo-3614167.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 10, 2025',
  },
  {
    id: 4,
    category: 'destinations',
    title: 'Best Time to Visit Southeast Asia',
    description: 'A comprehensive guide to weather patterns and seasonal events to help you plan the perfect trip.',
    image: 'https://images.pexels.com/photos/1424224/pexels-photo-1424224.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 8, 2025',
    location: 'Southeast Asia',
  },
  {
    id: 5,
    category: 'planning',
    title: 'Essential Travel Apps for 2025',
    description: 'The must-have smartphone applications that will make your travel experience smoother and more enjoyable.',
    image: 'https://images.pexels.com/photos/3760613/pexels-photo-3760613.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 5, 2025',
  },
  {
    id: 6,
    category: 'budget',
    title: 'How to Find the Cheapest Flights',
    description: 'Insider secrets to scoring amazing deals on airfare no matter where you want to go.',
    image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 2, 2025',
  },
];

export default function TravelTips() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [current, setCurrent] = useState(0);
  
  const filteredTips = selectedCategory === 'all'
    ? travelTips
    : travelTips.filter(tip => tip.category === selectedCategory);
  
  const cardsPerPage = {
    sm: 1,
    md: 2,
    lg: 3,
  };
  
  const totalPages = Math.ceil(filteredTips.length / cardsPerPage.lg);
  
  const nextSlide = () => {
    if (totalPages > 1) {
      setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }
  };
  
  const prevSlide = () => {
    if (totalPages > 1) {
      setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    }
  };
  
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Travel Tips & Articles</h2>
          <p className="text-muted-foreground mt-2">
            Expert advice to inspire and improve your travels
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Tabs 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
            className="mr-4"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {totalPages > 1 && (
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
          )}
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: totalPages > 1 ? `calc(-${current * 100}% / ${totalPages})` : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: totalPages > 1 ? `${totalPages * 100}%` : '100%' }}
        >
          {filteredTips.map((tip) => (
            <div key={tip.id} className="w-full sm:w-1/2 md:w-1/3 shrink-0 p-1">
              <Link 
                href="#" 
                className="group flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`
                      inline-block px-2 py-1 text-xs font-medium text-white rounded-full
                      ${tip.category === 'destinations' ? 'bg-blue-600' : 
                        tip.category === 'planning' ? 'bg-purple-600' : 'bg-green-600'}
                    `}>
                      {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{tip.date}</span>
                    {tip.location && (
                      <>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{tip.location}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {tip.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
      
      {totalPages > 1 && (
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
      )}
      
      <div className="text-center mt-8">
        <Button variant="outline">
          View All Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}