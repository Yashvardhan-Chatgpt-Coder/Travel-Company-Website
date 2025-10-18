import React, { useState, useContext } from 'react';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Globe, 
  MapPin, 
  DollarSign,
  Calendar,
  Star,
  MoreVertical,
  TrendingUp,
  FileText,
  Archive,
  X,
  Image as ImageIcon,
  Tag,
  Hash,
  Save
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useDestinations } from '../context/DestinationsContext';

const PackageManagementPage = () => {
  // Use the hook with proper error handling
  const destinationsData = useDestinations();
  const availableDestinations = destinationsData?.destinations || [];
  const destinationsLoading = destinationsData?.loading || false;
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('');
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: 'blue',
    icon: 'Tag'
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [categorySearch, setCategorySearch] = useState('');
  const [assignmentFilter, setAssignmentFilter] = useState('all'); // all | assigned | unassigned

  // Whitelisted Tailwind color tokens for category badges and previews
  const colorOptions = [
    { value: 'blue', label: 'Blue', bg: 'bg-blue-500', bgLight: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    { value: 'purple', label: 'Purple', bg: 'bg-purple-500', bgLight: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
    { value: 'green', label: 'Green', bg: 'bg-green-500', bgLight: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    { value: 'orange', label: 'Orange', bg: 'bg-orange-500', bgLight: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
    { value: 'red', label: 'Red', bg: 'bg-red-500', bgLight: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
    { value: 'pink', label: 'Pink', bg: 'bg-pink-500', bgLight: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
    { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-500', bgLight: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
    { value: 'yellow', label: 'Yellow', bg: 'bg-yellow-500', bgLight: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
    { value: 'emerald', label: 'Emerald', bg: 'bg-emerald-500', bgLight: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
    { value: 'teal', label: 'Teal', bg: 'bg-teal-500', bgLight: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
    { value: 'sky', label: 'Sky', bg: 'bg-sky-500', bgLight: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200' },
    { value: 'amber', label: 'Amber', bg: 'bg-amber-500', bgLight: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
    { value: 'rose', label: 'Rose', bg: 'bg-rose-500', bgLight: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
  ];
  const [newPackage, setNewPackage] = useState({
    title: '',
    destination: '',
    duration: '',
    category: '',
    packageType: 'normal', // 'normal' or 'fixed-departure'
    price: '',
    originalPrice: '',
    savings: '', // Save amount (e.g., "Save $300")
    priceDisplay: 'per-person', // 'per-person' or 'per-couple'
    description: '',
    mainImage: '',
    galleryImages: '',
    highlights: [''],
    included: [''],
    whatToExpect: '', // What to expect section
    groupSize: '2-12',
    checkDates: '', // Only for fixed departure packages
    status: 'draft',
    itinerary: [], // Array of itinerary items
    reviews: [] // Array of reviews
  });

  // Mock data for packages
  const packages = [
        {
          id: 1,
      title: 'Bali Paradise Escape',
      destination: 'Bali, Indonesia',
      category: 'Beach & Relaxation',
      packageType: 'normal',
          price: 1299.99,
          originalPrice: 1599.99,
      duration: '7 Days, 6 Nights',
          rating: 4.8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
          bookings: 45,
      featured: true
        },
        {
          id: 2,
      title: 'Japan Cherry Blossom Tour',
      destination: 'Tokyo & Kyoto, Japan',
      category: 'Cultural & Historical',
      packageType: 'fixed-departure',
      price: 2499.99,
      originalPrice: 2899.99,
      duration: '10 Days, 9 Nights',
      rating: 4.9,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
          bookings: 32,
      featured: true,
      groupSize: '6-15',
      checkDates: '15 Mar 2024, 22 Mar 2024, 29 Mar 2024'
        },
        {
          id: 3,
      title: 'Swiss Alps Adventure',
      destination: 'Interlaken, Switzerland',
      category: 'Adventure & Nature',
      packageType: 'fixed-departure',
      price: 1899.99,
      originalPrice: 1899.99,
      duration: '8 Days, 7 Nights',
      rating: 4.7,
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      bookings: 0,
      featured: false,
      groupSize: '2-12',
      checkDates: '10 Apr 2024, 17 Apr 2024, 24 Apr 2024'
        },
        {
          id: 4,
      title: 'Paris City Explorer',
      destination: 'Paris, France',
      category: 'City & Urban',
      packageType: 'normal',
          price: 1699.99,
          originalPrice: 1999.99,
      duration: '6 Days, 5 Nights',
      rating: 4.6,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
          bookings: 28,
      featured: false
        },
        {
          id: 5,
      title: 'Safari Wildlife Experience',
      destination: 'Serengeti, Tanzania',
      category: 'Wildlife & Safari',
      packageType: 'fixed-departure',
      price: 3499.99,
      originalPrice: 3999.99,
      duration: '12 Days, 11 Nights',
      rating: 4.9,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400',
      bookings: 18,
      featured: true,
      groupSize: '2-6',
      checkDates: '20 May 2024, 27 May 2024, 3 Jun 2024'
    },
    {
      id: 6,
      title: 'Luxury Maldives Retreat',
      destination: 'Maldives',
      category: 'Luxury & Premium',
      packageType: 'normal',
      price: 4999.99,
      originalPrice: 5999.99,
      duration: '9 Days, 8 Nights',
      rating: 5.0,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400',
      bookings: 12,
      featured: true
    }
  ];

  const categories = ['All Categories', 'Beach & Relaxation', 'Cultural & Historical', 'Adventure & Nature', 'City & Urban', 'Wildlife & Safari', 'Luxury & Premium'];
  const pricingRanges = ['All Prices', 'Under $1000', '$1000 - $2000', '$2000 - $3000', '$3000 - $5000', 'Over $5000'];

  const stats = [
    { label: 'Total Packages', value: packages.length, change: '+2', icon: Globe, color: 'blue' },
    { label: 'Active Packages', value: packages.filter(p => p.status === 'active').length, change: '+1', icon: TrendingUp, color: 'emerald' },
    { label: 'Drafts', value: packages.filter(p => p.status === 'draft').length, change: '0', icon: FileText, color: 'yellow' },
    { label: 'Categories', value: categories.length - 1, change: '+1', icon: Filter, color: 'purple' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  const handleInputChange = (field, value) => {
    setNewPackage(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field, index, value) => {
    setNewPackage(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setNewPackage(prev => ({
      ...prev,
      [field]: field === 'itinerary' 
        ? [...prev[field], { title: '', description: '' }]
        : field === 'reviews'
        ? [...prev[field], { 
            author: '', 
            location: '', 
            rating: '5', 
            comment: '',
            profilePicture: { type: 'default', gender: 'female' } // default: male/female, custom: URL
          }]
        : [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setNewPackage(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setNewPackage(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === index ? { ...day, [field]: value } : day
      )
    }));
  };

  const handleReviewChange = (index, field, value) => {
    setNewPackage(prev => ({
      ...prev,
      reviews: prev.reviews.map((review, i) => {
        if (i === index) {
          // Automatically add quotes around comment text
          if (field === 'comment') {
            let quotedValue = value;
            // Remove all existing quotes from the text
            quotedValue = quotedValue.replace(/["""]/g, '');
            // Add only one quote at start and one at end
            quotedValue = `"${quotedValue}"`;
            return { ...review, [field]: quotedValue };
          }
          return { ...review, [field]: value };
        }
        return review;
      })
    }));
  };

  const handleReviewProfileChange = (index, field, value) => {
    setNewPackage(prev => ({
      ...prev,
      reviews: prev.reviews.map((review, i) => {
        if (i === index) {
          const updatedProfile = { ...review.profilePicture };
          if (field === 'type') {
            // Reset profile data when switching types
            if (value === 'default') {
              updatedProfile.type = 'default';
              updatedProfile.gender = 'female';
              delete updatedProfile.url;
            } else {
              updatedProfile.type = 'custom';
              updatedProfile.url = '';
              delete updatedProfile.gender;
            }
          } else {
            updatedProfile[field] = value;
          }
          return { ...review, profilePicture: updatedProfile };
        }
        return review;
      })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for fixed departure packages
    if (newPackage.packageType === 'fixed-departure') {
      if (!newPackage.groupSize || !newPackage.checkDates) {
        alert('For Fixed Departure packages, Group Size and Check Dates are required.');
        return;
      }
    }
    
    // Validation for price display
    if (!newPackage.priceDisplay) {
      alert('Please select a price display option (Per Person or Per Couple).');
      return;
    }
    
    // For normal packages, clear the fixed departure specific fields
    if (newPackage.packageType === 'normal') {
      newPackage.groupSize = '';
      newPackage.checkDates = '';
    }
    
    // Here you would typically send the data to your backend

    
    // Reset form and close dialog
    resetForm();
    setShowAddPackageForm(false);
  };

  const resetForm = () => {
    setNewPackage({
      title: '',
      destination: '',
      duration: '',
      category: '',
      packageType: 'normal',
      price: '',
      originalPrice: '',
      savings: '',
      priceDisplay: 'per-person',
      description: '',
      mainImage: '',
      galleryImages: '',
      highlights: [''],
      included: [''],
      whatToExpect: '',
      groupSize: '2-12',
      checkDates: '',
      status: 'draft',
      itinerary: [],
      reviews: []
    });
  };

  // Category management functions
  const handleCategoryInputChange = (field, value) => {
    setNewCategory(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      alert('Please enter a category name');
      return;
    }
    
    // Here you would typically send the data to your backend

    
    // Reset form and close dialog
    resetCategoryForm();
    setShowCategoryPanel(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon
    });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      alert('Please enter a category name');
      return;
    }
    
    // Here you would typically send the update to your backend

    
    // Reset form and close dialog
    resetCategoryForm();
    setShowCategoryPanel(false);
  };

  const handleDeleteCategory = (category) => {
    if (category.packagesCount > 0) {
      window.alert('This category is assigned to one or more packages and cannot be deleted.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      // Here you would typically send the delete request to your backend

    }
  };

  const resetCategoryForm = () => {
    setNewCategory({
      name: '',
      description: '',
      color: 'blue',
      icon: 'Tag'
    });
    setEditingCategory(null);
  };

  // Mock categories data for now
  const existingCategories = [
    { id: 1, name: 'Beach & Relaxation', description: 'Sun, sand, and relaxation packages', color: 'blue', icon: 'Tag', packagesCount: 12 },
    { id: 2, name: 'Cultural & Historical', description: 'Heritage and cultural experience tours', color: 'purple', icon: 'Hash', packagesCount: 8 },
    { id: 3, name: 'Adventure & Nature', description: 'Thrilling outdoor and nature adventures', color: 'green', icon: 'Tag', packagesCount: 15 },
    { id: 4, name: 'City & Urban', description: 'Urban exploration and city experiences', color: 'orange', icon: 'Hash', packagesCount: 10 },
    { id: 5, name: 'Wildlife & Safari', description: 'Wildlife encounters and safari experiences', color: 'emerald', icon: 'Tag', packagesCount: 6 },
    { id: 6, name: 'Luxury & Premium', description: 'High-end luxury travel experiences', color: 'indigo', icon: 'Hash', packagesCount: 4 }
  ];

  const filteredCategories = existingCategories
    .filter(category => category.name.toLowerCase().includes(categorySearch.toLowerCase()))
    .filter(category => {
      if (assignmentFilter === 'assigned') return category.packagesCount > 0;
      if (assignmentFilter === 'unassigned') return category.packagesCount === 0;
      return true;
    });

  // Add a simple loading state
  if (destinationsLoading || !destinationsData) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading package management...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Package Management</h1>
              <p className="text-slate-600">Manage all your travel packages, pricing, and availability</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                <FileText className="h-4 w-4 mr-2" />
                View Drafts
              </Button>
              <Button 
                variant="outline" 
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => setShowCategoryPanel(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Button>
            <Button 
                className="bg-emerald-700 hover:bg-emerald-800 text-white"
                onClick={() => setShowAddPackageForm(true)}
              >
              <Plus className="h-4 w-4 mr-2" />
                Add New Package
            </Button>
          </div>
        </div>
      </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-emerald-600">{stat.change} from last month</p>
                </div>
                  <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>

                 {/* Search and Filters */}
         <Card className="mb-8">
          <CardContent className="p-6">
             <div className="flex items-center space-x-4">
               {/* Search Bar */}
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search packages..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="pl-10 h-10"
                  />
                </div>

               {/* Filters */}
               <div className="flex items-center space-x-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                   <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                     {categories.map((category) => (
                       <SelectItem key={category} value={category}>
                         {category}
                       </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 
                                 <Select value={selectedDestination} onValueChange={setSelectedDestination} disabled={destinationsLoading}>
                   <SelectTrigger className="w-40">
                     <SelectValue placeholder={destinationsLoading ? "Loading..." : "Destination"} />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="all">All Destinations</SelectItem>
                     {destinationsLoading ? (
                       <SelectItem value="loading" disabled>Loading destinations...</SelectItem>
                     ) : availableDestinations.length > 0 ? (
                       availableDestinations.map((dest) => (
                         <SelectItem key={dest.id} value={dest.name}>
                           {dest.name}, {dest.country}
                         </SelectItem>
                       ))
                     ) : (
                       <SelectItem value="none" disabled>No destinations</SelectItem>
                     )}
                   </SelectContent>
                 </Select>
                 
                 <Select value={selectedPricing} onValueChange={setSelectedPricing}>
                   <SelectTrigger className="w-40">
                     <SelectValue placeholder="Pricing" />
                  </SelectTrigger>
                  <SelectContent>
                     {pricingRanges.map((range) => (
                       <SelectItem key={range} value={range}>
                         {range}
                       </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 
                <Select value={selectedPackageType} onValueChange={setSelectedPackageType}>
                   <SelectTrigger className="w-40">
                     <SelectValue placeholder="Package Type" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Types</SelectItem>
                     <SelectItem value="normal">Normal Packages</SelectItem>
                     <SelectItem value="fixed-departure">Fixed Departure</SelectItem>
                  </SelectContent>
                </Select>

                 {/* View Toggle */}
                 <div className="flex items-center space-x-2 ml-4">
                   <span className="text-sm font-medium text-slate-700">View:</span>
                   <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                <Button
                       variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                       className={`rounded-none ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                >
                       <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                       variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                       className={`rounded-none ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
                   </div>
                 </div>

                 <div className="text-sm text-slate-600 ml-4">
                   {packages.length} packages
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packages Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="relative">
          <img
            src={pkg.image}
            alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <Badge className={getStatusColor(pkg.status)}>
                      {getStatusLabel(pkg.status)}
                    </Badge>
                    {pkg.packageType === 'fixed-departure' && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        Fixed Departure
                      </Badge>
                    )}
          {pkg.featured && (
                      <Badge className="bg-amber-100 text-amber-800">
              Featured
            </Badge>
          )}
        </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">{pkg.title}</h3>
                    <p className="text-slate-600 text-sm flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {pkg.destination}
                    </p>
          </div>

          <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{pkg.rating}</span>
            </div>
                    <div className="flex items-center space-x-1 text-sm text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>{pkg.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
                      <p className="text-lg font-bold text-slate-900">${pkg.price}</p>
                      {pkg.originalPrice > pkg.price && (
                        <p className="text-sm text-slate-500 line-through">${pkg.originalPrice}</p>
              )}
            </div>
                    <Badge variant="outline" className="text-xs">
                      {pkg.bookings} bookings
                    </Badge>
          </div>

          <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
            </Button>
        </div>
      </CardContent>
    </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={pkg.image}
            alt={pkg.title}
                      className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">{pkg.title}</h3>
                          <p className="text-slate-600 text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {pkg.destination}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(pkg.status)}>
                            {getStatusLabel(pkg.status)}
              </Badge>
                          {pkg.packageType === 'fixed-departure' && (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                              Fixed Departure
                            </Badge>
                          )}
                          {pkg.featured && (
                            <Badge className="bg-amber-100 text-amber-800">
                              Featured
                            </Badge>
                          )}
            </div>
            </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Category:</span>
                          <p className="font-medium">{pkg.category}</p>
            </div>
                        <div>
                          <span className="text-slate-500">Duration:</span>
                          <p className="font-medium">{pkg.duration}</p>
          </div>
                        <div>
                          <span className="text-slate-500">Rating:</span>
                          <p className="font-medium flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {pkg.rating}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Bookings:</span>
                          <p className="font-medium">{pkg.bookings}</p>
                        </div>
                      </div>
                      
                      {/* Fixed Departure Package Details */}
                      {pkg.packageType === 'fixed-departure' && (
                        <div className="grid grid-cols-2 gap-4 text-sm mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div>
                            <span className="text-slate-500">Group Size:</span>
                            <p className="font-medium text-purple-700">{pkg.groupSize}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Check Dates:</span>
                            <p className="font-medium text-purple-700">{pkg.checkDates}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-xl font-bold text-slate-900">${pkg.price}</p>
                            {pkg.originalPrice > pkg.price && (
                              <p className="text-sm text-slate-500 line-through">${pkg.originalPrice}</p>
                            )}
                          </div>
                      </div>
                      <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
            </Button>
                        </div>
                      </div>
          </div>
        </div>
      </CardContent>
    </Card>
              ))}
            </div>
        )}

        {/* Add New Package Form Dialog */}
        <Dialog open={showAddPackageForm} onOpenChange={setShowAddPackageForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900">
                Add New Travel Package
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Basic Information</h3>
                
                {/* Package Type Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Package Type *</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="packageType"
                        value="normal"
                        checked={newPackage.packageType === 'normal'}
                        onChange={(e) => handleInputChange('packageType', e.target.value)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Normal Package</span>
                      <span className="text-xs text-slate-500">(Private bookings, flexible dates)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="packageType"
                        value="fixed-departure"
                        checked={newPackage.packageType === 'fixed-departure'}
                        onChange={(e) => handleInputChange('packageType', e.target.value)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Fixed Departure Package</span>
                      <span className="text-xs text-slate-500">(Group tours, fixed dates)</span>
                    </label>
          </div>
                  
                  {/* Package Type Info Box */}
                  <div className={`mt-3 p-3 rounded-lg border ${
                    newPackage.packageType === 'normal' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-purple-50 border-purple-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {newPackage.packageType === 'normal' ? (
                        <>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-blue-800">Normal Package Selected</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm font-medium text-purple-800">Fixed Departure Package Selected</span>
                        </>
                      )}
        </div>
                    <p className={`text-xs mt-1 ${
                      newPackage.packageType === 'normal' 
                        ? 'text-blue-600' 
                        : 'text-purple-600'
                    }`}>
                      {newPackage.packageType === 'normal' 
                        ? 'Group Size and Check Dates fields are disabled as they are not applicable for private bookings.'
                        : 'Group Size and Check Dates are required for group tours with fixed departure dates.'
                      }
                    </p>
      </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Package Title *</label>
                    <Input
                      value={newPackage.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Bali Paradise Escape"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Destination *</label>
                    <Select value={newPackage.destination} onValueChange={(value) => handleInputChange('destination', value)} disabled={destinationsLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder={destinationsLoading ? "Loading destinations..." : "Select Destination"} />
                      </SelectTrigger>
                      <SelectContent>
                        {destinationsLoading ? (
                          <SelectItem value="loading" disabled>Loading destinations...</SelectItem>
                        ) : availableDestinations.length > 0 ? (
                          availableDestinations.map((dest) => (
                            <SelectItem key={dest.id} value={dest.name}>
                              {dest.name}, {dest.country}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>No destinations available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {destinationsLoading && (
                      <p className="text-xs text-slate-500 mt-1">Loading destinations from database...</p>
                    )}
                    {!destinationsLoading && availableDestinations.length === 0 && (
                      <p className="text-xs text-slate-500 mt-1">
                        No destinations available. Please add destinations in the Admin Panel first.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Duration *</label>
                    <Input
                      value={newPackage.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="e.g., 7 Days, 6 Nights"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                    <Select value={newPackage.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                                         <label className={`block text-sm font-medium mb-2 ${newPackage.packageType === 'normal' ? 'text-slate-400' : 'text-slate-700'}`}>
                       Group Size {newPackage.packageType === 'fixed-departure' && '*'}
                       {newPackage.packageType === 'normal' && (
                         <span className="ml-2 text-xs text-slate-400">(Disabled)</span>
                       )}
                     </label>
                                         <Select 
                       value={newPackage.groupSize} 
                       onValueChange={(value) => handleInputChange('groupSize', value)}
                       disabled={newPackage.packageType === 'normal'}
                     >
                       <SelectTrigger className={newPackage.packageType === 'normal' ? 'bg-slate-100 text-slate-400 border-slate-200' : ''}>
                         <SelectValue />
                       </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 People</SelectItem>
                        <SelectItem value="2-6">2-6 People</SelectItem>
                        <SelectItem value="2-12">2-12 People</SelectItem>
                        <SelectItem value="6-15">6-15 People</SelectItem>
                        <SelectItem value="15+">15+ People</SelectItem>
                      </SelectContent>
                    </Select>
                    {newPackage.packageType === 'normal' && (
                      <p className="text-xs text-slate-400 mt-1">Not applicable for normal packages</p>
                    )}
                  </div>
                  <div>
                                         <label className={`block text-sm font-medium mb-2 ${newPackage.packageType === 'normal' ? 'text-slate-400' : 'text-slate-700'}`}>
                       Check Dates {newPackage.packageType === 'fixed-departure' && '*'}
                       {newPackage.packageType === 'normal' && (
                         <span className="ml-2 text-xs text-slate-400">(Disabled)</span>
                       )}
                     </label>
                    <Input
                      value={newPackage.checkDates}
                      onChange={(e) => handleInputChange('checkDates', e.target.value)}
                      placeholder={newPackage.packageType === 'normal' ? 'Not applicable for normal packages' : 'e.g., 15 Mar 2024, 22 Mar 2024, 29 Mar 2024'}
                      required={newPackage.packageType === 'fixed-departure'}
                      disabled={newPackage.packageType === 'normal'}
                      className={newPackage.packageType === 'normal' ? 'bg-slate-100 text-slate-400' : ''}
                    />
                    <p className={`text-xs mt-1 ${newPackage.packageType === 'normal' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {newPackage.packageType === 'normal' 
                        ? 'Not applicable for normal packages' 
                        : 'Enter available departure dates separated by commas'
                      }
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <Select value={newPackage.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pricing & Savings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Pricing & Savings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Price *</label>
                    <Input
                      type="number"
                      value={newPackage.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="1299.99"
                      required
                    />
            </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Original Price (Optional)</label>
                    <Input
                      type="number"
                      value={newPackage.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                      placeholder="1599.99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Savings Amount (Optional)</label>
                    <Input
                      value={newPackage.savings}
                      onChange={(e) => handleInputChange('savings', e.target.value)}
                      placeholder="e.g., Save $300"
                    />
                    <p className="text-xs text-slate-500 mt-1">Display savings badge on package</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price Display *</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceDisplay"
                          value="per-person"
                          checked={newPackage.priceDisplay === 'per-person'}
                          onChange={(e) => handleInputChange('priceDisplay', e.target.value)}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium text-slate-700">Per Person</span>
                        <span className="text-xs text-slate-500">(e.g., $1299 per person)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceDisplay"
                          value="per-couple"
                          checked={newPackage.priceDisplay === 'per-couple'}
                          onChange={(e) => handleInputChange('priceDisplay', e.target.value)}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium text-slate-700">Per Couple</span>
                        <span className="text-xs text-slate-500">(e.g., $1299 per couple)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Description</h3>
                <Textarea
                  value={newPackage.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your package in detail..."
                  rows={4}
                  className="w-full"
                />
              </div>

              {/* Itinerary */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Travel Itinerary</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('itinerary')}
                  >
              <Plus className="h-4 w-4 mr-2" />
                    Add Day
            </Button>
          </div>
                <div className="space-y-3">
                  {newPackage.itinerary.map((day, index) => (
                    <div key={index} className="space-y-2 p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-slate-700">Day {index + 1}</label>
                        {newPackage.itinerary.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('itinerary', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={day.title || ''}
                        onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                        placeholder="Day title (e.g., Arrival & Welcome Dinner)"
                        className="w-full"
                      />
                      <Textarea
                        value={day.description || ''}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        placeholder="Describe the day's activities..."
                        rows={3}
                        className="w-full"
                      />
                    </div>
                  ))}
                  {newPackage.itinerary.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4 border-2 border-dashed border-slate-300 rounded-lg">
                      No itinerary days added yet. Click "Add Day" to start building your travel itinerary.
                    </p>
                  )}
        </div>
      </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Main Image URL *</label>
                    <Input
                      value={newPackage.mainImage}
                      onChange={(e) => handleInputChange('mainImage', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gallery Images (Optional)</label>
                    <Input
                      value={newPackage.galleryImages}
                      onChange={(e) => handleInputChange('galleryImages', e.target.value)}
                      placeholder="https://images.unsplash.com/... (separate with commas)"
                    />
                    <p className="text-xs text-slate-500 mt-1">Add multiple URLs separated by commas</p>
                </div>
              </div>
              </div>

              {/* Highlights */}
              <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Package Highlights</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('highlights')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Highlight
                  </Button>
                </div>
                <div className="space-y-3">
                  {newPackage.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={highlight}
                        onChange={(e) => handleArrayInputChange('highlights', index, e.target.value)}
                        placeholder={`Highlight ${index + 1}`}
                        className="flex-1"
                      />
                      {newPackage.highlights.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('highlights', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                </div>
                  ))}
              </div>
              </div>

              {/* What's Included & What to Expect */}
              <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">What's Included & What to Expect</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('included')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Included Item
                  </Button>
                </div>
                
                {/* What's Included */}
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-slate-800">Included Items</h4>
                  {newPackage.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayInputChange('included', index, e.target.value)}
                        placeholder={`Included item ${index + 1}`}
                        className="flex-1"
                      />
                      {newPackage.included.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('included', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                </div>
                  ))}
              </div>

                {/* What to Expect */}
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-slate-800">What to Expect</h4>
                  <Textarea
                    value={newPackage.whatToExpect}
                    onChange={(e) => handleInputChange('whatToExpect', e.target.value)}
                    placeholder="Describe what travelers can expect from this package experience..."
                    rows={4}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">This section helps travelers understand the overall experience and what they can look forward to.</p>
                </div>
              </div>

              {/* Reviews & Testimonials */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Reviews & Testimonials</h3>
              <Button 
                    type="button"
                variant="outline" 
                size="sm" 
                    onClick={() => addArrayItem('reviews')}
              >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Review
              </Button>
                </div>
                <div className="space-y-3">
                  {newPackage.reviews.map((review, index) => (
                    <div key={index} className="space-y-4 p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-slate-700">Review {index + 1}</label>
                        {newPackage.reviews.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('reviews', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                </div>
                      
                      {/* Profile Picture Section */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-slate-700">Profile Picture</h4>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`profileType-${index}`}
                              value="default"
                              checked={review.profilePicture?.type === 'default'}
                              onChange={(e) => handleReviewProfileChange(index, 'type', e.target.value)}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-slate-700">Default Avatar</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`profileType-${index}`}
                              value="custom"
                              checked={review.profilePicture?.type === 'custom'}
                              onChange={(e) => handleReviewProfileChange(index, 'type', e.target.value)}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-slate-700">Custom Image</span>
                          </label>
                </div>
                        
                        {/* Default Gender Selection */}
                        {review.profilePicture?.type === 'default' && (
                          <div className="flex space-x-4 ml-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`profileGender-${index}`}
                                value="female"
                                checked={review.profilePicture?.gender === 'female'}
                                onChange={(e) => handleReviewProfileChange(index, 'gender', e.target.value)}
                                className="text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-slate-700">Female</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`profileGender-${index}`}
                                value="male"
                                checked={review.profilePicture?.gender === 'male'}
                                onChange={(e) => handleReviewProfileChange(index, 'gender', e.target.value)}
                                className="text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-slate-700">Male</span>
                            </label>
              </div>
                        )}
                        
                        {/* Custom Image URL */}
                        {review.profilePicture?.type === 'custom' && (
                          <div className="ml-6">
                            <Input
                              value={review.profilePicture?.url || ''}
                              onChange={(e) => handleReviewProfileChange(index, 'url', e.target.value)}
                              placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                              className="w-full"
                            />
                            <p className="text-xs text-slate-500 mt-1">Provide a direct link to the profile image</p>
                          </div>
                        )}
        </div>

                      {/* Review Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                          value={review.author || ''}
                          onChange={(e) => handleReviewChange(index, 'author', e.target.value)}
                          placeholder="Reviewer name (e.g., Jennifer Martinez)"
                          className="w-full"
                        />
                        <Input
                          value={review.location || ''}
                          onChange={(e) => handleReviewChange(index, 'location', e.target.value)}
                          placeholder="Location (e.g., Los Angeles, CA)"
                          className="w-full"
                  />
                </div>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-700">Rating:</span>
                        <Select value={review.rating || '5'} onValueChange={(value) => handleReviewChange(index, 'rating', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      
                      {/* Review Comment */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Review Comment</label>
                        <Textarea
                          value={review.comment || ''}
                          onChange={(e) => handleReviewChange(index, 'comment', e.target.value)}
                          placeholder='Write your review comment here... (e.g., The Bali Paradise Escape exceeded all my expectations!)'
                          rows={4}
                          className="w-full"
                        />
                        <p className="text-xs text-slate-500">Quotes will be automatically added around your text</p>
                      </div>
                    </div>
                  ))}
                  {newPackage.reviews.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4 border-2 border-dashed border-slate-300 rounded-lg">
                      No reviews added yet. Click "Add Review" to add customer testimonials.
                    </p>
                  )}
              </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setShowAddPackageForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Reset Form
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Package
                </Button>
              </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* Category Management Panel */}
      <Dialog open={showCategoryPanel} onOpenChange={setShowCategoryPanel}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Category Management
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Categories</p>
                      <p className="text-2xl font-bold text-slate-900">{existingCategories.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Tag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
            </div>

            {/* Add/Edit Category Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Category Name</label>
                      <Input
                        value={newCategory.name}
                        onChange={(e) => handleCategoryInputChange('name', e.target.value)}
                        placeholder="Enter category name (e.g., Beach & Relaxation)"
                        className="w-full"
                        required
                      />
          </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Category Color</label>
                      <Select value={newCategory.color} onValueChange={(value) => handleCategoryInputChange('color', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              <div className="flex items-center space-x-2">
                                <span className={`w-3.5 h-3.5 rounded-full border border-slate-300 ${opt.bg}`}></span>
                                <span>{opt.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const opt = colorOptions.find(c => c.value === newCategory.color) || colorOptions[0];
                        return <span className={`w-5 h-5 rounded-full border border-slate-300 ${opt.bg}`}></span>;
                      })()}
                      <span className="text-sm text-slate-700">
                        {(colorOptions.find(c => c.value === newCategory.color) || colorOptions[0]).label}
                      </span>
                    </div>
                    {(() => {
                      const opt = colorOptions.find(c => c.value === newCategory.color) || colorOptions[0];
                      return (
                        <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold ${opt.bg} text-white border border-transparent`}>
                          {newCategory.name || 'Category Name'}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="flex space-x-3">
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      {editingCategory ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Update Category
                        </>
                      ) : (
                        <>
                <Plus className="h-4 w-4 mr-2" />
                          Add Category
                        </>
                      )}
              </Button>
                    {editingCategory && (
                      <Button type="button" variant="outline" onClick={() => setEditingCategory(null)}>
                        Cancel Edit
                      </Button>
                    )}
                    <Button type="button" variant="outline" onClick={resetCategoryForm}>
                      Reset Form
                    </Button>
      </div>
                </form>
              </CardContent>
            </Card>

            {/* Existing Categories */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Existing Categories</CardTitle>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Search categories..." 
                        value={categorySearch} 
                        onChange={(e) => setCategorySearch(e.target.value)} 
                        className="pl-10 w-64" 
                      />
                    </div>
                    <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Filter assignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="assigned">Assigned Only</SelectItem>
                        <SelectItem value="unassigned">Unassigned Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredCategories.length === 0 ? (
              <div className="text-center py-8">
                    <Tag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No categories found</p>
              </div>
            ) : (
                  <div className="space-y-3">
                    {filteredCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                          <div className={`bg-${category.color}-100 p-2 rounded-full`}>
                            {category.icon === 'Tag' ? (
                              <Tag className={`h-5 w-5 text-${category.color}-600`} />
                            ) : (
                              <Hash className={`h-5 w-5 text-${category.color}-600`} />
                            )}
                      </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{category.name}</h3>
                            <p className="text-sm text-slate-600">{category.description}</p>
                            <p className="text-xs text-slate-500">{category.packagesCount} packages</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditCategory(category)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteCategory(category)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                        </Button>
                      </div>
                    </div>
                    ))}
                  </div>
                )}
                  </CardContent>
                </Card>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default PackageManagementPage;
