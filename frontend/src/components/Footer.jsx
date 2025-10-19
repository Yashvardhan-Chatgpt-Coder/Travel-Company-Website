import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12 lg:justify-between">
          {/* Company Info */}
          <div className="space-y-4 lg:max-w-[350px] md:w-[48%] lg:w-auto">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Paradise Yatra</h3>
                <p className="text-sm text-slate-400">Yatra To Paradise</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Creating unforgettable travel experiences since 2015. We specialize in crafting personalized journeys that connect you with the world's most beautiful destinations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="X (Twitter)">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:w-[48%] lg:w-auto">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/packages" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Tour Packages
              </Link>
              <Link to="/blog" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Travel Blog
              </Link>
              <Link to="/about" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* International Tours */}
          <div className="space-y-4 md:w-[48%] lg:w-auto">
            <h4 className="text-lg font-semibold text-white">International Tours</h4>
            <nav className="space-y-2">
              <Link to="/packages?location=singapore" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Singapore
              </Link>
              <Link to="/packages?location=thailand" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Thailand
              </Link>
              <Link to="/packages?location=malaysia" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Malaysia
              </Link>
              <Link to="/packages?location=vietnam" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Vietnam
              </Link>
              <Link to="/packages?location=europe" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Europe
              </Link>
              <Link to="/packages?location=dubai" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Dubai
              </Link>
              <Link to="/packages?location=maldives" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Maldives
              </Link>
              <Link to="/packages?location=egypt" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Egypt
              </Link>
              <Link to="/packages?location=kenya" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Kenya
              </Link>
            </nav>
          </div>

          {/* India Tours */}
          <div className="space-y-4 md:w-[48%] lg:w-auto">
            <h4 className="text-lg font-semibold text-white">India Tours</h4>
            <nav className="space-y-2">
              <Link to="/packages?india=rajasthan" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Rajasthan
              </Link>
              <Link to="/packages?india=kerala" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Kerala
              </Link>
              <Link to="/packages?india=himachal" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Himachal
              </Link>
              <Link to="/packages?india=uttarakhand" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Uttarakhand
              </Link>
              <Link to="/packages?india=goa" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Goa
              </Link>
              <Link to="/packages?india=kashmir" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Jammu & Kashmir
              </Link>
              <Link to="/packages?india=sikkim" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Sikkim
              </Link>
              <Link to="/packages?india=tamilnadu" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Tamil Nadu
              </Link>
              <Link to="/packages?india=andaman" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Andaman & Nicobar Island
              </Link>
              <Link to="/packages?india=ladakh" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Ladakh
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:w-[48%] lg:w-auto">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>123 Travel Street</p>
                  <p>Adventure City, AC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">info@wanderlust.com</span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-slate-400 text-xs">
                Available 24/7 for your travel emergencies
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 Paradise Yatra. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;