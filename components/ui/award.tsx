'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ExploreCardProps {
  id: number;
  image: string;
  title: string;
  alt?: string;
}

const ExploreCard = ({ image, title, alt }: ExploreCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative flex flex-col rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[250px] w-full">
        <Image 
          src={image} 
          alt={alt || title}
          fill
          className="object-cover rounded-xl"
        />
        {/* Overlay layer that appears on hover */}
        <div className={`absolute inset-0 bg-white/20 rounded-xl transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      <div className="p-4 text-center">
        <Link href={"/"} className="text-lg font-semibold hover:underline text-gray-900">{title}</Link>
      </div>
    </div>
  );
};

export default function ExploreSection() {
  const exploreItems = [
    {
      id: 1,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/19/da/a2/ef06936c-bcff-483b.jpg?w=800&h=500&s=1",
      title: "5 flower festivals worth planning a trip around",
      alt: "Mountain with wildflowers"
    },
    {
      id: 2,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/19/db/20/c9de0324-9722-44d4.jpg?w=800&h=500&s=1",
      title: "6 family-friendly European cities for spring break",
      alt: "Family walking down steps in a European city"
    },
    {
      id: 3,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/19/db/4b/484d3b2e-17a7-4a47.jpg?w=800&h=500&s=1",
      title: "A first timer's guide to Canada's national parks",
      alt: "Canoes on a lake in a national park"
    }
  ];

  return (
    <section className="w-full bg-gray-200 py-12 px-4 md:px-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">More to explore</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exploreItems.map((item) => (
            <ExploreCard 
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              alt={item.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}