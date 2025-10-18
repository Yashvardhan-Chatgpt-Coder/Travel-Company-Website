import React, { createContext, useContext, useState, useEffect } from 'react';

const DestinationsContext = createContext();

export const useDestinations = () => {
  const context = useContext(DestinationsContext);
  if (!context) {
    throw new Error('useDestinations must be used within a DestinationsProvider');
  }
  return context;
};

export const DestinationsProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Fetch all destinations
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/destinations`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      const data = await response.json();
      setDestinations(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new destination
  const addDestination = async (destination) => {
    try {
      const requestBody = {
        name: destination.name,
        country: destination.country
      };
      
      const response = await fetch(`${API_BASE_URL}/api/destinations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add destination: ${response.status} ${errorText}`);
      }

      const newDestination = await response.json();
      
      setDestinations(prev => [...prev, newDestination]);
      
      return newDestination;
    } catch (err) {
      console.error('Error adding destination:', err);
      throw err;
    }
  };

  // Update a destination
  const updateDestination = async (updatedDestination) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/destinations/${updatedDestination.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedDestination.name,
          country: updatedDestination.country
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update destination');
      }

      const updatedDest = await response.json();
      setDestinations(prev => prev.map(dest => 
        dest.id === updatedDestination.id ? updatedDest : dest
      ));
      return updatedDest;
    } catch (err) {
      console.error('Error updating destination:', err);
      throw err;
    }
  };

  // Delete a destination
  const deleteDestination = async (destinationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/destinations/${destinationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete destination');
      }

      setDestinations(prev => prev.filter(dest => dest.id !== destinationId));
    } catch (err) {
      console.error('Error deleting destination:', err);
      throw err;
    }
  };

  // Get destinations list with type classification
  const getDestinationsList = () => {
    return destinations.map(dest => ({
      ...dest,
      type: dest.country === 'India' ? 'national' : 'international'
    }));
  };

  // Get national destinations
  const getNationalDestinations = () => {
    return destinations.filter(dest => dest.country === 'India');
  };

  // Get international destinations
  const getInternationalDestinations = () => {
    return destinations.filter(dest => dest.country !== 'India');
  };

  // Get destination by ID
  const getDestinationById = (id) => {
    return destinations.find(dest => dest.id === id);
  };

  // Get destination by name
  const getDestinationByName = (name) => {
    return destinations.find(dest => dest.name.toLowerCase() === name.toLowerCase());
  };

  // Load destinations on mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  const value = {
    destinations,
    loading,
    error,
    addDestination,
    updateDestination,
    deleteDestination,
    getDestinationsList,
    getNationalDestinations,
    getInternationalDestinations,
    getDestinationById,
    getDestinationByName,
    fetchDestinations // Expose for manual refresh
  };

  return (
    <DestinationsContext.Provider value={value}>
      {children}
    </DestinationsContext.Provider>
  );
};
