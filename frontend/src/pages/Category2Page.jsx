import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, MapPin, Calendar, Clock, ArrowRight, Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { travelPackages } from '../data/mock';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const Category2Page = () => {
  const [filters, setFilters] = useState({
    rating: 'any',
    duration: 'any',
    price: 'any',
    destination: 'any'
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              Popular Destination Packages
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Discover amazing destinations around the world with our handpicked collection of premium travel packages
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <Button onClick={() => setIsFilterOpen(true)} className="w-full" variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              {/* Filters Sidebar - Desktop */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <Card className="sticky top-24 flex flex-col h-[calc(100vh-8rem)]">
                  <div className="p-6 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-600 rounded"></div>
                      <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-6">

                  {/* Rating Filter */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 bg-blue-600 rounded"></div>
                      <Label className="text-sm font-semibold text-slate-700">RATING</Label>
                    </div>
                    <RadioGroup value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="rating-any" />
                          <Label htmlFor="rating-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4.5" id="rating-4.5" />
                          <Label htmlFor="rating-4.5" className="text-sm text-slate-600 cursor-pointer">4.5+</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4.0" id="rating-4.0" />
                          <Label htmlFor="rating-4.0" className="text-sm text-slate-600 cursor-pointer">4.0+</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3.5" id="rating-3.5" />
                          <Label htmlFor="rating-3.5" className="text-sm text-slate-600 cursor-pointer">3.5+</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3.0" id="rating-3.0" />
                          <Label htmlFor="rating-3.0" className="text-sm text-slate-600 cursor-pointer">3.0+</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Duration Filter */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 bg-blue-600 rounded"></div>
                      <Label className="text-sm font-semibold text-slate-700">DURATION</Label>
                    </div>
                    <RadioGroup value={filters.duration} onValueChange={(value) => setFilters({...filters, duration: value})}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="duration-any" />
                          <Label htmlFor="duration-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1-3" id="duration-1-3" />
                          <Label htmlFor="duration-1-3" className="text-sm text-slate-600 cursor-pointer">1-3 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4-6" id="duration-4-6" />
                          <Label htmlFor="duration-4-6" className="text-sm text-slate-600 cursor-pointer">4-6 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="7-9" id="duration-7-9" />
                          <Label htmlFor="duration-7-9" className="text-sm text-slate-600 cursor-pointer">7-9 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="10-12" id="duration-10-12" />
                          <Label htmlFor="duration-10-12" className="text-sm text-slate-600 cursor-pointer">10-12 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="13+" id="duration-13+" />
                          <Label htmlFor="duration-13+" className="text-sm text-slate-600 cursor-pointer">13+ Days</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 bg-blue-600 rounded"></div>
                      <Label className="text-sm font-semibold text-slate-700">PRICE</Label>
                    </div>
                    <RadioGroup value={filters.price} onValueChange={(value) => setFilters({...filters, price: value})}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="price-any" />
                          <Label htmlFor="price-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0-1000" id="price-0-1000" />
                          <Label htmlFor="price-0-1000" className="text-sm text-slate-600 cursor-pointer">₹ 0 - ₹ 1,000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1000-2500" id="price-1000-2500" />
                          <Label htmlFor="price-1000-2500" className="text-sm text-slate-600 cursor-pointer">₹ 1,000 - ₹ 2,500</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2500-5000" id="price-2500-5000" />
                          <Label htmlFor="price-2500-5000" className="text-sm text-slate-600 cursor-pointer">₹ 2,500 - ₹ 5,000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5000+" id="price-5000+" />
                          <Label htmlFor="price-5000+" className="text-sm text-slate-600 cursor-pointer">₹ 5,000+</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Destination Filter */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 bg-blue-600 rounded"></div>
                      <Label className="text-sm font-semibold text-slate-700">DESTINATION</Label>
                    </div>
                    <RadioGroup value={filters.destination} onValueChange={(value) => setFilters({...filters, destination: value})}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="destination-any" />
                          <Label htmlFor="destination-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bali" id="destination-bali" />
                          <Label htmlFor="destination-bali" className="text-sm text-slate-600 cursor-pointer">Bali, Indonesia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="japan" id="destination-japan" />
                          <Label htmlFor="destination-japan" className="text-sm text-slate-600 cursor-pointer">Japan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="switzerland" id="destination-switzerland" />
                          <Label htmlFor="destination-switzerland" className="text-sm text-slate-600 cursor-pointer">Switzerland</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maldives" id="destination-maldives" />
                          <Label htmlFor="destination-maldives" className="text-sm text-slate-600 cursor-pointer">Maldives</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paris" id="destination-paris" />
                          <Label htmlFor="destination-paris" className="text-sm text-slate-600 cursor-pointer">Paris, France</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dubai" id="destination-dubai" />
                          <Label htmlFor="destination-dubai" className="text-sm text-slate-600 cursor-pointer">Dubai, UAE</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  </div>
                  <div className="p-6 pt-4 flex-shrink-0 border-t border-slate-200">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setFilters({ rating: 'any', duration: 'any', price: 'any', destination: 'any' })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </Card>
              </aside>

              {/* Packages List */}
              <div className="flex-1">
                {/* Sort and Count Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <p className="text-sm text-slate-600">
                    Showing 1-6 of {travelPackages.length} results
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Package Cards List */}
                <div className="space-y-6">
                  {travelPackages.filter(pkg => !pkg.title.toLowerCase().includes('bali') && !pkg.title.toLowerCase().includes('maldives')).slice(0, 6).map((pkg) => (
                    <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <Link to={`/packages/${pkg.id}`} className="block">
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden flex-shrink-0" style={{ minHeight: '200px' }}>
                            <img
                              src={pkg.image}
                              alt={pkg.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-blue-600 text-white">
                                Popular Packages
                              </Badge>
                            </div>
                            <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-white text-sm font-semibold">{pkg.rating}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4 md:p-6">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="flex items-center gap-1 text-slate-600 text-sm">
                                <MapPin className="h-4 w-4" />
                                <span>{pkg.destination}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                              {pkg.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1 text-slate-600">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">{pkg.duration}</span>
                              </div>
                            </div>

                            <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                              Discover {pkg.destination}, a beautiful destination with amazing experiences and unforgettable memories.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div>
                                <p className="text-xs text-slate-500 mb-1">STARTING FROM</p>
                                <p className="text-xl md:text-2xl font-bold text-blue-600">₹ {pkg.price.toLocaleString()}</p>
                              </div>
                              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm">
                                View Details
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* You Might Also Like Section */}
        <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                You Might Also Like
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore more amazing destinations and create unforgettable memories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {travelPackages.slice(9, 15).map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <Link to={`/packages/${pkg.id}`} className="block">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white text-xs px-1.5 py-0.5">
                          {pkg.category}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-xs font-semibold">{pkg.rating}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {pkg.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{pkg.destination}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-blue-600">${pkg.price}</span>
                          <span className="text-slate-500 text-xs">/ person</span>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs px-2 py-1 h-auto">
                          View
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 flex-shrink-0 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                <span>Filters</span>
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto px-6 pt-4">
            {/* Rating Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded"></div>
                <Label className="text-sm font-semibold text-slate-700">RATING</Label>
              </div>
              <RadioGroup value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="mobile-rating-any" />
                    <Label htmlFor="mobile-rating-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4.5" id="mobile-rating-4.5" />
                    <Label htmlFor="mobile-rating-4.5" className="text-sm text-slate-600 cursor-pointer">4.5+</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4.0" id="mobile-rating-4.0" />
                    <Label htmlFor="mobile-rating-4.0" className="text-sm text-slate-600 cursor-pointer">4.0+</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3.5" id="mobile-rating-3.5" />
                    <Label htmlFor="mobile-rating-3.5" className="text-sm text-slate-600 cursor-pointer">3.5+</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3.0" id="mobile-rating-3.0" />
                    <Label htmlFor="mobile-rating-3.0" className="text-sm text-slate-600 cursor-pointer">3.0+</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Duration Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded"></div>
                <Label className="text-sm font-semibold text-slate-700">DURATION</Label>
              </div>
              <RadioGroup value={filters.duration} onValueChange={(value) => setFilters({...filters, duration: value})}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="mobile-duration-any" />
                    <Label htmlFor="mobile-duration-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3" id="mobile-duration-1-3" />
                    <Label htmlFor="mobile-duration-1-3" className="text-sm text-slate-600 cursor-pointer">1-3 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4-6" id="mobile-duration-4-6" />
                    <Label htmlFor="mobile-duration-4-6" className="text-sm text-slate-600 cursor-pointer">4-6 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7-9" id="mobile-duration-7-9" />
                    <Label htmlFor="mobile-duration-7-9" className="text-sm text-slate-600 cursor-pointer">7-9 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10-12" id="mobile-duration-10-12" />
                    <Label htmlFor="mobile-duration-10-12" className="text-sm text-slate-600 cursor-pointer">10-12 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="13+" id="mobile-duration-13+" />
                    <Label htmlFor="mobile-duration-13+" className="text-sm text-slate-600 cursor-pointer">13+ Days</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded"></div>
                <Label className="text-sm font-semibold text-slate-700">PRICE</Label>
              </div>
              <RadioGroup value={filters.price} onValueChange={(value) => setFilters({...filters, price: value})}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="mobile-price-any" />
                    <Label htmlFor="mobile-price-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0-1000" id="mobile-price-0-1000" />
                    <Label htmlFor="mobile-price-0-1000" className="text-sm text-slate-600 cursor-pointer">₹ 0 - ₹ 1,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1000-2500" id="mobile-price-1000-2500" />
                    <Label htmlFor="mobile-price-1000-2500" className="text-sm text-slate-600 cursor-pointer">₹ 1,000 - ₹ 2,500</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2500-5000" id="mobile-price-2500-5000" />
                    <Label htmlFor="mobile-price-2500-5000" className="text-sm text-slate-600 cursor-pointer">₹ 2,500 - ₹ 5,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5000+" id="mobile-price-5000+" />
                    <Label htmlFor="mobile-price-5000+" className="text-sm text-slate-600 cursor-pointer">₹ 5,000+</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Destination Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded"></div>
                <Label className="text-sm font-semibold text-slate-700">DESTINATION</Label>
              </div>
              <RadioGroup value={filters.destination} onValueChange={(value) => setFilters({...filters, destination: value})}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="mobile-destination-any" />
                    <Label htmlFor="mobile-destination-any" className="text-sm text-slate-600 cursor-pointer">Any</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bali" id="mobile-destination-bali" />
                    <Label htmlFor="mobile-destination-bali" className="text-sm text-slate-600 cursor-pointer">Bali, Indonesia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="japan" id="mobile-destination-japan" />
                    <Label htmlFor="mobile-destination-japan" className="text-sm text-slate-600 cursor-pointer">Japan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="switzerland" id="mobile-destination-switzerland" />
                    <Label htmlFor="mobile-destination-switzerland" className="text-sm text-slate-600 cursor-pointer">Switzerland</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maldives" id="mobile-destination-maldives" />
                    <Label htmlFor="mobile-destination-maldives" className="text-sm text-slate-600 cursor-pointer">Maldives</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paris" id="mobile-destination-paris" />
                    <Label htmlFor="mobile-destination-paris" className="text-sm text-slate-600 cursor-pointer">Paris, France</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dubai" id="mobile-destination-dubai" />
                    <Label htmlFor="mobile-destination-dubai" className="text-sm text-slate-600 cursor-pointer">Dubai, UAE</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="p-6 pt-4 flex-shrink-0 border-t border-slate-200 flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setFilters({ rating: 'any', duration: 'any', price: 'any', destination: 'any' })}
            >
              Clear All
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Category2Page;

