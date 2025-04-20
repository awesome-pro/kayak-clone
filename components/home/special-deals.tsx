"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, Plane, Hotel, Car, Star, ArrowRight, Calendar 
} from 'lucide-react';

interface Deal {
  id: number;
  type: 'flight' | 'hotel' | 'car';
  title: string;
  image: string;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  features: string[];
  validUntil: string;
}

const deals: Deal[] = [
  {
    id: 1,
    type: 'flight',
    title: 'New York to London',
    image: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Multiple Airlines',
    originalPrice: 899,
    discountedPrice: 649,
    discountPercentage: 28,
    rating: 4.5,
    features: ['Round trip', 'Economy class', 'Direct flights available'],
    validUntil: '3 days',
  },
  {
    id: 2,
    type: 'flight',
    title: 'Los Angeles to Tokyo',
    image: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Japan Airlines',
    originalPrice: 1299,
    discountedPrice: 899,
    discountPercentage: 31,
    rating: 4.7,
    features: ['Round trip', 'Premium economy', 'In-flight entertainment'],
    validUntil: '5 days',
  },
  {
    id: 3,
    type: 'hotel',
    title: 'Grand Luxury Resort',
    image: 'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Bali, Indonesia',
    originalPrice: 299,
    discountedPrice: 189,
    discountPercentage: 37,
    rating: 4.8,
    features: ['Breakfast included', 'Free cancellation', 'Spa access'],
    validUntil: '7 days',
  },
  {
    id: 4,
    type: 'hotel',
    title: 'City Center Suites',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Paris, France',
    originalPrice: 249,
    discountedPrice: 169,
    discountPercentage: 32,
    rating: 4.6,
    features: ['Breakfast included', 'Central location', 'Free WiFi'],
    validUntil: '4 days',
  },
  {
    id: 5,
    type: 'car',
    title: 'Economy Car Rental',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Barcelona, Spain',
    originalPrice: 45,
    discountedPrice: 29,
    discountPercentage: 36,
    rating: 4.4,
    features: ['Unlimited mileage', 'Collision damage waiver', 'Theft protection'],
    validUntil: '6 days',
  },
  {
    id: 6,
    type: 'car',
    title: 'SUV Rental Special',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Orlando, USA',
    originalPrice: 69,
    discountedPrice: 49,
    discountPercentage: 29,
    rating: 4.5,
    features: ['Unlimited mileage', 'Free cancellation', 'Additional driver included'],
    validUntil: '5 days',
  },
];

export default function SpecialDeals() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const filteredDeals = selectedTab === 'all' 
    ? deals 
    : deals.filter(deal => deal.type === selectedTab);
  
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/20 rounded-xl px-6 md:px-10">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Special Deals</h2>
            <p className="text-muted-foreground mt-2">
              Limited-time offers on popular destinations
            </p>
          </div>
          <Tabs 
            value={selectedTab} 
            onValueChange={setSelectedTab}
            className="mt-4 md:mt-0"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="flight">Flights</TabsTrigger>
              <TabsTrigger value="hotel">Hotels</TabsTrigger>
              <TabsTrigger value="car">Cars</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <motion.div 
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-blue-600">
                  {deal.discountPercentage}% OFF
                </Badge>
                <div className="absolute top-3 left-3">
                  {deal.type === 'flight' && <Plane className="h-6 w-6 text-white bg-blue-500 p-1 rounded-full" />}
                  {deal.type === 'hotel' && <Hotel className="h-6 w-6 text-white bg-orange-500 p-1 rounded-full" />}
                  {deal.type === 'car' && <Car className="h-6 w-6 text-white bg-green-500 p-1 rounded-full" />}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold">{deal.title}</h3>
                  <p className="text-white/90 text-sm">{deal.location}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(deal.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm ml-2">{deal.rating.toFixed(1)}</span>
                </div>
                
                <ul className="text-sm text-muted-foreground mb-4">
                  {deal.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Price from</span>
                    <div className="flex items-center">
                      <span className="text-lg line-through text-muted-foreground mr-2">${deal.originalPrice}</span>
                      <span className="text-2xl font-bold text-blue-600">${deal.discountedPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Ends in {deal.validUntil}</span>
                  </div>
                </div>
                
                <Button className="w-full">
                  View Deal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          View All Deals
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}