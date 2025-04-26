"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const faqItems: FAQItem[] = [
    {
      question: "How do I book a tour on TripAdvisor?",
      answer: "Booking a tour is easy! Simply browse our available tours, select the one you're interested in, choose your preferred date and number of travelers, and proceed to checkout. You'll receive a confirmation email with all the details of your booking.",
      category: "booking"
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, most of our tours offer free cancellation up to 24 hours before the scheduled start time. To modify your booking, log into your account, go to 'My Trips', and select the booking you wish to change. Some tours may have different cancellation policies, which will be clearly stated on the tour page.",
      category: "booking"
    },
    {
      question: "Are the tours suitable for children?",
      answer: "Many of our tours are family-friendly, but age suitability varies by tour. Each tour listing includes information about age restrictions or recommendations. If you're unsure, you can contact the tour provider directly through our messaging system.",
      category: "planning"
    },
    {
      question: "What should I bring on my tour?",
      answer: "Essential items typically include comfortable walking shoes, weather-appropriate clothing, sunscreen, a hat, and a water bottle. For specific tours, additional items may be recommended, which will be listed in your booking confirmation email and on the tour details page.",
      category: "planning"
    },
    {
      question: "How do I find the meeting point for my tour?",
      answer: "The meeting point details are included in your booking confirmation email. Additionally, many of our tours offer a mobile app with GPS directions to the meeting point. If you're having trouble finding the location, you can contact the tour provider through the number provided in your confirmation.",
      category: "day-of"
    },
    {
      question: "What happens if I'm running late for my tour?",
      answer: "We recommend arriving at least 15 minutes before your tour's scheduled departure time. If you're running late, please contact the tour provider as soon as possible using the contact information in your booking confirmation. Some tours may be able to wait briefly, while others operate on a strict schedule.",
      category: "day-of"
    },
    {
      question: "Are meals included in the tour price?",
      answer: "This varies by tour. The tour description will clearly state whether meals are included. For full-day tours, lunch is often included, while shorter tours typically don't include meals. Check the 'What's Included' section on the tour page for specific details.",
      category: "planning"
    },
    {
      question: "How do I leave a review for a tour I've taken?",
      answer: "After completing your tour, you'll receive an email inviting you to share your experience. Alternatively, you can log into your account, go to 'My Trips', find the completed tour, and click on 'Write a Review'. Your honest feedback helps other travelers make informed decisions.",
      category: "after-tour"
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "booking", name: "Booking & Payment" },
    { id: "planning", name: "Trip Planning" },
    { id: "day-of", name: "Day of Tour" },
    { id: "after-tour", name: "After Your Tour" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about booking tours and activities
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No matching questions found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Help Banner */}
        <div className="mt-12 bg-green-50 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
              <p className="text-gray-700">Our support team is here to help you with any other questions.</p>
            </div>
            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
