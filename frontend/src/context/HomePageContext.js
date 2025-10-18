import React, { createContext, useContext, useState, useEffect } from 'react';
import { homepageAPI } from '../services/api';

const HomePageContext = createContext();

export const useHomePage = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error('useHomePage must be used within a HomePageProvider');
  }
  return context;
};

export const HomePageProvider = ({ children }) => {
  const [homePageData, setHomePageData] = useState({
    hero: {
      title: 'Discover Your Next Adventure',
      subtitle: 'Embark on extraordinary journeys to breathtaking destinations around the world. Create memories that last a lifetime with our expertly crafted travel experiences.',
      backgroundImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
      ctaText: 'Explore Packages',
      ctaLink: '/packages',
      watchVideoText: 'Watch Video',
      watchVideoLink: '#',
      stats: [
        {label: 'Happy Travelers', value: '50,000+', icon: 'Users'},
        {label: 'Destinations', value: '100+', icon: 'Globe'},
        {label: 'Years Experience', value: '10+', icon: 'Award'},
        {label: 'Success Rate', value: '99.9%', icon: 'Shield'}
      ]
    },
    featuredPackages: {
      title: 'Popular Destinations',
      description: 'Discover our most sought-after travel experiences, carefully curated for unforgettable adventures',
      packageIds: [1, 2, 3, 4]
    },
    latestBlogs: {
      title: 'Latest Travel Stories',
      description: 'Discover inspiring travel stories, expert tips, and hidden gems from around the world',
      postsToShow: 3
    },
    whyChooseUs: {
      title: 'Your Trusted Travel Partner',
      description: 'With years of experience and thousands of satisfied customers, we make your travel dreams come true',
      features: [
        { title: '100% Safe & Secure', description: 'Your safety is our priority. We ensure all destinations meet the highest safety standards with 24/7 support.' },
        { title: 'Award Winning Service', description: 'Recognized globally for excellence in travel services and customer satisfaction ratings.' },
        { title: 'Global Network', description: 'Access to exclusive destinations and local experiences through our worldwide partner network.' }
      ]
    },
    testimonials: {
      title: 'What Our Travelers Say',
      description: 'Real experiences from real travelers who have explored the world with us',
      testimonials: [
        { name: 'Sarah Johnson', role: 'Adventure Traveler', content: 'Amazing experience! The team made everything perfect.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80' },
        { name: 'Mike Chen', role: 'Business Traveler', content: 'Professional service and unforgettable memories.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
        { name: 'Emma Davis', role: 'Family Traveler', content: 'Perfect for family trips. Kids loved every moment!', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' }
      ]
    },
    cta: {
      title: 'Ready for Your Next Adventure?',
      description: 'Join thousands of travelers who have discovered the world with us. Your perfect journey starts here.',
      primaryButton: 'Browse Packages',
      secondaryButton: 'Contact Us'
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from backend on component mount
  useEffect(() => {
    loadHomepageData();
  }, []);

  const loadHomepageData = async () => {
    try {
      setLoading(true);
      const data = await homepageAPI.getHomepage();
      if (data) {
        setHomePageData(data);
      }
    } catch (err) {
      console.error('Failed to load homepage data:', err);
      setError('Failed to load homepage data. Using default data.');
      // Keep using default data if API fails
    } finally {
      setLoading(false);
    }
  };

  const updateHomePageData = async (section, data) => {
    try {
      // Update local state immediately for responsive UI
      const newData = {
        ...homePageData,
        [section]: { ...homePageData[section], ...data }
      };
      
      setHomePageData(newData);

      // Save to backend
      await homepageAPI.updateHomepage(newData);
    } catch (err) {
      console.error(`Failed to update ${section}:`, err);
      // Revert local state if backend update fails
      setHomePageData(homePageData);
      throw new Error(`Failed to update ${section}. Please try again.`);
    }
  };

  const updateFeature = async (index, data) => {
    try {
      const newFeatures = homePageData.whyChooseUs.features.map((feature, i) => 
        i === index ? { ...feature, ...data } : feature
      );
      
      const newData = {
        ...homePageData,
        whyChooseUs: {
          ...homePageData.whyChooseUs,
          features: newFeatures
        }
      };
      
      setHomePageData(newData);
      await homepageAPI.updateHomepage(newData);
      

    } catch (err) {
      console.error('Failed to update feature:', err);
      throw new Error('Failed to update feature. Please try again.');
    }
  };

  const refreshData = () => {
    loadHomepageData();
  };

  const value = {
    homePageData,
    updateHomePageData,
    updateFeature,
    loading,
    error,
    refreshData
  };

  return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  );
}; 