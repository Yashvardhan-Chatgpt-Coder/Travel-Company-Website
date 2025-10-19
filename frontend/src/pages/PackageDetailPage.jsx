import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, Calendar, Users, Shield, Award, ArrowRight, 
  Check, ChevronDown, ChevronUp, Clock, Plane, Camera, Utensils 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { travelPackages, testimonials } from '../data/mock';

export const PackageDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const packageData = travelPackages.find(pkg => pkg.id === parseInt(id));
  const relatedPackages = travelPackages.filter(pkg => 
    pkg.id !== parseInt(id) && pkg.category === packageData?.category
  ).slice(0, 3);
  
  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Package Not Found</h1>
          <Button asChild>
            <Link to="/packages">Back to Packages</Link>
          </Button>
        </div>
      </div>
    );
  }

  const packageTestimonials = testimonials.filter(t => t.packageId === packageData.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-72 lg:h-[380px]">
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg">
            <img 
              src={packageData.gallery[selectedImage]} 
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-500 text-white text-sm">
                {packageData.category}
              </Badge>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-2">
            {packageData.gallery.slice(1, 3).map((image, index) => (
              <div 
                key={index + 1}
                className="flex-1 relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(index + 1)}
              >
                <img 
                  src={image} 
                  alt={`${packageData.title} ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
            {packageData.gallery.length > 3 && (
              <div className="flex-1 relative overflow-hidden rounded-lg cursor-pointer bg-slate-800 flex items-center justify-center">
                <span className="text-white font-semibold">+{packageData.gallery.length - 3} Photos</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center text-slate-500 text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {packageData.destination}
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{packageData.title}</h1>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{packageData.rating}</span>
                  <span className="text-slate-500">({packageData.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-slate-500">
                  <Calendar className="h-5 w-5 mr-1" />
                  {packageData.duration}
                </div>
                <div className="flex items-center text-slate-500">
                  <Users className="h-5 w-5 mr-1" />
                  2-12 People
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Package Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packageData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-slate-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">About This Tour</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Experience the magic of {packageData.destination} with our carefully crafted {packageData.duration} journey. 
                    This {packageData.category.toLowerCase()} adventure offers the perfect blend of culture, adventure, and relaxation. 
                    From stunning landscapes to rich cultural experiences, every moment is designed to create lasting memories.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Detailed Itinerary</h3>
                  <Accordion type="single" collapsible className="space-y-4">
                    {packageData.itinerary.map((day, index) => (
                      <AccordionItem key={index} value={`day-${day.day}`} className="border rounded-lg">
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              Day {day.day}
                            </div>
                            <h4 className="text-lg font-semibold text-left">{day.title}</h4>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <ul className="space-y-3">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start space-x-3">
                                <Clock className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                                <span className="text-slate-600">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="included" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">What's Included</h3>
                    <ul className="space-y-3">
                      {packageData.included.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">What to Expect</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Plane className="h-5 w-5 text-blue-600" />
                        <span className="text-slate-600">Airport transfers included</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Utensils className="h-5 w-5 text-orange-600" />
                        <span className="text-slate-600">Local cuisine experiences</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Camera className="h-5 w-5 text-purple-600" />
                        <span className="text-slate-600">Professional photo opportunities</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="text-slate-600">24/7 support & safety</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Traveler Reviews</h3>
                  {packageTestimonials.length > 0 ? (
                    <div className="space-y-6">
                      {packageTestimonials.map((review) => (
                        <Card key={review.id} className="p-6">
                          <CardContent className="p-0">
                            <div className="flex items-center mb-4">
                              <img 
                                src={review.image} 
                                alt={review.name}
                                className="w-12 h-12 rounded-full object-cover mr-4"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900">{review.name}</h4>
                                <p className="text-sm text-slate-500">{review.location}</p>
                              </div>
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">"{review.text}"</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">No reviews yet for this package.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="p-6 shadow-lg">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-3xl font-bold text-slate-900">${packageData.price}</span>
                      {packageData.originalPrice > packageData.price && (
                        <span className="text-lg text-slate-500 line-through">${packageData.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">per person</p>
                    {packageData.originalPrice > packageData.price && (
                      <Badge variant="destructive" className="bg-red-500 text-white mt-2">
                        Save ${packageData.originalPrice - packageData.price}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-6 text-lg"
                    >
                      <Link to={`/book/${packageData.id}`}>
                        Book This Package
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Check Dates
                      </Button>
                      <Button variant="outline" className="text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        Group Size
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Why Book With Us?</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span>100% Safe & Secure</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-blue-600" />
                        <span>Award-Winning Service</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-blue-600" />
                        <span>24/7 Customer Support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="mt-16 pt-16 border-t">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Similar Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">{pkg.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">${pkg.price}</span>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/packages/${pkg.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PackageDetailPage;