const API_BASE_URL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000') + '/api';

// Generic API helper
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Homepage API
export const homepageAPI = {
  // Get homepage data
  getHomepage: () => apiCall('/homepage'),
  
  // Admin: Get homepage data
  getAdminHomepage: () => apiCall('/admin/homepage'),
  
  // Admin: Update homepage data
  updateHomepage: (data) => apiCall('/admin/homepage', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Packages API
export const packagesAPI = {
  // Get all packages
  getPackages: () => apiCall('/packages'),
  
  // Admin: Get all packages
  getAdminPackages: () => apiCall('/admin/packages'),
  
  // Admin: Create new package
  createPackage: (packageData) => apiCall('/admin/packages', {
    method: 'POST',
    body: JSON.stringify(packageData),
  }),
  
  // Admin: Update package
  updatePackage: (packageId, packageData) => apiCall(`/admin/packages/${packageId}`, {
    method: 'PUT',
    body: JSON.stringify(packageData),
  }),
  
  // Admin: Delete package
  deletePackage: (packageId) => apiCall(`/admin/packages/${packageId}`, {
    method: 'DELETE',
  }),
};

// Blog API
export const blogAPI = {
  // Get all blog posts
  getBlogPosts: () => apiCall('/blog'),
  
  // Admin: Get all blog posts
  getAdminBlogPosts: () => apiCall('/admin/blog'),
  
  // Admin: Create new blog post
  createBlogPost: (postData) => apiCall('/admin/blog', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
  
  // Admin: Update blog post
  updateBlogPost: (postId, postData) => apiCall(`/admin/blog/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  }),
  
  // Admin: Delete blog post
  deleteBlogPost: (postId) => apiCall(`/admin/blog/${postId}`, {
    method: 'DELETE',
  }),
};

// Health check
export const healthCheck = () => apiCall('/health');

// Export all APIs
export default {
  homepage: homepageAPI,
  packages: packagesAPI,
  blog: blogAPI,
  health: healthCheck,
}; 