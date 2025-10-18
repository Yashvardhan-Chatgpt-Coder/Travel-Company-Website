import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHomePage } from '../context/HomePageContext';
import { useDestinations } from '../context/DestinationsContext';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ui/toast-container';
import { 
  ArrowLeft, 
  ArrowRight,
  Settings, 
  Edit, 
  Save, 
  Eye, 
  Users, 
  Globe, 
  Award, 
  Shield,
  Image,
  FileText,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Plus,
  Trash2,
  Search,
  Filter,
  X,
  Star,
  Flag,
  MoreVertical
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export const AdminPanel = () => {
  const { homePageData, updateHomePageData, updateFeature } = useHomePage();
  const { destinations, loading: destinationsLoading, addDestination, updateDestination, deleteDestination, getDestinationsList } = useDestinations();
  const { toasts, success, error, removeToast } = useToast();
  const [selectedPage, setSelectedPage] = useState('homepage');
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState(homePageData);
  const [packages, setPackages] = useState([]);
  const [showEnhancedSuccess, setShowEnhancedSuccess] = useState(false);
  const [enhancedSuccessSection, setEnhancedSuccessSection] = useState('');
  const [showDestinationsPanel, setShowDestinationsPanel] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: '',
    country: ''
  });

  const stats = [
    { label: 'Total Bookings', value: '1,234', change: '+12%', color: 'emerald', icon: Calendar },
    { label: 'Total Packages', value: packages.length.toString(), change: '+3', color: 'blue', icon: Globe },
    { label: 'Revenue', value: '$45,678', change: '+8%', color: 'purple', icon: BarChart3 },
    { label: 'Satisfaction', value: '98.5%', change: '+2%', color: 'amber', icon: Award }
  ];

  const recentBookings = [
    { id: 1, customer: 'Sarah Johnson', package: 'Bali Adventure', date: '2024-01-15', status: 'confirmed', amount: '$1,299' },
    { id: 2, customer: 'Mike Chen', package: 'Paris Explorer', date: '2024-01-14', status: 'pending', amount: '$2,199' },
    { id: 3, customer: 'Emma Davis', package: 'Tokyo Discovery', date: '2024-01-13', status: 'confirmed', amount: '$1,899' }
  ];

  const [editingDestination, setEditingDestination] = useState(null);
  const [destinationFilter, setDestinationFilter] = useState('all'); // 'all', 'national', 'international'
  const [destinationSearch, setDestinationSearch] = useState('');
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({ open: false, destination: null });
  const [cannotDeleteDialog, setCannotDeleteDialog] = useState({ open: false, destination: null });

  const pages = [
    { id: 'homepage', label: 'Homepage', icon: BarChart3, description: 'Manage homepage content and sections' },
    { id: 'packages', label: 'Packages Page', icon: Globe, description: 'Manage travel packages and pricing' },
    { id: 'blog', label: 'Blog Management', icon: FileText, description: 'Create and manage blog posts' },
    { id: 'about', label: 'About Page', icon: Users, description: 'Edit company information and team' },
    { id: 'contact', label: 'Contact Page', icon: Mail, description: 'Manage contact forms and information' },
    { id: 'users', label: 'User Management', icon: Users, description: 'Manage user accounts and permissions' },
    { id: 'settings', label: 'Site Settings', icon: Settings, description: 'General website settings and configuration' }
  ];



  const homepageTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'hero', label: 'Hero Section', icon: Image },
    { id: 'featured-packages', label: 'Popular Destinations', icon: Globe },
    { id: 'latest-blogs', label: 'Latest Travel Stories', icon: FileText },
    { id: 'why-choose-us', label: 'Your Trusted Travel Partner', icon: Award },
    { id: 'testimonials', label: 'What Our Travelers Say', icon: Users },
    { id: 'cta-section', label: 'Ready for Your Next Adventure?', icon: ArrowRight }
  ];

  const packagesTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'all-packages', label: 'All Packages', icon: Globe },
    { id: 'categories', label: 'Categories', icon: Filter },
    { id: 'pricing', label: 'Pricing', icon: BarChart3 },
    { id: 'images', label: 'Images', icon: Image }
  ];

  const blogTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'all-posts', label: 'All Posts', icon: FileText },
    { id: 'categories', label: 'Categories', icon: Filter },
    { id: 'authors', label: 'Authors', icon: Users },
    { id: 'comments', label: 'Comments', icon: Mail }
  ];

  const getCurrentTabs = () => {
    switch (selectedPage) {
      case 'homepage':
        return homepageTabs;
      case 'packages':
        return packagesTabs;
      case 'blog':
        return blogTabs;
      default:
        return homepageTabs;
    }
  };

  // Reset active tab when page changes
  useEffect(() => {
    setActiveTab('overview');
    setEditMode({});
  }, [selectedPage]);

  // Update form data when context data changes
  useEffect(() => {
    setFormData(homePageData);
  }, [homePageData]);

  // Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/packages');
        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const tabs = getCurrentTabs();

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleEditMode = (section) => {
    setEditMode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        features: prev[section].features.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const [savingStates, setSavingStates] = useState({});

  const saveChanges = async (section) => {
    try {
      setSavingStates(prev => ({ ...prev, [section]: true }));

      console.log(`🔄 Saving changes for ${section}:`, formData[section]);

      // Update the context with the new data
      if (section === 'whyChooseUs') {
        // Handle features separately
        await updateHomePageData(section, {
          title: formData[section].title,
          description: formData[section].description,
          features: formData[section].features
        });
      } else {
        await updateHomePageData(section, formData[section]);
      }
      
      console.log(`✅ ${section} updated successfully in context`);
      toggleEditMode(section);
      
      // Show enhanced success message
      showEnhancedSuccessMessage(section);
      
    } catch (err) {
      console.error('Failed to save changes:', err);
      error(`Failed to update ${section}: ${err.message}`);
    } finally {
      setSavingStates(prev => ({ ...prev, [section]: false }));
    }
  };

  const showEnhancedSuccessMessage = (section) => {
    // Show the regular toast
    success(`${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully! 🎉`);
    
    // Show enhanced success message
    setShowEnhancedSuccess(true);
    setEnhancedSuccessSection(section);
    
    // Hide after 3 seconds
    setTimeout(() => {
      setShowEnhancedSuccess(false);
    }, 3000);
  };

  const cancelEdit = (section) => {
    toggleEditMode(section);
    // Reset form data to original values if needed
  };

  // Destination management functions
  const handleDestinationInputChange = (field, value) => {
    if (editingDestination) {
      setEditingDestination(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setNewDestination(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    
    console.log('🚀 handleAddDestination called with:', newDestination);
    console.log('🚀 Form event:', e);
    console.log('🚀 Destinations state:', destinations);
    
    if (!newDestination.name.trim() || !newDestination.country) {
      console.log('❌ Validation failed:', { name: newDestination.name, country: newDestination.country });
      error('Please fill in all required fields');
      return;
    }

    // Check if destination already exists
    const exists = destinations.some(dest => 
      dest.name.toLowerCase() === newDestination.name.trim().toLowerCase() && 
      dest.country === newDestination.country
    );

    if (exists) {
      console.log('❌ Destination already exists');
      error('This destination already exists');
      return;
    }

    try {
      const newDest = {
        name: newDestination.name.trim(),
        country: newDestination.country
      };

      console.log('📝 Calling addDestination with:', newDest);
      const result = await addDestination(newDest);
      console.log('✅ addDestination result:', result);
      
      setNewDestination({ name: '', country: '' });
      success('Destination added successfully!');
    } catch (err) {
      console.error('❌ Error in handleAddDestination:', err);
      error('Failed to add destination. Please try again.');
    }
  };

  const handleEditDestination = (destination) => {
    setEditingDestination({ ...destination });
  };

  const handleUpdateDestination = async (e) => {
    e.preventDefault();
    
    if (!editingDestination.name.trim() || !editingDestination.country) {
      error('Please fill in all required fields');
      return;
    }

    // Check if destination already exists (excluding current one)
    const exists = destinations.some(dest => 
      dest.id !== editingDestination.id &&
      dest.name.toLowerCase() === editingDestination.name.toLowerCase() && 
      dest.country === editingDestination.country
    );

    if (exists) {
      error('This destination already exists');
      return;
    }

    try {
      await updateDestination(editingDestination);

      // Update packages that use this destination
      updatePackagesWithDestination(editingDestination);

      setEditingDestination(null);
      success('Destination updated successfully!');
    } catch (err) {
      error('Failed to update destination. Please try again.');
    }
  };

  const handleDeleteDestination = async (destinationId) => {
    const destination = destinations.find(d => d.id === destinationId);
    
    if (destination.packages > 0) {
      // Cannot delete - show explanation dialog
      setCannotDeleteDialog({ open: true, destination });
    } else {
      // Can delete - show confirmation dialog
      setDeleteConfirmDialog({ open: true, destination });
    }
  };

  const confirmDeleteDestination = async () => {
    try {
      await deleteDestination(deleteConfirmDialog.destination.id);
      success('Destination deleted successfully!');
      setDeleteConfirmDialog({ open: false, destination: null });
    } catch (err) {
      error('Failed to delete destination. Please try again.');
    }
  };

  const resetDestinationForm = () => {
    setNewDestination({ name: '', country: '' });
    setEditingDestination(null);
  };

  const updatePackagesWithDestination = (updatedDestination) => {
    // This function would update all packages that use this destination
    // For now, we'll just log it. In a real app, you'd update the packages state/backend
    console.log('Updating packages with destination:', updatedDestination);
    
    // Example: Update packages state if you have it
    // setPackages(prev => prev.map(pkg => 
    //   pkg.destination === updatedDestination.name 
    //     ? { ...pkg, destination: updatedDestination.name }
    //     : pkg
    // ));
  };

  // Filter destinations based on type and search
  const filteredDestinations = destinations.filter(dest => {
    // Filter by type
    const typeMatch = destinationFilter === 'all' || 
      (destinationFilter === 'national' && dest.country === 'India') ||
      (destinationFilter === 'international' && dest.country !== 'India');
    
    // Filter by search
    const searchMatch = !destinationSearch || 
      dest.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
      dest.country.toLowerCase().includes(destinationSearch.toLowerCase());
    
    return typeMatch && searchMatch;
  });





  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Enhanced Success Message */}
      {showEnhancedSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Floating Success Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-500 scale-100 animate-in slide-in-from-bottom-4">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6 animate-in zoom-in duration-500">
                <svg className="w-8 h-8 text-emerald-600 animate-in slide-in-from-top-2 duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7"
                    className="animate-in slide-in-from-left-2 duration-1000"
                  />
                </svg>
              </div>
              
              {/* Success Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 animate-in slide-in-from-bottom-2 duration-700">
                Changes Saved! 🎉
              </h3>
              
              {/* Success Message */}
              <p className="text-gray-600 mb-6 animate-in slide-in-from-bottom-2 duration-800">
                Your <span className="font-semibold text-emerald-600">{enhancedSuccessSection.charAt(0).toUpperCase() + enhancedSuccessSection.slice(1)}</span> section has been updated successfully and is now live on your website! ✨
              </p>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 animate-in slide-in-from-bottom-2 duration-900">
                <button
                  onClick={() => setShowEnhancedSuccess(false)}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  ✏️ Continue Editing
                </button>
                <button
                  onClick={() => {
                    setShowEnhancedSuccess(false);
                    // Navigate to homepage to see changes
                    window.open('/', '_blank');
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  👀 View Changes
                </button>
              </div>
              
              {/* Auto-close indicator */}
              <div className="mt-4 text-xs text-gray-400 animate-in slide-in-from-bottom-2 duration-1000">
                ⏰ This message will close automatically in a few seconds
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button 
                asChild
                variant="ghost" 
                className="text-slate-600 hover:text-slate-900"
              >
                <Link to="/">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Site
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
                <p className="text-sm text-slate-600">Manage your travel website content</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                className="text-slate-600 hover:text-slate-900"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Selection */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Page to Manage
            </label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    <div className="flex items-center">
                      <page.icon className="h-4 w-4 mr-2" />
                      {page.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                className="text-slate-600 hover:text-slate-900"
                onClick={() => window.location.href = '/package-management'}
              >
                <Globe className="h-4 w-4 mr-2" />
                Packages
              </Button>
              <Button 
                variant="outline"
                className="text-slate-600 hover:text-slate-900"
                onClick={() => setShowDestinationsPanel(true)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Destinations
              </Button>
              <Button 
                variant="outline"
                className="text-slate-600 hover:text-slate-900"
                onClick={() => window.location.href = '/blog-management'}
              >
                <FileText className="h-4 w-4 mr-2" />
                Blogs
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Navigation</CardTitle>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    {pages.find(p => p.id === selectedPage)?.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{booking.customer}</p>
                              <p className="text-sm text-slate-600">{booking.package}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-600">{booking.date}</p>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <p className="font-medium text-slate-900">{booking.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setSelectedPage('packages')}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Manage Packages
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Create Blog Post
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        View All Bookings
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <p className="text-sm text-slate-600">New booking received</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <p className="text-sm text-slate-600">Blog post published</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <p className="text-sm text-slate-600">Package updated</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Hero Section Tab */}
            {activeTab === 'hero' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Hero Section</CardTitle>
                      <p className="text-sm text-slate-600">Edit the main hero section content</p>
                    </div>
                    <Button 
                      onClick={() => toggleEditMode('hero')}
                      variant={editMode.hero ? "outline" : "default"}
                      className={editMode.hero ? "text-slate-600" : "bg-emerald-600 hover:bg-emerald-700"}
                    >
                      {editMode.hero ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Hero Title
                      </label>
                      <Input 
                        value={formData.hero.title}
                        onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                        disabled={!editMode.hero}
                        className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Hero Subtitle
                      </label>
                      <Textarea 
                        value={formData.hero.subtitle}
                        onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                        disabled={!editMode.hero}
                        className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Background Image URL
                      </label>
                      <Input 
                        value={formData.hero.backgroundImage}
                        onChange={(e) => handleInputChange('hero', 'backgroundImage', e.target.value)}
                        disabled={!editMode.hero}
                        className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CTA Button Text
                        </label>
                        <Input 
                          value={formData.hero.ctaText}
                          onChange={(e) => handleInputChange('hero', 'ctaText', e.target.value)}
                          disabled={!editMode.hero}
                          className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CTA Button Link
                        </label>
                        <Input 
                          value={formData.hero.ctaLink}
                          onChange={(e) => handleInputChange('hero', 'ctaLink', e.target.value)}
                          disabled={!editMode.hero}
                          className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Watch Video Button Text
                          <span className="ml-1 text-xs text-slate-500">(e.g., "Watch Video", "Play Trailer", "View Demo")</span>
                        </label>
                        <Input 
                          value={formData.hero.watchVideoText}
                          onChange={(e) => handleInputChange('hero', 'watchVideoText', e.target.value)}
                          disabled={!editMode.hero}
                          className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                          placeholder="e.g., Watch Video, Play Trailer, View Demo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Watch Video Button Link
                          <span className="ml-1 text-xs text-slate-500">(URL or internal link)</span>
                        </label>
                        <Input 
                          value={formData.hero.watchVideoLink}
                          onChange={(e) => handleInputChange('hero', 'watchVideoLink', e.target.value)}
                          disabled={!editMode.hero}
                          className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                          placeholder="e.g., #, /video, https://youtube.com/watch?v=..."
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Use "#" for no action, "/video" for internal pages, or full URLs for external links
                        </p>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Statistics Section</h4>
                      <p className="text-sm text-slate-600 mb-4">Customize the statistics displayed below your hero section</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.hero.stats.map((stat, index) => (
                          <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-slate-700">Stat #{index + 1}</h5>
                              <div className="flex space-x-2">
                                <select
                                  value={stat.icon}
                                  onChange={(e) => handleInputChange('hero', 'stats', formData.hero.stats.map((s, i) => 
                                    i === index ? { ...s, icon: e.target.value } : s
                                  ))}
                                  disabled={!editMode.hero}
                                  className="text-xs px-2 py-1 border border-slate-300 rounded bg-white"
                                >
                                  <option value="Users">👥 Users</option>
                                  <option value="Globe">🌍 Globe</option>
                                  <option value="Award">🏆 Award</option>
                                  <option value="Shield">🛡️ Shield</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                  Label
                                </label>
                                <Input 
                                  value={stat.label}
                                  onChange={(e) => handleInputChange('hero', 'stats', formData.hero.stats.map((s, i) => 
                                    i === index ? { ...s, label: e.target.value } : s
                                  ))}
                                  disabled={!editMode.hero}
                                  className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                                  placeholder="e.g., Happy Travelers"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                  Value
                                </label>
                                <Input 
                                  value={stat.value}
                                  onChange={(e) => handleInputChange('hero', 'stats', formData.hero.stats.map((s, i) => 
                                    i === index ? { ...s, value: e.target.value } : s
                                  ))}
                                  disabled={!editMode.hero}
                                  className={!editMode.hero ? "bg-slate-100 text-slate-500" : ""}
                                  placeholder="e.g., 50,000+"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {editMode.hero && (
                      <div className="space-y-3">
                        <div className="flex space-x-3">
                          <Button 
                            onClick={() => saveChanges('hero')}
                            disabled={savingStates.hero}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            {savingStates.hero ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </Button>
                          <Button 
                            onClick={() => cancelEdit('hero')}
                            variant="outline"
                            disabled={savingStates.hero}
                          >
                            Cancel
                          </Button>
                        </div>

                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Featured Packages Management Tab */}
            {activeTab === 'featured-packages' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Popular Destinations</CardTitle>
                      <p className="text-sm text-slate-600">Manage the packages displayed on the homepage</p>
                    </div>
                    <Button 
                      onClick={() => toggleEditMode('featuredPackages')}
                      variant={editMode.featuredPackages ? "outline" : "default"}
                      className={editMode.featuredPackages ? "text-slate-600" : "bg-emerald-600 hover:bg-emerald-700"}
                    >
                      {editMode.featuredPackages ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Title
                        </label>
                        <Input 
                          value={formData.featuredPackages.title}
                          onChange={(e) => handleInputChange('featuredPackages', 'title', e.target.value)}
                          disabled={!editMode.featuredPackages}
                          className={!editMode.featuredPackages ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Description
                        </label>
                        <Input 
                          value={formData.featuredPackages.description}
                          onChange={(e) => handleInputChange('featuredPackages', 'description', e.target.value)}
                          disabled={!editMode.featuredPackages}
                          className={!editMode.featuredPackages ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                    </div>

                    {/* Package Selection */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Select Featured Packages
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {packages.map((pkg) => (
                          <div key={pkg.id} className="border rounded-lg p-3">
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id={`pkg-${pkg.id}`}
                                checked={formData.featuredPackages.packageIds.includes(pkg.id)}
                                onChange={(e) => {
                                  const newPackageIds = e.target.checked
                                    ? [...formData.featuredPackages.packageIds, pkg.id]
                                    : formData.featuredPackages.packageIds.filter(id => id !== pkg.id);
                                  handleInputChange('featuredPackages', 'packageIds', newPackageIds);
                                }}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <label htmlFor={`pkg-${pkg.id}`} className="font-medium text-slate-900 cursor-pointer">
                                  {pkg.title}
                                </label>
                                <p className="text-xs text-slate-600 mt-1">{pkg.destination}</p>
                                <p className="text-xs text-slate-500 mt-1">{pkg.category}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Selected packages will appear on the homepage in the order shown above
                      </p>
                    </div>


                    {editMode.featuredPackages && (
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => saveChanges('featuredPackages')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => cancelEdit('featuredPackages')}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}





            {/* Latest Blogs Tab */}
            {activeTab === 'latest-blogs' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Latest Travel Stories</CardTitle>
                      <p className="text-sm text-slate-600">Manage the latest blogs section displayed on the homepage</p>
                    </div>
                    <Button 
                      onClick={() => toggleEditMode('latestBlogs')}
                      variant={editMode.latestBlogs ? "outline" : "default"}
                      className={editMode.latestBlogs ? "text-slate-600" : "bg-emerald-600 hover:bg-emerald-700"}
                    >
                      {editMode.latestBlogs ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Title
                        </label>
                        <Input 
                          value={formData.latestBlogs.title}
                          onChange={(e) => handleInputChange('latestBlogs', 'title', e.target.value)}
                          disabled={!editMode.latestBlogs}
                          className={!editMode.latestBlogs ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Description
                        </label>
                        <Input 
                          value={formData.latestBlogs.description}
                          onChange={(e) => handleInputChange('latestBlogs', 'description', e.target.value)}
                          disabled={!editMode.latestBlogs}
                          className={!editMode.latestBlogs ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Number of Posts to Display
                      </label>
                      <Select 
                        value={formData.latestBlogs.postsToShow.toString()}
                        onValueChange={(value) => handleInputChange('latestBlogs', 'postsToShow', parseInt(value))}
                        disabled={!editMode.latestBlogs}
                      >
                        <SelectTrigger className={`w-48 ${!editMode.latestBlogs ? "bg-slate-100 text-slate-500" : ""}`}>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 Posts</SelectItem>
                          <SelectItem value="3">3 Posts</SelectItem>
                          <SelectItem value="4">4 Posts</SelectItem>
                          <SelectItem value="6">6 Posts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {editMode.latestBlogs && (
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => saveChanges('latestBlogs')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => cancelEdit('latestBlogs')}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Why Choose Us Tab */}
            {activeTab === 'why-choose-us' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Trusted Travel Partner</CardTitle>
                      <p className="text-sm text-slate-600">Edit the "Why Choose Us" section content on the homepage</p>
                    </div>
                    <Button 
                      onClick={() => toggleEditMode('whyChooseUs')}
                      variant={editMode.whyChooseUs ? "outline" : "default"}
                      className={editMode.whyChooseUs ? "text-slate-600" : "bg-emerald-600 hover:bg-emerald-700"}
                    >
                      {editMode.whyChooseUs ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Title
                        </label>
                        <Input 
                          value={formData.whyChooseUs.title}
                          onChange={(e) => handleInputChange('whyChooseUs', 'title', e.target.value)}
                          disabled={!editMode.whyChooseUs}
                          className={!editMode.whyChooseUs ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Description
                        </label>
                        <Input 
                          value={formData.whyChooseUs.description}
                          onChange={(e) => handleInputChange('whyChooseUs', 'description', e.target.value)}
                          disabled={!editMode.whyChooseUs}
                          className={!editMode.whyChooseUs ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {formData.whyChooseUs.features.map((feature, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-slate-900">{feature.title}</h4>
                          </div>
                          <div className="space-y-3">
                            <Input 
                              value={feature.title}
                              onChange={(e) => handleArrayInputChange('whyChooseUs', index, 'title', e.target.value)}
                              disabled={!editMode.whyChooseUs}
                              className={!editMode.whyChooseUs ? "bg-slate-100 text-slate-500" : ""}
                              placeholder="Feature Title" 
                            />
                            <Textarea 
                              value={feature.description}
                              onChange={(e) => handleArrayInputChange('whyChooseUs', index, 'description', e.target.value)}
                              disabled={!editMode.whyChooseUs}
                              className={!editMode.whyChooseUs ? "bg-slate-100 text-slate-500" : ""}
                              rows={3}
                              placeholder="Feature Description"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {editMode.whyChooseUs && (
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => saveChanges('whyChooseUs')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => cancelEdit('whyChooseUs')}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>What Our Travelers Say</CardTitle>
                      <p className="text-sm text-slate-600">Manage customer testimonials displayed on the homepage</p>
                    </div>
                    <Button 
                      onClick={() => toggleEditMode('testimonials')}
                      variant={editMode.testimonials ? "outline" : "default"}
                      className={editMode.testimonials ? "text-slate-600" : "bg-emerald-600 hover:bg-emerald-700"}
                    >
                      {editMode.testimonials ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Title
                        </label>
                        <Input 
                          value={formData.testimonials.title}
                          onChange={(e) => handleInputChange('testimonials', 'title', e.target.value)}
                          disabled={!editMode.testimonials}
                          className={!editMode.testimonials ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Description
                        </label>
                        <Input 
                          value={formData.testimonials.description}
                          onChange={(e) => handleInputChange('testimonials', 'description', e.target.value)}
                          disabled={!editMode.testimonials}
                          className={!editMode.testimonials ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {formData.testimonials.testimonials.map((testimonial, index) => (
                        <div key={testimonial.id} className="p-4 border border-slate-200 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input 
                              value={testimonial.name}
                              onChange={(e) => handleArrayInputChange('testimonials', index, 'name', e.target.value)}
                              disabled={!editMode.testimonials}
                              className={!editMode.testimonials ? "bg-slate-100 text-slate-500" : ""}
                              placeholder="Customer Name"
                            />
                            <Input 
                              value={testimonial.location}
                              onChange={(e) => handleArrayInputChange('testimonials', index, 'location', e.target.value)}
                              disabled={!editMode.testimonials}
                              className={!editMode.testimonials ? "bg-slate-100 text-slate-500" : ""}
                              placeholder="Location"
                            />
                          </div>
                          <Textarea 
                            value={testimonial.text}
                            onChange={(e) => handleArrayInputChange('testimonials', index, 'text', e.target.value)}
                            disabled={!editMode.testimonials}
                            className={`mt-3 ${!editMode.testimonials ? "bg-slate-100 text-slate-500" : ""}`}
                            rows={3}
                            placeholder="Testimonial text"
                          />
                        </div>
                      ))}
                    </div>

                    {editMode.testimonials && (
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => saveChanges('testimonials')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => cancelEdit('testimonials')}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA Section Tab */}
            {activeTab === 'cta-section' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Ready for Your Next Adventure?</CardTitle>
                      <p className="text-sm text-slate-600">Edit the final CTA section on the homepage</p>
                    </div>
                    <Button 
                      onClick={() => toggleEditMode('cta')}
                      variant={editMode.cta ? "outline" : "default"}
                      className={editMode.cta ? "text-slate-600" : "bg-emerald-600 hover:bg-emerald-700"}
                    >
                      {editMode.cta ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Title
                        </label>
                        <Input 
                          value={formData.cta.title}
                          onChange={(e) => handleInputChange('cta', 'title', e.target.value)}
                          disabled={!editMode.cta}
                          className={!editMode.cta ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Section Description
                        </label>
                        <Input 
                          value={formData.cta.description}
                          onChange={(e) => handleInputChange('cta', 'description', e.target.value)}
                          disabled={!editMode.cta}
                          className={!editMode.cta ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Primary Button Text
                        </label>
                        <Input 
                          value={formData.cta.primaryButton}
                          onChange={(e) => handleInputChange('cta', 'primaryButton', e.target.value)}
                          disabled={!editMode.cta}
                          className={!editMode.cta ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Secondary Button Text
                        </label>
                        <Input 
                          value={formData.cta.secondaryButton}
                          onChange={(e) => handleInputChange('cta', 'secondaryButton', e.target.value)}
                          disabled={!editMode.cta}
                          className={!editMode.cta ? "bg-slate-100 text-slate-500" : ""}
                        />
                      </div>
                    </div>

                    {editMode.cta && (
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => saveChanges('cta')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => cancelEdit('cta')}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Packages Page */}
            {selectedPage === 'packages' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Travel Packages Management</CardTitle>
                        <p className="text-sm text-slate-600">Manage all your travel packages and pricing</p>
                      </div>
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => setSelectedPage('packages')}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Manage Packages
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-900">All Packages ({packages.length})</h4>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Sort
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {packages.map((pkg) => (
                          <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                              <img 
                                src={pkg.image} 
                                alt={pkg.title}
                                className="w-full h-32 object-cover"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-emerald-500 text-white text-xs">
                                  {pkg.category}
                                </Badge>
                              </div>
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-blue-500 text-white text-xs">
                                  ${pkg.price}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h5 className="font-semibold text-slate-900 mb-2">{pkg.title}</h5>
                              <p className="text-sm text-slate-600 mb-2">{pkg.destination}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">{pkg.duration}</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{pkg.rating}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2 mt-3">
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Destinations Management Panel */}
      <Dialog open={showDestinationsPanel} onOpenChange={setShowDestinationsPanel}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Destinations Management
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Destinations</p>
                      <p className="text-2xl font-bold text-slate-900">{destinations.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">National</p>
                      <p className="text-2xl font-bold text-slate-900">{destinations.filter(d => d.country === 'India').length}</p>
                    </div>
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Flag className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">International</p>
                      <p className="text-2xl font-bold text-slate-900">{destinations.filter(d => d.country !== 'India').length}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add/Edit Destination Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingDestination ? 'Edit Destination' : 'Add New Destination'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingDestination ? handleUpdateDestination : handleAddDestination} className="space-y-4">
                  {/* Debug info */}
                  <div className="text-xs text-gray-500 mb-2">
                    Debug: destinations count: {destinations.length}, editing: {editingDestination ? 'yes' : 'no'}
                  </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Destination Name *</label>
                        <Input
                          value={editingDestination ? editingDestination.name : newDestination.name}
                          onChange={(e) => {
                            console.log('📝 Name input changed:', e.target.value);
                            handleDestinationInputChange('name', e.target.value);
                          }}
                          placeholder="e.g., Bali"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Country *</label>
                        <Select value={editingDestination ? editingDestination.country : newDestination.country} onValueChange={(value) => {
                          console.log('🌍 Country selected:', value);
                          handleDestinationInputChange('country', value);
                        }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                          <SelectItem value="Albania">Albania</SelectItem>
                          <SelectItem value="Algeria">Algeria</SelectItem>
                          <SelectItem value="Andorra">Andorra</SelectItem>
                          <SelectItem value="Angola">Angola</SelectItem>
                          <SelectItem value="Antigua and Barbuda">Antigua and Barbuda</SelectItem>
                          <SelectItem value="Argentina">Argentina</SelectItem>
                          <SelectItem value="Armenia">Armenia</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Austria">Austria</SelectItem>
                          <SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
                          <SelectItem value="Bahamas">Bahamas</SelectItem>
                          <SelectItem value="Bahrain">Bahrain</SelectItem>
                          <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                          <SelectItem value="Barbados">Barbados</SelectItem>
                          <SelectItem value="Belarus">Belarus</SelectItem>
                          <SelectItem value="Belgium">Belgium</SelectItem>
                          <SelectItem value="Belize">Belize</SelectItem>
                          <SelectItem value="Benin">Benin</SelectItem>
                          <SelectItem value="Bhutan">Bhutan</SelectItem>
                          <SelectItem value="Bolivia">Bolivia</SelectItem>
                          <SelectItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</SelectItem>
                          <SelectItem value="Botswana">Botswana</SelectItem>
                          <SelectItem value="Brazil">Brazil</SelectItem>
                          <SelectItem value="Brunei">Brunei</SelectItem>
                          <SelectItem value="Bulgaria">Bulgaria</SelectItem>
                          <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                          <SelectItem value="Burundi">Burundi</SelectItem>
                          <SelectItem value="Cambodia">Cambodia</SelectItem>
                          <SelectItem value="Cameroon">Cameroon</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Cape Verde">Cape Verde</SelectItem>
                          <SelectItem value="Central African Republic">Central African Republic</SelectItem>
                          <SelectItem value="Chad">Chad</SelectItem>
                          <SelectItem value="Chile">Chile</SelectItem>
                          <SelectItem value="China">China</SelectItem>
                          <SelectItem value="Colombia">Colombia</SelectItem>
                          <SelectItem value="Comoros">Comoros</SelectItem>
                          <SelectItem value="Congo">Congo</SelectItem>
                          <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                          <SelectItem value="Croatia">Croatia</SelectItem>
                          <SelectItem value="Cuba">Cuba</SelectItem>
                          <SelectItem value="Cyprus">Cyprus</SelectItem>
                          <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                          <SelectItem value="Denmark">Denmark</SelectItem>
                          <SelectItem value="Djibouti">Djibouti</SelectItem>
                          <SelectItem value="Dominica">Dominica</SelectItem>
                          <SelectItem value="Dominican Republic">Dominican Republic</SelectItem>
                          <SelectItem value="East Timor">East Timor</SelectItem>
                          <SelectItem value="Ecuador">Ecuador</SelectItem>
                          <SelectItem value="Egypt">Egypt</SelectItem>
                          <SelectItem value="El Salvador">El Salvador</SelectItem>
                          <SelectItem value="Equatorial Guinea">Equatorial Guinea</SelectItem>
                          <SelectItem value="Eritrea">Eritrea</SelectItem>
                          <SelectItem value="Estonia">Estonia</SelectItem>
                          <SelectItem value="Eswatini">Eswatini</SelectItem>
                          <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                          <SelectItem value="Fiji">Fiji</SelectItem>
                          <SelectItem value="Finland">Finland</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Gabon">Gabon</SelectItem>
                          <SelectItem value="Gambia">Gambia</SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="Ghana">Ghana</SelectItem>
                          <SelectItem value="Greece">Greece</SelectItem>
                          <SelectItem value="Grenada">Grenada</SelectItem>
                          <SelectItem value="Guatemala">Guatemala</SelectItem>
                          <SelectItem value="Guinea">Guinea</SelectItem>
                          <SelectItem value="Guinea-Bissau">Guinea-Bissau</SelectItem>
                          <SelectItem value="Guyana">Guyana</SelectItem>
                          <SelectItem value="Haiti">Haiti</SelectItem>
                          <SelectItem value="Honduras">Honduras</SelectItem>
                          <SelectItem value="Hungary">Hungary</SelectItem>
                          <SelectItem value="Iceland">Iceland</SelectItem>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="Indonesia">Indonesia</SelectItem>
                          <SelectItem value="Iran">Iran</SelectItem>
                          <SelectItem value="Iraq">Iraq</SelectItem>
                          <SelectItem value="Ireland">Ireland</SelectItem>
                          <SelectItem value="Israel">Israel</SelectItem>
                          <SelectItem value="Italy">Italy</SelectItem>
                          <SelectItem value="Ivory Coast">Ivory Coast</SelectItem>
                          <SelectItem value="Jamaica">Jamaica</SelectItem>
                          <SelectItem value="Japan">Japan</SelectItem>
                          <SelectItem value="Jordan">Jordan</SelectItem>
                          <SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
                          <SelectItem value="Kenya">Kenya</SelectItem>
                          <SelectItem value="Kiribati">Kiribati</SelectItem>
                          <SelectItem value="Kuwait">Kuwait</SelectItem>
                          <SelectItem value="Kyrgyzstan">Kyrgyzstan</SelectItem>
                          <SelectItem value="Laos">Laos</SelectItem>
                          <SelectItem value="Latvia">Latvia</SelectItem>
                          <SelectItem value="Lebanon">Lebanon</SelectItem>
                          <SelectItem value="Lesotho">Lesotho</SelectItem>
                          <SelectItem value="Liberia">Liberia</SelectItem>
                          <SelectItem value="Libya">Libya</SelectItem>
                          <SelectItem value="Liechtenstein">Liechtenstein</SelectItem>
                          <SelectItem value="Lithuania">Lithuania</SelectItem>
                          <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                          <SelectItem value="Madagascar">Madagascar</SelectItem>
                          <SelectItem value="Malawi">Malawi</SelectItem>
                          <SelectItem value="Malaysia">Malaysia</SelectItem>
                          <SelectItem value="Maldives">Maldives</SelectItem>
                          <SelectItem value="Mali">Mali</SelectItem>
                          <SelectItem value="Malta">Malta</SelectItem>
                          <SelectItem value="Marshall Islands">Marshall Islands</SelectItem>
                          <SelectItem value="Mauritania">Mauritania</SelectItem>
                          <SelectItem value="Mauritius">Mauritius</SelectItem>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                          <SelectItem value="Micronesia">Micronesia</SelectItem>
                          <SelectItem value="Moldova">Moldova</SelectItem>
                          <SelectItem value="Monaco">Monaco</SelectItem>
                          <SelectItem value="Mongolia">Mongolia</SelectItem>
                          <SelectItem value="Montenegro">Montenegro</SelectItem>
                          <SelectItem value="Morocco">Morocco</SelectItem>
                          <SelectItem value="Mozambique">Mozambique</SelectItem>
                          <SelectItem value="Myanmar">Myanmar</SelectItem>
                          <SelectItem value="Namibia">Namibia</SelectItem>
                          <SelectItem value="Nauru">Nauru</SelectItem>
                          <SelectItem value="Nepal">Nepal</SelectItem>
                          <SelectItem value="Netherlands">Netherlands</SelectItem>
                          <SelectItem value="New Zealand">New Zealand</SelectItem>
                          <SelectItem value="Nicaragua">Nicaragua</SelectItem>
                          <SelectItem value="Niger">Niger</SelectItem>
                          <SelectItem value="Nigeria">Nigeria</SelectItem>
                          <SelectItem value="North Korea">North Korea</SelectItem>
                          <SelectItem value="North Macedonia">North Macedonia</SelectItem>
                          <SelectItem value="Norway">Norway</SelectItem>
                          <SelectItem value="Oman">Oman</SelectItem>
                          <SelectItem value="Pakistan">Pakistan</SelectItem>
                          <SelectItem value="Palau">Palau</SelectItem>
                          <SelectItem value="Panama">Panama</SelectItem>
                          <SelectItem value="Papua New Guinea">Papua New Guinea</SelectItem>
                          <SelectItem value="Paraguay">Paraguay</SelectItem>
                          <SelectItem value="Peru">Peru</SelectItem>
                          <SelectItem value="Philippines">Philippines</SelectItem>
                          <SelectItem value="Poland">Poland</SelectItem>
                          <SelectItem value="Portugal">Portugal</SelectItem>
                          <SelectItem value="Qatar">Qatar</SelectItem>
                          <SelectItem value="Romania">Romania</SelectItem>
                          <SelectItem value="Russia">Russia</SelectItem>
                          <SelectItem value="Rwanda">Rwanda</SelectItem>
                          <SelectItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</SelectItem>
                          <SelectItem value="Saint Lucia">Saint Lucia</SelectItem>
                          <SelectItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</SelectItem>
                          <SelectItem value="Samoa">Samoa</SelectItem>
                          <SelectItem value="San Marino">San Marino</SelectItem>
                          <SelectItem value="Sao Tome and Principe">Sao Tome and Principe</SelectItem>
                          <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                          <SelectItem value="Senegal">Senegal</SelectItem>
                          <SelectItem value="Serbia">Serbia</SelectItem>
                          <SelectItem value="Seychelles">Seychelles</SelectItem>
                          <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
                          <SelectItem value="Singapore">Singapore</SelectItem>
                          <SelectItem value="Slovakia">Slovakia</SelectItem>
                          <SelectItem value="Slovenia">Slovenia</SelectItem>
                          <SelectItem value="Solomon Islands">Solomon Islands</SelectItem>
                          <SelectItem value="Somalia">Somalia</SelectItem>
                          <SelectItem value="South Africa">South Africa</SelectItem>
                          <SelectItem value="South Korea">South Korea</SelectItem>
                          <SelectItem value="South Sudan">South Sudan</SelectItem>
                          <SelectItem value="Spain">Spain</SelectItem>
                          <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                          <SelectItem value="Sudan">Sudan</SelectItem>
                          <SelectItem value="Suriname">Suriname</SelectItem>
                          <SelectItem value="Sweden">Sweden</SelectItem>
                          <SelectItem value="Switzerland">Switzerland</SelectItem>
                          <SelectItem value="Syria">Syria</SelectItem>
                          <SelectItem value="Taiwan">Taiwan</SelectItem>
                          <SelectItem value="Tajikistan">Tajikistan</SelectItem>
                          <SelectItem value="Tanzania">Tanzania</SelectItem>
                          <SelectItem value="Thailand">Thailand</SelectItem>
                          <SelectItem value="Togo">Togo</SelectItem>
                          <SelectItem value="Tonga">Tonga</SelectItem>
                          <SelectItem value="Trinidad and Tobago">Trinidad and Tobago</SelectItem>
                          <SelectItem value="Tunisia">Tunisia</SelectItem>
                          <SelectItem value="Turkey">Turkey</SelectItem>
                          <SelectItem value="Turkmenistan">Turkmenistan</SelectItem>
                          <SelectItem value="Tuvalu">Tuvalu</SelectItem>
                          <SelectItem value="Uganda">Uganda</SelectItem>
                          <SelectItem value="Ukraine">Ukraine</SelectItem>
                          <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Uruguay">Uruguay</SelectItem>
                          <SelectItem value="Uzbekistan">Uzbekistan</SelectItem>
                          <SelectItem value="Vanuatu">Vanuatu</SelectItem>
                          <SelectItem value="Vatican City">Vatican City</SelectItem>
                          <SelectItem value="Venezuela">Venezuela</SelectItem>
                          <SelectItem value="Vietnam">Vietnam</SelectItem>
                          <SelectItem value="Yemen">Yemen</SelectItem>
                          <SelectItem value="Zambia">Zambia</SelectItem>
                          <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      type="submit" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => console.log('🔘 Submit button clicked!')}
                    >
                      {editingDestination ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Update Destination
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Destination
                        </>
                      )}
                    </Button>
                    {editingDestination && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setEditingDestination(null)}
                      >
                        Cancel Edit
                      </Button>
                    )}
                    <Button type="button" variant="outline" onClick={resetDestinationForm}>
                      Reset Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Existing Destinations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Existing Destinations</CardTitle>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search destinations..."
                        value={destinationSearch}
                        onChange={(e) => setDestinationSearch(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={destinationFilter} onValueChange={setDestinationFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Destinations</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {destinationsLoading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">Loading destinations...</p>
                  </div>
                ) : filteredDestinations.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No destinations found for the selected filter.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredDestinations.map((destination) => (
                      <div key={destination.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">{destination.name}</h3>
                            <p className="text-sm text-slate-600">{destination.country}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {destination.packages} packages
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              destination.country === 'India' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {destination.country === 'India' ? 'National' : 'International'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditDestination(destination)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteDestination(destination.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmDialog.open} onOpenChange={(open) => setDeleteConfirmDialog({ open, destination: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-slate-700 mb-4">
              Are you sure you want to delete <span className="font-semibold">{deleteConfirmDialog.destination?.name}</span>?
            </p>
            <p className="text-sm text-slate-500 mb-4">
              This destination is not used in any packages and can be safely deleted.
            </p>
            <p className="text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirmDialog({ open: false, destination: null })}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteDestination}
            >
              Delete Destination
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cannot Delete Explanation Dialog */}
      <Dialog open={cannotDeleteDialog.open} onOpenChange={(open) => setCannotDeleteDialog({ open, destination: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-amber-600">Cannot Delete Destination</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-slate-700 mb-4">
              <span className="font-semibold">{cannotDeleteDialog.destination?.name}</span> cannot be deleted because it is currently used in <span className="font-semibold text-amber-600">{cannotDeleteDialog.destination?.packages} package(s)</span>.
            </p>
            <p className="text-sm text-slate-500">
              To delete this destination, you must first remove it from all packages that reference it.
            </p>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => setCannotDeleteDialog({ open: false, destination: null })}
            >
              Understood
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default AdminPanel; 