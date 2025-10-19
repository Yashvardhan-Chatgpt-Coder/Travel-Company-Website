import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Filter, Search, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { travelPackages } from '../data/mock';

export const PackagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['all', ...new Set(travelPackages.map(pkg => pkg.category))];

  const filteredPackages = travelPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || pkg.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'under-1500' && pkg.price < 1500) ||
                        (priceFilter === '1500-2500' && pkg.price >= 1500 && pkg.price <= 2500) ||
                        (priceFilter === 'over-2500' && pkg.price > 2500);
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore Our Travel Packages
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover amazing destinations and create unforgettable memories with our carefully curated travel experiences
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search destinations or packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-1500">Under $1,500</SelectItem>
                  <SelectItem value="1500-2500">$1,500 - $2,500</SelectItem>
                  <SelectItem value="over-2500">Over $2,500</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredPackages.length} Package{filteredPackages.length !== 1 ? 's' : ''} Found
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-slate-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No packages found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group bg-white">
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
                        <span className="text-xs text-slate-500">({pkg.reviews})</span>
                      </div>
                    </div>
                    {pkg.originalPrice > pkg.price && (
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="destructive" className="bg-red-500 text-white">
                          Save ${pkg.originalPrice - pkg.price}
                        </Badge>
                      </div>
                    )}
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

                    {/* Highlights */}
                    <div className="mb-4">
                      <ul className="text-sm text-slate-600 space-y-1">
                        {pkg.highlights.slice(0, 2).map((highlight, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            {highlight}
                          </li>
                        ))}
                        {pkg.highlights.length > 2 && (
                          <li className="text-blue-600 font-medium">
                            +{pkg.highlights.length - 2} more highlights
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                        {pkg.originalPrice > pkg.price && (
                          <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                        )}
                      </div>
                      <div className="space-x-2">
                        <Button 
                          asChild
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                        >
                          <Link to={`/packages/${pkg.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button 
                          asChild
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        >
                          <Link to={`/book/${pkg.id}`}>
                            Book Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredPackages.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline"
                size="lg"
                className="px-8 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
              >
                Load More Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;