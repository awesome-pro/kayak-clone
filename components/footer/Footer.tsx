import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Mobile', href: '/mobile' },
  { name: 'Discover', href: '/discover' },
  { name: 'How we work', href: '/how-we-work' },
];

const contactLinks = [
  { name: 'Help/FAQ', href: '/help' },
  { name: 'Press', href: '/press' },
  { name: 'Affiliates', href: '/affiliates' },
  { name: 'Partners', href: '/partners' },
  { name: 'Investor Relations', href: '/investors' },
];

const moreLinks = [
  { name: 'Airline Fees', href: '/airline-fees' },
  { name: 'Airlines', href: '/airlines' },
  { name: 'Routes', href: '/routes' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'KAYAK for Business', href: '/business' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' },
  { name: 'Accessibility', href: '/accessibility' },
  { name: 'Do not sell my personal information', href: '/privacy/do-not-sell' },
];

const relatedBrands = [
  { name: 'Booking.com', logo: '/images/booking.svg' },
  { name: 'Priceline', logo: '/images/priceline.svg' },
  { name: 'Agoda', logo: '/images/agoda.svg' },
  { name: 'RentalCars', logo: '/images/rentalcars.svg' },
  { name: 'OpenTable', logo: '/images/opentable.svg' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#FF690F] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#FF690F] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">More</h3>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#FF690F] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Get the KAYAK app</h3>
            <div className="flex space-x-2 mb-6">
              <Link href="#" className="block bg-black rounded-md px-3 py-2 w-32">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Download on the</span>
                    <span className="text-white text-sm font-medium">App Store</span>
                  </div>
                </div>
              </Link>
              <Link href="#" className="block bg-black rounded-md px-3 py-2 w-32">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">GET IT ON</span>
                    <span className="text-white text-sm font-medium">Google Play</span>
                  </div>
                </div>
              </Link>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Follow us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-[#FF690F] transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF690F] transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF690F] transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF690F] transition-colors">
                <Youtube size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Footer Accordion */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="company">
              <AccordionTrigger className="text-gray-900 font-semibold">Company</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 py-2">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-gray-600 hover:text-[#FF690F]">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger className="text-gray-900 font-semibold">Contact</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 py-2">
                  {contactLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-gray-600 hover:text-[#FF690F]">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="more">
              <AccordionTrigger className="text-gray-900 font-semibold">More</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 py-2">
                  {moreLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-gray-600 hover:text-[#FF690F]">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Get the KAYAK app</h3>
            <div className="flex space-x-2 mb-6">
              <Link href="#" className="block bg-black rounded-md px-3 py-2 flex-1">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Download on the</span>
                    <span className="text-white text-sm font-medium">App Store</span>
                  </div>
                </div>
              </Link>
              <Link href="#" className="block bg-black rounded-md px-3 py-2 flex-1">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">GET IT ON</span>
                    <span className="text-white text-sm font-medium">Google Play</span>
                  </div>
                </div>
              </Link>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Follow us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-[#FF690F]">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF690F]">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF690F]">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF690F]">
                <Youtube size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section with Legal and Brand Logos */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-6 md:mb-0">
              <div className="flex">
                {['K', 'A', 'Y', 'A', 'K'].map((letter, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 flex items-center justify-center text-white font-bold bg-[#FF690F] text-xs"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                © {new Date().getFullYear()} KAYAK Software Corporation
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-xs text-gray-500 hover:text-[#FF690F]">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 items-center mt-6">
            <span className="text-xs text-gray-500">Related brands:</span>
            {relatedBrands.map((brand) => (
              <Link key={brand.name} href="#" className="text-gray-500 hover:text-[#FF690F]">
                <span className="text-xs font-medium">{brand.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>USD</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>English</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}