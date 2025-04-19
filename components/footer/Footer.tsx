import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-[#1c1d1f] text-white pt-8 pb-8">
      <div className="container mx-auto px-4">
        {/* Top section with links */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Udemy Business</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Teach on Udemy</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Get the app</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">About us</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Careers</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Blog</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Help and Support</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Affiliate</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Investors</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Terms</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Privacy policy</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Cookie settings</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Sitemap</Link></li>
              <li><Link href="#" className="text-[#cec0fc] hover:underline text-sm">Accessibility statement</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3 lg:col-span-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-4 text-white border-white hover:bg-gray-800 w-full sm:w-auto"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span>English</span>
            </Button>
          </div>
        </div>
        
        {/* Bottom section with logo and copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-700">
          <div className="font-bold text-2xl mb-4 sm:mb-0">udemy</div>
          <div className="text-sm text-gray-400"> 2025 Udemy, Inc.</div>
        </div>
      </div>
    </footer>
  );
}