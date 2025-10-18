import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Wanderlust</h3>
                <p className="text-sm text-slate-400">Travel & Tours</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Creating unforgettable travel experiences since 2015. We specialize in crafting personalized journeys that connect you with the world's most beautiful destinations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/packages" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Tour Packages
              </Link>
              <Link to="/blog" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Travel Blog
              </Link>
              <Link to="/about" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Popular Destinations</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Bali, Indonesia
              </a>
              <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Tokyo, Japan
              </a>
              <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Swiss Alps
              </a>
              <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Maldives
              </a>
              <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Thailand
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>123 Travel Street</p>
                  <p>Adventure City, AC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
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
              © 2024 Wanderlust Travel & Tours. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
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