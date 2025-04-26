
import PopularDestinations from "@/components/popular-destinations"
import Footer from "@/components/footer"
import { WinnersSection } from "@/components/winner"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import TravelPlanner from "@/components/ai"
import Navbar from "@/components/navbar"
import Dream from "@/components/ui/dream"
import SearchBar from "@/components/search-bar"
import Dream2 from "@/components/ui/dream2"
import ExploreSection from "@/components/ui/award"
import TourCarousel from "@/components/tour-carousel"
import FAQSection from "@/components/ui/faq-section"

export default function Home() {
  const testimonials = [
    {
      quote:
        "Booking our tour to the Taj Mahal through this site was the best decision we made. The guide was knowledgeable and the entire experience was seamless from start to finish.",
      name: "Sarah Chen",
      designation: "Traveled to Delhi, April 2025",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3560&auto=format&fit=crop",
      rating: 5.0
    },
    {
      quote:
        "The 'Full Day Old and New Delhi City Tour' exceeded all our expectations. Our guide knew all the hidden spots and helped us avoid the crowds. Worth every penny!",
      name: "Michael Rodriguez",
      designation: "Family trip to India, March 2025",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop",
      rating: 4.8
    },
    {
      quote:
        "As a solo traveler, I was concerned about safety, but this platform connected me with reliable guides who made my Delhi experience unforgettable. The sunrise Taj Mahal trip was magical!",
      name: "Emily Watson",
      designation: "Solo traveler, February 2025",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3540&auto=format&fit=crop",
      rating: 4.9
    },
    {
      quote:
        "The 'Likely to Sell Out' badge was spot on - we almost missed booking our tour but managed to get the last spots. The experience was incredible and our photos are amazing.",
      name: "James Kim",
      designation: "Honeymoon trip, January 2025",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3464&auto=format&fit=crop",
      rating: 5.0
    },
    {
      quote:
        "We've used many travel platforms before, but the ease of booking and the quality of tours here is unmatched. The Delhi to Agra express train tour was comfortable and well-organized.",
      name: "Lisa Thompson",
      designation: "Group tour, December 2024",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2592&auto=format&fit=crop",
      rating: 4.7
    },
  ];

  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      <SearchBar />
      <TravelPlanner />
      <PopularDestinations />
      <TourCarousel />
      <ExploreSection />
      <Dream />
      <Dream2 />
      <WinnersSection />
      <div className="w-full flex flex-col items-center justify-center my-12 px-4">
        <h1 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl text-gray-900">
          Travelers Share Their Experiences
        </h1>
        <p className="mt-4 text-xl text-center text-gray-600 max-w-3xl">
          Authentic reviews from travelers who explored India with our top-rated tours
        </p>
      </div>
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      
      {/* Visual divider */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">Plan your perfect trip</span>
          </div>
        </div>
      </div>
      
      <FAQSection />
      <Footer />
    </div>
  )
}
