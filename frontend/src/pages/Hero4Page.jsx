import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const Hero4Page = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        id="hero"
        className="relative w-full bg-white overflow-hidden"
        style={{ height: "720px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left: Text and Form */}
            <div className="space-y-6 sm:space-y-8 -mt-10 sm:-mt-20">
              {/* Heading */}
              <h1 className="font-bold text-slate-900 w-full text-4xl sm:text-6xl lg:text-8xl xl:text-9xl" style={{ fontSize: '90px', lineHeight: '90px', whiteSpace: 'nowrap' }}>
                Because Travel
                <span className="block">Should Feel</span>
                <span className="block">Effortless</span>
              </h1>
              
              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
              
              {/* Input Field */}
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-4xl">
                <Input 
                  type="text" 
                  placeholder="Enter your destination..."
                  className="h-10 sm:h-12 text-base sm:text-lg border-2 border-slate-300 focus:border-blue-500 rounded-lg"
                />
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg h-10 sm:h-12"
                >
                  <Link to="/packages">
                    Explore Packages
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg h-10 sm:h-12"
                >
                  <Link to="/video">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Video
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Hand with Airplane */}
            <div className="relative flex justify-end overflow-visible hidden lg:flex">
              {/* Orange Circle Background */}
              <div className="absolute w-[20rem] lg:w-[28rem] h-[20rem] lg:h-[28rem] rounded-full right-0 top-1/3 transform -translate-y-1/2" style={{ backgroundColor: '#DE440E' }}></div>
              
              {/* Hand with Airplane Image */}
              <div className="relative z-10 -mr-16 lg:-mr-32">
                <img 
                  src="/Hero Hand.png" 
                  alt="Hand holding toy airplane"
                  className="w-auto h-[400px] lg:h-[600px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional content */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Hero4 Page
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              This page features a clean, modern hero section with a two-column layout, 
              input field, and hand holding airplane image as shown in the design.
            </p>
            <div className="space-y-4">
              <p className="text-lg text-slate-700">
                The hero section includes a large heading, description text, destination input field, 
                and two action buttons (Explore Packages and Watch Video).
              </p>
              <p className="text-lg text-slate-700">
                The right side features a hand holding a toy airplane against an orange circular background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More content for scrolling demonstration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Design Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              This hero section demonstrates a modern, clean design with proper spacing, 
              typography hierarchy, and visual elements that create an engaging user experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Navigation Test
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Test the navigation menus and compare with other hero pages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
              >
                <Link to="/">
                  Back to Home Page
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8"
              >
                <Link to="/hero3">
                  Compare with Hero3
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero4Page;
