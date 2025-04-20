
import PopularDestinations from "@/components/popular-destinations"
import Footer from "@/components/footer"
import { WinnersSection } from "@/components/winner"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import Sponsor from "@/components/sponser"
import TravelPlanner from "@/components/ai"
import Navbar from "@/components/navbar"
import TourCardsCarousel from "@/components/tour-cards-carousel"
import Dream from "@/components/ui/dream"
import SearchBar from "@/components/search-bar"

export default function Home() {
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

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      <SearchBar />
      <TravelPlanner />
      <PopularDestinations />
      <TourCardsCarousel 
        title="Ways to tour New Delhi" 
        subtitle="Book these experiences for a close-up look at New Delhi."
        tours={delhiTours}
      />
      {/* <Dream /> */}
      <Sponsor />
      <WinnersSection />
      <div className="w-full flex items-center justify-center my-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          What our customers say
        </h1>
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
      <Footer />
    </div>
  )
}
