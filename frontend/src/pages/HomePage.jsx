import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Users, ArrowRight, Shield, Award, Globe, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { travelPackages, testimonials, destinations, blogPosts } from '../data/mock';
import { useHomePage } from '../context/HomePageContext';

export const HomePage = () => {
  const { homePageData } = useHomePage();
  

  
  // Get featured packages based on packageIds from context
  const featuredPackages = homePageData.featuredPackages.packageIds
    .map(id => travelPackages.find(pkg => pkg.id === id))
    .filter(Boolean);
  const latestBlogs = blogPosts.slice(0, 3);
  
  // Map icon names to actual icon components
  const getIconComponent = (iconName) => {
    const iconMap = {
      'Users': Users,
      'Globe': Globe,
      'Award': Award,
      'Shield': Shield
    };
    return iconMap[iconName] || Users;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-800/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${homePageData.hero.backgroundImage}')`
          }}
        ></div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {homePageData.hero.title.split(' ').slice(0, -1).join(' ')}
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {homePageData.hero.title.split(' ').slice(-1)[0]}
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {homePageData.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Link to={homePageData.hero.ctaLink}>
                {homePageData.hero.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10"
              onClick={() => {
                if (homePageData.hero.watchVideoLink && homePageData.hero.watchVideoLink !== '#') {
                  if (homePageData.hero.watchVideoLink.startsWith('http')) {
                    window.open(homePageData.hero.watchVideoLink, '_blank');
                  } else {
                    window.location.href = homePageData.hero.watchVideoLink;
                  }
                }
              }}
            >
              {homePageData.hero.watchVideoText}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
            {homePageData.hero.stats.map((stat, index) => (
              <div key={index} className="text-center">
                {React.createElement(getIconComponent(stat.icon), {
                  className: "h-8 w-8 mx-auto mb-2 text-blue-400"
                })}
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Featured Tours
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Trending Packages
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {homePageData.featuredPackages.description}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white">
                      {pkg.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-slate-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pkg.destination}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                      <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                    </div>
                    <Button 
                      asChild
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Link to={`/packages/${pkg.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredPackages.map((pkg) => (
                  <CarouselItem key={pkg.id} className="pl-4 basis-[80%] sm:basis-[85%]">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {pkg.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pkg.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-slate-500 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pkg.destination}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {pkg.title}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {pkg.duration}
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                            <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                          </div>
                          <Button 
                            asChild
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                          >
                            <Link to={`/packages/${pkg.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12" />
              <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
            >
              <Link to="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages - Section 2 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Featured Tours
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Holidays For Every Traveler
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {homePageData.featuredPackages.description}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white">
                      {pkg.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-slate-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pkg.destination}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                      <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                    </div>
                    <Button 
                      asChild
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Link to={`/packages/${pkg.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredPackages.map((pkg) => (
                  <CarouselItem key={pkg.id} className="pl-4 basis-[80%] sm:basis-[85%]">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {pkg.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pkg.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-slate-500 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pkg.destination}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {pkg.title}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {pkg.duration}
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                            <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                          </div>
                          <Button 
                            asChild
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                          >
                            <Link to={`/packages/${pkg.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12" />
              <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
            >
              <Link to="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages - Section 3 */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Featured Tours
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Popular Packages
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {homePageData.featuredPackages.description}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white">
                      {pkg.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-slate-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pkg.destination}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                      <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                    </div>
                    <Button 
                      asChild
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Link to={`/packages/${pkg.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredPackages.map((pkg) => (
                  <CarouselItem key={pkg.id} className="pl-4 basis-[80%] sm:basis-[85%]">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {pkg.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pkg.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-slate-500 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pkg.destination}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {pkg.title}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {pkg.duration}
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                            <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                          </div>
                          <Button 
                            asChild
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                          >
                            <Link to={`/packages/${pkg.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12" />
              <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
            >
              <Link to="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages - Section 4 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Featured Tours
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore Our Premium Packages
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {homePageData.featuredPackages.description}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white">
                      {pkg.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-slate-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pkg.destination}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                      <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                    </div>
                    <Button 
                      asChild
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Link to={`/packages/${pkg.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredPackages.map((pkg) => (
                  <CarouselItem key={pkg.id} className="pl-4 basis-[80%] sm:basis-[85%]">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {pkg.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pkg.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-slate-500 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pkg.destination}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {pkg.title}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {pkg.duration}
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                            <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                          </div>
                          <Button 
                            asChild
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                          >
                            <Link to={`/packages/${pkg.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12" />
              <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
            >
              <Link to="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages - Section 5 */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Featured Tours
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Epic Adventure Escapes
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {homePageData.featuredPackages.description}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white">
                      {pkg.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-slate-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pkg.destination}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                      <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                    </div>
                    <Button 
                      asChild
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Link to={`/packages/${pkg.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredPackages.map((pkg) => (
                  <CarouselItem key={pkg.id} className="pl-4 basis-[80%] sm:basis-[85%]">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {pkg.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pkg.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-slate-500 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pkg.destination}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {pkg.title}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {pkg.duration}
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                            <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                          </div>
                          <Button 
                            asChild
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                          >
                            <Link to={`/packages/${pkg.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12" />
              <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
            >
              <Link to="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Travel Blog
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {homePageData.latestBlogs.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {homePageData.latestBlogs.description}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-slate-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <span className="text-sm font-medium text-slate-700">{post.author}</span>
                    </div>
                    <Button 
                      asChild
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Link to={`/blog/${post.id}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {latestBlogs.map((post) => (
                  <CarouselItem key={post.id} className="pl-4 basis-[80%] sm:basis-[85%]">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-slate-500 text-sm mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <img 
                              src={post.authorImage} 
                              alt={post.author}
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <span className="text-sm font-medium text-slate-700">{post.author}</span>
                          </div>
                        </div>

                        <Button 
                          asChild
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        >
                          <Link to={`/blog/${post.id}`}>
                            Read More
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12" />
              <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
            >
              <Link to="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;