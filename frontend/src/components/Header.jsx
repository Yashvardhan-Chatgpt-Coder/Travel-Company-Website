import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, ChevronDown, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './ui/navigation-menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    budget: '',
    message: '',
    newsletter: true
  });
  const location = useLocation();
  const { toast } = useToast();

  const toggleMobileSection = (section) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Booking form submitted:', bookingForm);
    
    setIsBookingOpen(false);
    
    // Show success toast
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <span>Booking Inquiry Submitted!</span>
        </div>
      ),
      description: "Thank you for your interest! Our travel experts will review your request and contact you within 24 hours to help plan your perfect vacation.",
      duration: 6000,
    });
    
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      destination: '',
      budget: '',
      message: '',
      newsletter: true
    });
  };

  const handleInputChange = (field, value) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const isActive = (path) => location.pathname === path;

  const internationalLocations = [
    { name: 'Bali, Indonesia', query: 'bali' },
    { name: 'Tokyo, Japan', query: 'tokyo' },
    { name: 'Kyoto, Japan', query: 'kyoto' },
    { name: 'Interlaken, Switzerland', query: 'interlaken' },
    { name: 'Paris, France', query: 'paris' },
    { name: 'Rome, Italy', query: 'rome' },
    { name: 'Barcelona, Spain', query: 'barcelona' },
    { name: 'Istanbul, Turkey', query: 'istanbul' },
    { name: 'Dubai, UAE', query: 'dubai' },
    { name: 'Phuket, Thailand', query: 'phuket' },
  ];

  const indiaLocations = [
    { name: 'Goa', query: 'goa' },
    { name: 'Kerala', query: 'kerala' },
    { name: 'Rajasthan', query: 'rajasthan' },
    { name: 'Himachal Pradesh', query: 'himachal' },
    { name: 'Uttarakhand', query: 'uttarakhand' },
    { name: 'Ladakh', query: 'ladakh' },
    { name: 'Kashmir', query: 'kashmir' },
    { name: 'Andaman & Nicobar', query: 'andaman' },
    { name: 'Sikkim', query: 'sikkim' },
    { name: 'Meghalaya', query: 'meghalaya' },
  ];

  return (
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-slate-600">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@wanderlust.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <MapPin className="h-4 w-4" />
              <span>Serving travelers worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Paradise Yatra</h1>
              <p className="text-xs text-slate-500 -mt-1">Yatra To Paradise</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* International Tour */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>International Tour</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-1 gap-1 p-3 w-auto min-w-[200px]">
                      {internationalLocations.map((loc) => (
                        <NavigationMenuLink asChild key={loc.query}>
                          <Link to={`/packages?location=${loc.query}`} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap transition-colors">
                            {loc.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* India Tour */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>India Tour</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-1 gap-1 p-3 w-auto min-w-[200px]">
                      {indiaLocations.map((loc) => (
                        <NavigationMenuLink asChild key={loc.query}>
                          <Link to={`/packages?india=${loc.query}`} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap transition-colors">
                            {loc.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Fixed Departure */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Fixed Departure</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-1 gap-1 p-3 w-auto min-w-[200px]">
                      {indiaLocations.map((loc) => (
                        <NavigationMenuLink asChild key={`fd-${loc.query}`}>
                          <Link to={`/packages?departure=${loc.query}`} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap transition-colors">
                            {loc.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 shadow-lg hover:shadow-green-500/20 transition-all duration-300"
            >
              <Link to="/payment">
                Pay Now
              </Link>
            </Button>
            
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6"
                >
                  Book Now
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogContent className="sm:max-w-[550px] max-w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Book Your Dream Vacation
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    Fill in the details below and our travel experts will get back to you within 24 hours.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={bookingForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={bookingForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={bookingForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="destination" className="text-sm">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="e.g., Bali, Paris, Kerala..."
                      value={bookingForm.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      className="h-10 sm:h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="budget" className="text-sm">Budget</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $3000 per person"
                      value={bookingForm.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="h-10 sm:h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm">Special Requirements / Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your preferences, budget, or any special requirements..."
                      rows={3}
                      className="resize-none text-sm"
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3 pt-1">
                    <Checkbox 
                      id="newsletter"
                      checked={bookingForm.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                      className="mt-0.5"
                    />
                    <Label 
                      htmlFor="newsletter" 
                      className="text-xs sm:text-sm font-normal leading-relaxed cursor-pointer"
                    >
                      I would like to receive newsletters and updates about travel deals and destinations
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-11 sm:h-12 text-sm sm:text-base mt-2"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Booking Inquiry
                  </Button>

                  <p className="text-xs text-slate-500 text-center leading-relaxed -mt-1">
                    By submitting this form, you agree to our{' '}
                    <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                      privacy policy
                    </Link>
                    {' '}and{' '}
                    <Link to="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                      terms of service
                    </Link>.
                  </p>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:text-blue-600 hover:bg-slate-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg max-h-[calc(100vh-140px)] overflow-y-auto">
          <div className="px-4 py-3">
            {/* International Tour */}
            <div className="border-b border-slate-200">
              <button
                onClick={() => toggleMobileSection('international')}
                className="w-full flex items-center justify-between py-3 text-left"
              >
                <span className="text-base font-semibold text-slate-900">International Tour</span>
                <ChevronDown 
                  className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
                    mobileExpandedSection === 'international' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileExpandedSection === 'international' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-3 space-y-1">
                  {internationalLocations.map((loc) => (
                    <Link 
                      key={loc.query} 
                      to={`/packages?location=${loc.query}`} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="block py-2 px-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* India Tour */}
            <div className="border-b border-slate-200">
              <button
                onClick={() => toggleMobileSection('india')}
                className="w-full flex items-center justify-between py-3 text-left"
              >
                <span className="text-base font-semibold text-slate-900">India Tour</span>
                <ChevronDown 
                  className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
                    mobileExpandedSection === 'india' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileExpandedSection === 'india' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-3 space-y-1">
                  {indiaLocations.map((loc) => (
                    <Link 
                      key={loc.query} 
                      to={`/packages?india=${loc.query}`} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="block py-2 px-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Fixed Departure */}
            <div className="border-b border-slate-200">
              <button
                onClick={() => toggleMobileSection('departure')}
                className="w-full flex items-center justify-between py-3 text-left"
              >
                <span className="text-base font-semibold text-slate-900">Fixed Departure</span>
                <ChevronDown 
                  className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
                    mobileExpandedSection === 'departure' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileExpandedSection === 'departure' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-3 space-y-1">
                  {indiaLocations.map((loc) => (
                    <Link 
                      key={`fdm-${loc.query}`} 
                      to={`/packages?departure=${loc.query}`} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="block py-2 px-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="py-4">
              <Button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;