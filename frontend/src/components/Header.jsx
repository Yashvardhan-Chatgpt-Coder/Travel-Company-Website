import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
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
  const location = useLocation();

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
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Wanderlust</h1>
              <p className="text-xs text-slate-500 -mt-1">Travel & Tours</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-10">
                {/* International Tour */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>International Tour</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-1 gap-1 p-2 md:w-[320px]">
                      {internationalLocations.map((loc) => (
                        <NavigationMenuLink asChild key={loc.query}>
                          <Link to={`/packages?location=${loc.query}`} className="rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-accent hover:text-accent-foreground">
                            {loc.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* India Tour */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>India Tour</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-1 gap-1 p-2 md:w-[300px]">
                      {indiaLocations.map((loc) => (
                        <NavigationMenuLink asChild key={loc.query}>
                          <Link to={`/packages?india=${loc.query}`} className="rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-accent hover:text-accent-foreground">
                            {loc.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Fixed Departure */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Fixed Departure</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-1 gap-1 p-2 md:w-[300px]">
                      {indiaLocations.map((loc) => (
                        <NavigationMenuLink asChild key={`fd-${loc.query}`}>
                          <Link to={`/packages?departure=${loc.query}`} className="rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-accent hover:text-accent-foreground">
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              asChild
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6"
            >
              <Link to="/packages">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:text-emerald-600 hover:bg-slate-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-2">International Tour</p>
              <div className="space-y-2">
                {internationalLocations.map((loc) => (
                  <Link key={loc.query} to={`/packages?location=${loc.query}`} onClick={() => setIsMenuOpen(false)} className="block text-slate-700">
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 mb-2">India Tour</p>
              <div className="space-y-2">
                {indiaLocations.map((loc) => (
                  <Link key={loc.query} to={`/packages?india=${loc.query}`} onClick={() => setIsMenuOpen(false)} className="block text-slate-700">
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 mb-2">Fixed Departure</p>
              <div className="space-y-2">
                {indiaLocations.map((loc) => (
                  <Link key={`fdm-${loc.query}`} to={`/packages?departure=${loc.query}`} onClick={() => setIsMenuOpen(false)} className="block text-slate-700">
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            <Button 
              asChild
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              <Link to="/packages" onClick={() => setIsMenuOpen(false)}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;