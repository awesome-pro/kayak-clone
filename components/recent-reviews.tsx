import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Card } from './ui/card'

const reviews = [
  {
    id: 1,
    title: 'Amazing hotel with great service',
    content: 'We stayed at this hotel for 3 nights and had a wonderful experience. The room was spacious and clean, and the staff was very friendly and helpful.',
    rating: 5,
    author: {
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      location: 'New York, USA',
      contributions: 42
    },
    hotel: 'Grand Hotel Paris',
    date: 'June 15, 2023'
  },
  {
    id: 2,
    title: 'Perfect location, but rooms need updating',
    content: 'The location is perfect, right in the heart of the city. However, the rooms are a bit outdated and could use some renovation. The breakfast was good though.',
    rating: 5,
    author: {
      name: 'Mark Wilson',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      location: 'London, UK',
      contributions: 17
    },
    hotel: 'City Center Hotel',
    date: 'May 29, 2023'
  },
  {
    id: 3,
    title: 'Excellent dining experience',
    content: 'We had dinner at this restaurant and were blown away by the quality of food and service. The chef came out to greet us, which was a nice touch. Highly recommend the seafood pasta!',
    rating: 4,
    author: {
      name: 'Emily Chen',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      location: 'Toronto, Canada',
      contributions: 28
    },
    hotel: 'Oceanic Restaurant',
    date: 'July 2, 2023'
  }
]

export function ReviewsSection() {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Reviews</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          See what travelers are saying about their recent experiences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/reviews" 
            className="text-green-600 font-medium hover:text-green-700 inline-flex items-center transition-colors"
          >
            View all reviews
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <Card
      className="bg-white rounded-2xl overflow-hidden hover:shadow-xl p-4 lg:p-6 transition-shadow duration-300 border-1 border-green-600"
    >
      <div className="flex items-center space-x-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={cn(
                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )} 
            />
          ))}
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-green-600">{review.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{review.content}</p>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={review.author.image} alt={review.author.name} />
              <AvatarFallback>{review.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{review.author.name}</p>
              <p className="text-gray-500 text-xs">
                {review.author.location} • {review.author.contributions} contributions
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <p>Reviewed: {review.hotel}</p>
            <p>Date of experience: {review.date}</p>
          </div>
        </div>
    </Card>
  )
}