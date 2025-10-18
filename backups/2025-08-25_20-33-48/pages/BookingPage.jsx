import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin, Star, Check, CreditCard, Shield, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import { travelPackages } from '../data/mock';

export const BookingPage = () => {
  const { packageId } = useParams();
  const packageData = travelPackages.find(pkg => pkg.id === parseInt(packageId));
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelers: 2,
    departureDate: '',
    specialRequests: '',
    emergencyName: '',
    emergencyPhone: '',
    agreeTerms: false,
    newsletter: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    // Mock booking submission
    toast.success('Booking submitted successfully! We will contact you within 24 hours.');
    console.log('Booking data:', { ...formData, packageId: packageData.id });
  };

  const totalPrice = packageData.price * formData.travelers;
  const tax = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + tax;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button asChild variant="outline">
              <Link to={`/packages/${packageData.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Package
              </Link>
            </Button>
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 ${
                      step < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {currentStep === 1 && 'Personal Information'}
                  {currentStep === 2 && 'Travel Details'}
                  {currentStep === 3 && 'Payment & Confirmation'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
                          <Input
                            id="emergencyName"
                            value={formData.emergencyName}
                            onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                            placeholder="Emergency contact name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                          <Input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                            placeholder="Emergency contact phone"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Travel Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="travelers">Number of Travelers *</Label>
                          <Select value={formData.travelers.toString()} onValueChange={(value) => handleInputChange('travelers', parseInt(value))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Person' : 'People'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="departureDate">Preferred Departure Date *</Label>
                          <Input
                            id="departureDate"
                            type="date"
                            value={formData.departureDate}
                            onChange={(e) => handleInputChange('departureDate', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="specialRequests">Special Requests or Dietary Requirements</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          placeholder="Any special requirements, dietary restrictions, or preferences..."
                          rows={4}
                        />
                      </div>

                      <Card className="p-4 bg-blue-50 border-blue-200">
                        <div className="flex items-start space-x-3">
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Travel Insurance</h4>
                            <p className="text-sm text-blue-700 mb-3">
                              We highly recommend purchasing travel insurance to protect your investment and provide peace of mind.
                            </p>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="insurance" />
                              <Label htmlFor="insurance" className="text-sm text-blue-700">
                                Yes, I'm interested in travel insurance options
                              </Label>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Step 3: Payment & Confirmation */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <Card className="p-4 bg-emerald-50 border-emerald-200">
                        <div className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-emerald-900 mb-2">Booking Summary</h4>
                            <div className="text-sm text-emerald-700 space-y-1">
                              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                              <p><strong>Email:</strong> {formData.email}</p>
                              <p><strong>Travelers:</strong> {formData.travelers} people</p>
                              <p><strong>Departure:</strong> {formData.departureDate || 'Not selected'}</p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Payment Information</h4>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date *</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="agreeTerms" 
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                          />
                          <Label htmlFor="agreeTerms" className="text-sm">
                            I agree to the <a href="#" className="text-emerald-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a> *
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="newsletter" 
                            checked={formData.newsletter}
                            onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                          />
                          <Label htmlFor="newsletter" className="text-sm">
                            Subscribe to our newsletter for travel tips and exclusive offers
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 mt-8 border-t">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    {currentStep < totalSteps ? (
                      <Button 
                        type="button" 
                        onClick={handleNextStep}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Complete Booking
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Package Summary */}
              <Card>
                <CardContent className="p-6">
                  <img 
                    src={packageData.image} 
                    alt={packageData.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <div className="space-y-3">
                    <Badge className="bg-emerald-500 text-white">
                      {packageData.category}
                    </Badge>
                    <h3 className="font-bold text-slate-900">{packageData.title}</h3>
                    <div className="flex items-center text-slate-500 text-sm space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {packageData.destination}
                      </div>
                    </div>
                    <div className="flex items-center text-slate-500 text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {packageData.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {packageData.rating} ({packageData.reviews})
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Price Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">
                        ${packageData.price} x {formData.travelers} travelers
                      </span>
                      <span className="font-medium">${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Taxes & fees</span>
                      <span className="font-medium">${tax}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                    {packageData.originalPrice > packageData.price && (
                      <div className="text-sm text-emerald-600 font-medium">
                        You save ${(packageData.originalPrice - packageData.price) * formData.travelers}!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="bg-slate-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Need Help?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>support@wanderlust.com</span>
                    </div>
                    <p className="text-slate-600 mt-4">
                      Our travel experts are available 24/7 to assist you with your booking.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;