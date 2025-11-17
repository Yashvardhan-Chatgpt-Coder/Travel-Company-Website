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
  ).slice(0, 6);
  
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-60 lg:h-[350px]">
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
                <TabsTrigger value="packages">Other Packages</TabsTrigger>
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

                {/* Not Included Section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Not Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">International flights</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">Travel insurance</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">Personal expenses</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">Visa fees</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">Optional activities</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">Tips and gratuities</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">Alcoholic beverages</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-600">Laundry services</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="mt-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Similar Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPackages.map((pkg) => (
                      <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-4">
                          <div className="flex items-center text-slate-500 text-sm mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {pkg.destination}
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{pkg.title}</h4>
                          <div className="flex items-center space-x-1 mb-3">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pkg.rating}</span>
                            <span className="text-sm text-slate-500">({pkg.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-slate-900">${pkg.price}</span>
                              {pkg.originalPrice > pkg.price && (
                                <span className="text-sm text-slate-500 line-through ml-2">${pkg.originalPrice}</span>
                              )}
                            </div>
                            <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                              <Link to={`/packages/${pkg.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {relatedPackages.length === 0 && (
                    <p className="text-slate-600 text-center py-8">No similar packages found.</p>
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

        {/* Terms and Conditions Section */}
        <section className="mt-16 pt-16 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Terms and Conditions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="booking" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 text-left">Booking and Payment</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2 text-slate-600">
                    <li>• A deposit of 30% is required to confirm your booking</li>
                    <li>• Full payment must be completed 30 days before departure</li>
                    <li>• All prices are in USD and include taxes unless otherwise stated</li>
                    <li>• Payment can be made via credit card, bank transfer, or PayPal</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancellation" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 text-left">Cancellation Policy</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2 text-slate-600">
                    <li>• Cancellation 60+ days before departure: Full refund minus $100 processing fee</li>
                    <li>• Cancellation 30-59 days before departure: 75% refund</li>
                    <li>• Cancellation 15-29 days before departure: 50% refund</li>
                    <li>• Cancellation less than 15 days: No refund</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="documents" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 text-left">Travel Documents</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2 text-slate-600">
                    <li>• Valid passport required (minimum 6 months validity)</li>
                    <li>• Visa requirements vary by destination - check with embassy</li>
                    <li>• Travel insurance is strongly recommended</li>
                    <li>• All travelers must provide accurate personal information</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="health" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 text-left">Health and Safety</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2 text-slate-600">
                    <li>• Participants must be in good physical condition for adventure activities</li>
                    <li>• Medical conditions must be disclosed before booking</li>
                    <li>• Follow all safety instructions provided by guides</li>
                    <li>• Company is not liable for personal injury due to negligence</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="force-majeure" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 text-left">Force Majeure</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2 text-slate-600">
                    <li>• Tours may be modified or cancelled due to weather, natural disasters, or political unrest</li>
                    <li>• Alternative arrangements will be provided when possible</li>
                    <li>• Refunds will be processed according to circumstances</li>
                    <li>• Travel insurance is recommended to cover unforeseen events</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="important" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 text-left">Important Notes</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-slate-600 leading-relaxed">
                      By booking this package, you agree to these terms and conditions. We reserve the right to modify 
                      itineraries due to local conditions while maintaining the quality of your experience. For any 
                      questions or clarifications, please contact our customer service team.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PackageDetailPage;