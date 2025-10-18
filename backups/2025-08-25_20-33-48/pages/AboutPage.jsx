import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Globe, Shield, Heart, Star, MapPin, Calendar, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const AboutPage = () => {
  const stats = [
    { label: 'Happy Travelers', value: '50,000+', icon: Users },
    { label: 'Destinations', value: '100+', icon: Globe },
    { label: 'Years Experience', value: '10+', icon: Award },
    { label: 'Success Rate', value: '99.9%', icon: Shield }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe travel has the power to transform lives. Our passion drives us to create extraordinary experiences that inspire and connect people with the world.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety and satisfaction are our top priorities. We maintain the highest standards of service and security across all our travel experiences.'
    },
    {
      icon: Globe,
      title: 'Global Expertise',
      description: 'With local partners worldwide, we offer authentic experiences and insider knowledge that only comes from deep connections in each destination.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every detail, from planning to execution, ensuring every journey exceeds expectations and creates lasting memories.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
      bio: 'Former travel journalist with 15+ years exploring the world. Founded Wanderlust to share authentic travel experiences.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Logistics expert with a passion for creating seamless travel experiences. Ensures every journey runs perfectly.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Travel Curator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Former tour guide and local expert. Specializes in crafting unique itineraries that reveal hidden gems.'
    },
    {
      name: 'David Thompson',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Dedicated to ensuring every traveler feels supported and valued throughout their journey with us.'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Company Founded', description: 'Started with a vision to make extraordinary travel accessible to everyone.' },
    { year: '2017', title: 'First 1000 Travelers', description: 'Reached our first major milestone with 1000 satisfied customers.' },
    { year: '2019', title: 'Global Expansion', description: 'Expanded to 50+ destinations across 6 continents.' },
    { year: '2021', title: 'Award Recognition', description: 'Received "Best Travel Company" award from Travel Weekly.' },
    { year: '2023', title: '50,000+ Travelers', description: 'Celebrated serving over 50,000 happy travelers worldwide.' },
    { year: '2024', title: 'Innovation Leader', description: 'Leading the industry with sustainable and personalized travel experiences.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Wanderlust
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Creating unforgettable travel experiences since 2015. We're passionate about connecting people with the world's most beautiful destinations.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                Our Story
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                A Journey of Passion and Discovery
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Founded in 2015, Wanderlust began with a simple yet powerful vision: to make extraordinary travel experiences accessible to everyone. What started as a small team of passionate travelers has grown into a trusted name in the travel industry.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Our founder, Sarah Johnson, spent over a decade as a travel journalist, exploring remote corners of the world and documenting authentic experiences. She realized that many travelers were missing out on the true essence of destinations due to generic, mass-market tours.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Today, we've helped over 50,000 travelers discover the world's most beautiful destinations, from hidden mountain villages to pristine beaches, always with a focus on authentic experiences and sustainable tourism.
              </p>
              <Button 
                asChild
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              >
                <Link to="/packages">
                  Explore Our Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Wanderlust Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-full">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                    <div className="text-sm text-slate-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Over the years, we've created countless memories and built lasting relationships with travelers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-100">
              Our Values
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These core values guide everything we do, from planning your journey to ensuring your safety and satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Meet Our Team
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              The People Behind Your Adventures
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our passionate team of travel experts is dedicated to creating extraordinary experiences for every traveler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
              Our Journey
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Milestones That Define Us
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From humble beginnings to industry leadership, here are the key moments in our journey
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-emerald-500 to-teal-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                      <div className="text-2xl font-bold text-emerald-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join thousands of travelers who have discovered the world with us. Your perfect adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-4 text-lg rounded-full"
            >
              <Link to="/packages">
                Browse Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg rounded-full"
            >
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 