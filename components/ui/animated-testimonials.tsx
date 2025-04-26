"use client";

import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  rating?: number;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  // Function to render TripAdvisor-style star ratings
  const renderRating = (rating: number = 5) => {
    return (
      <div className="flex items-center mt-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-green-500 fill-green-500' : 'text-gray-300'}`}
            strokeWidth={1}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)} out of 5
        </span>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 font-sans antialiased md:px-8 lg:px-12 bg-white">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-5">
        {/* Left side - Image */}
        <div className="md:col-span-2">
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="relative h-full w-full rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm font-medium">{testimonial.name}</p>
                      <p className="text-white/80 text-xs">{testimonial.designation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-2 h-2 rounded-full transition-all ${isActive(index) ? 'bg-green-500 w-6' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Right side - Content */}
        <div className="flex flex-col md:col-span-3 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 rounded-full p-2 mr-2">
              <Quote className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Verified Review
            </h3>
          </div>
          
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="flex-grow"
          >
            {renderRating(testimonials[active].rating || 5)}
            
            <motion.p className="text-lg text-gray-700 font-medium italic mb-6">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            
            <div className="flex items-center">
              <div className="mr-4">
                <img 
                  src={testimonials[active].src} 
                  alt={testimonials[active].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{testimonials[active].name}</h4>
                <p className="text-sm text-gray-600">{testimonials[active].designation}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Navigation buttons */}
          <div className="flex justify-end gap-4 mt-8 border-t pt-4">
            <button
              onClick={handlePrev}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* TripAdvisor-style trust indicators */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-center text-sm text-gray-600">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>All reviews verified by our team</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure booking process</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Free cancellation on most bookings</span>
        </div>
      </div>
    </div>
  );
};
