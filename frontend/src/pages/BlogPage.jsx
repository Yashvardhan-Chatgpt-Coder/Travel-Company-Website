import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const BlogPage = () => {
  return (
    <>
      <main>
        {/* Hero Section - Large Container */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1 -74 0' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")` }}></div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Travel Stories
            </h1>
            <p className="text-2xl sm:text-3xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Discover inspiring destinations, hidden gems, and unforgettable journeys
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Placeholder for future content */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-500">Content sections will be added here</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
