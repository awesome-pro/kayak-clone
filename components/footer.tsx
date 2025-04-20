import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Plan your best trip ever with TripAdvisor, the world's largest travel platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-black">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-black">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-black">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-black">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-black">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About TripAdvisor</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Resources and Policies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Investor Relations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Write a Review
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Add a Place
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Join
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Travelers' Choice
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  GreenLeaders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Do Business With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Owners
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Business Advantage
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Sponsored Placements
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Advertise with Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Access our Content API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Get the App</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  iPhone App
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-black">
                  Android App
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TripAdvisor LLC All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-black">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-black">
              Privacy and Cookies Statement
            </Link>
            <Link href="#" className="hover:text-black">
              Cookie Consent
            </Link>
            <Link href="#" className="hover:text-black">
              Site Map
            </Link>
            <Link href="#" className="hover:text-black">
              How the Site Works
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
