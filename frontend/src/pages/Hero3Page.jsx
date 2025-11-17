import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Hero3Page = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        id="hero"
        className="relative w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ 
          backgroundImage: "url('/Home Hero/Hero BG.png')",
          height: "720px"
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 -mt-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Because Travel Should Feel Effortless
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
            Embark on unforgettable journeys to places where beauty meets mystery. From ancient cities to breathtaking landscapes, discover destinations that will leave you inspired and amazed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
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
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg"
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Additional content to demonstrate scrolling */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Hero3 Page
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              This page has the same hero section but without any header transparency effects. 
              The header remains normal (white background) throughout the page.
            </p>
            <div className="space-y-4">
              <p className="text-lg text-slate-700">
                Notice how the header stays white and opaque even when scrolling over the hero section.
              </p>
              <p className="text-lg text-slate-700">
                This demonstrates the difference between the home page (with transparency effects) and this page (without).
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
              Scroll to See the Difference
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Keep scrolling to see how the header behavior differs from the home page. 
              The header maintains its normal appearance throughout the entire page.
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
              Test the navigation menus to see how they appear with the normal header styling.
            </p>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero3Page;
