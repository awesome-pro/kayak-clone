"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Quote, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  tripType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    text: "KAYAK made it incredibly easy to find and book the perfect vacation. I saved over $300 on my flight to Paris compared to other sites. The price alerts feature is a game-changer!",
    tripType: "Family vacation"
  },
  {
    id: 2,
    name: "David Chen",
    location: "Toronto, Canada",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    text: "I've been using KAYAK for years to plan my business trips. The interface is clean and intuitive, and the filters help me find exactly what I need. Their customer service is also excellent.",
    tripType: "Business travel"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    avatar: "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    text: "As a frequent solo traveler, I rely on KAYAK to find the best deals and safest accommodations. The mobile app is perfect for booking on the go and managing my itineraries.",
    tripType: "Solo adventure"
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Sydney, Australia",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    text: "We planned our entire honeymoon through KAYAK and couldn't be happier with the experience. The package deals saved us a lot of money, and everything went smoothly from booking to check-out.",
    tripType: "Honeymoon"
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }
  };
  
  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };
  
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">What Travelers Say</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Don't just take our word for it—read about experiences from travelers like you
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="relative overflow-hidden h-[300px] md:h-[260px]">
          <AnimatePresence 
            initial={false} 
            mode="wait"
            onExitComplete={() => setIsAnimating(false)}
          >
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8 shadow-lg">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src={testimonials[current].avatar} 
                        alt={testimonials[current].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1.5">
                      <Quote className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonials[current].rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="italic mb-4 text-muted-foreground">
                    "{testimonials[current].text}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonials[current].name}</p>
                    <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground">
                      <span>{testimonials[current].location}</span>
                      <span className="hidden md:inline mx-2">•</span>
                      <span>{testimonials[current].tripType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full z-10 bg-white/90 shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full z-10 bg-white/90 shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-center mt-6 space-x-1">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}