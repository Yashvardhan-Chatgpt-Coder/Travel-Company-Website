import React from 'react';
import { Linkedin } from 'lucide-react';

export const AboutPage = () => {
  const founder = {
    name: "Brooklyn Simmons",
    title: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"
  };

  return (
    <div>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Founder
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The vision behind Paradise Yatra — making travel simple, personal, and unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img
                src={founder.image}
                alt={`${founder.name} - ${founder.title}`}
                className="w-full h-[420px] object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-sm font-medium text-blue-600">Founder</p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">{founder.name}</h1>
              <p className="mt-1 text-slate-600">{founder.title}</p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Paradise Yatra was started with a simple promise — make travel easy, honest, and personal. We plan the details so you can enjoy the journey, not the logistics.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="text-slate-500 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 