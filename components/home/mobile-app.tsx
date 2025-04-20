"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bell, Calendar, MapPin, CreditCard, ShieldCheck, Filter 
} from 'lucide-react';

export default function MobileApp() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const element = document.getElementById('mobile-app-section');
      
      if (element) {
        const elementPosition = element.offsetTop;
        if (scrollPosition > elementPosition - window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    {
      icon: <Bell className="h-6 w-6 text-blue-600" />,
      title: "Price Alerts",
      description: "Get notified when prices drop for flights and hotels you're interested in."
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "Trip Planner",
      description: "Organize all your travel plans in one place with easy access to bookings."
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Explore Nearby",
      description: "Discover points of interest and activities close to your location."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      title: "Secure Payments",
      description: "Book with confidence using our secure payment processing system."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      title: "Travel Protection",
      description: "Optional travel insurance to protect your trip investments."
    },
    {
      icon: <Filter className="h-6 w-6 text-blue-600" />,
      title: "Advanced Filters",
      description: "Fine-tune your search with detailed filters to find exactly what you want."
    }
  ];
  
  return (
    <section id="mobile-app-section" className="py-16 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl my-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Take KAYAK with you everywhere
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get real-time updates, manage your bookings, and find the best travel deals on the go with our mobile app.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex"
                  >
                    <div className="mr-4 mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="flex items-center h-14 px-6 bg-black hover:bg-gray-800 text-white">
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Download on the</span>
                    <span className="text-base font-semibold">App Store</span>
                  </div>
                </Button>
                <Button className="flex items-center h-14 px-6 bg-black hover:bg-gray-800 text-white">
                  <div className="flex flex-col items-start">
                    <span className="text-xs">GET IT ON</span>
                    <span className="text-base font-semibold">Google Play</span>
                  </div>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="h-[500px] w-[250px] bg-gray-900 rounded-[40px] p-4 shadow-xl border-8 border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-6 bg-gray-800 rounded-b-xl"></div>
                <div className="h-full w-full bg-blue-600 rounded-[24px] overflow-hidden relative">
                  {/* App UI mockup */}
                  <div className="p-4 bg-white h-full">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-blue-600">KAYAK</span>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 mb-3">
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Where to?</span>
                      </div>
                      <div className="flex justify-between space-x-2">
                        <div className="bg-white rounded p-2 flex-1 text-xs">New York</div>
                        <div className="bg-white rounded p-2 flex-1 text-xs">London</div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mb-3">
                      <div className="bg-blue-600 text-white text-xs rounded px-3 py-1">Flights</div>
                      <div className="bg-gray-200 text-gray-700 text-xs rounded px-3 py-1">Hotels</div>
                      <div className="bg-gray-200 text-gray-700 text-xs rounded px-3 py-1">Cars</div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-3 mb-3">
                      <div className="bg-blue-50 rounded-lg p-2 mb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs font-bold">NYC → LHR</div>
                            <div className="text-[10px] text-gray-500">Aug 20 - Aug 27</div>
                          </div>
                          <div className="text-xs font-bold text-blue-600">$649</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs font-bold">LAX → TYO</div>
                            <div className="text-[10px] text-gray-500">Sep 5 - Sep 15</div>
                          </div>
                          <div className="text-xs font-bold text-blue-600">$899</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold mb-2">Popular Destinations</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-100 rounded-lg overflow-hidden h-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-1 left-2 text-white text-[10px] font-medium">Paris</div>
                      </div>
                      <div className="bg-gray-100 rounded-lg overflow-hidden h-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-1 left-2 text-white text-[10px] font-medium">Rome</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}