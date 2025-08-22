# Travel Website API Contracts & Integration Guide

## Overview
This document outlines the API contracts and integration plan for the premium travel company website. The frontend currently uses mock data from `/app/frontend/src/data/mock.js` which needs to be replaced with real backend endpoints.

## Frontend Mock Data Structure

### Travel Packages (`travelPackages`)
```javascript
{
  id: number,
  title: string,
  destination: string,
  duration: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviews: number,
  image: string,
  gallery: string[],
  category: string,
  highlights: string[],
  included: string[],
  itinerary: [{
    day: number,
    title: string,
    activities: string[]
  }]
}
```

### Blog Posts (`blogPosts`)
```javascript
{
  id: number,
  title: string,
  excerpt: string,
  content: string,
  author: string,
  authorImage: string,
  publishDate: string,
  readTime: string,
  category: string,
  image: string,
  tags: string[]
}
```

### Testimonials (`testimonials`)
```javascript
{
  id: number,
  name: string,
  location: string,
  image: string,
  rating: number,
  text: string,
  packageId: number
}
```

## Required API Endpoints

### 1. Travel Packages API
- **GET** `/api/packages` - Get all packages with filtering/sorting
  - Query params: `category`, `minPrice`, `maxPrice`, `search`, `sortBy`
  - Response: Array of package objects

- **GET** `/api/packages/:id` - Get single package details
  - Response: Complete package object with itinerary

- **GET** `/api/packages/featured` - Get featured packages (for homepage)
  - Response: Array of 3-4 featured packages

### 2. Blog API
- **GET** `/api/blog/posts` - Get all blog posts with filtering
  - Query params: `category`, `search`, `sortBy`, `limit`, `offset`
  - Response: Array of blog post objects

- **GET** `/api/blog/posts/:id` - Get single blog post
  - Response: Complete blog post object

- **GET** `/api/blog/posts/featured` - Get featured post (for blog homepage)
  - Response: Single blog post object

### 3. Testimonials API
- **GET** `/api/testimonials` - Get all testimonials
  - Query params: `packageId` (optional)
  - Response: Array of testimonial objects

### 4. Bookings API
- **POST** `/api/bookings` - Create new booking
  - Request body:
    ```javascript
    {
      packageId: number,
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      travelers: number,
      departureDate: string,
      specialRequests: string,
      emergencyName: string,
      emergencyPhone: string,
      agreeTerms: boolean,
      newsletter: boolean
    }
    ```
  - Response: Booking confirmation object with booking ID

- **GET** `/api/bookings/:id` - Get booking details (for confirmation)
  - Response: Complete booking object

### 5. Contact/Newsletter API
- **POST** `/api/newsletter/subscribe` - Newsletter subscription
  - Request body: `{ email: string }`
  - Response: Success/error message

## Database Models Needed

### 1. Package Model
```python
class Package(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    destination: str
    duration: str
    price: int
    original_price: int = None
    rating: float = 0.0
    reviews_count: int = 0
    image_url: str
    gallery_urls: List[str] = []
    category: str
    highlights: List[str] = []
    included: List[str] = []
    itinerary: List[dict] = []
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 2. BlogPost Model
```python
class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    author: str
    author_image_url: str = None
    publish_date: datetime = Field(default_factory=datetime.utcnow)
    read_time: str
    category: str
    image_url: str
    tags: List[str] = []
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 3. Testimonial Model
```python
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    image_url: str = None
    rating: int
    text: str
    package_id: str = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### 4. Booking Model
```python
class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    package_id: str
    first_name: str
    last_name: str
    email: str
    phone: str
    travelers: int
    departure_date: str
    special_requests: str = None
    emergency_name: str
    emergency_phone: str
    total_price: int
    status: str = "pending"  # pending, confirmed, cancelled
    agree_terms: bool
    newsletter: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 5. Newsletter Model
```python
class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
```

## Frontend Integration Points

### Files to Update After Backend Implementation:

1. **Remove mock data import** from:
   - `/app/frontend/src/pages/HomePage.jsx`
   - `/app/frontend/src/pages/PackagesPage.jsx`
   - `/app/frontend/src/pages/PackageDetailPage.jsx`
   - `/app/frontend/src/pages/BlogPage.jsx`
   - `/app/frontend/src/pages/BlogPostPage.jsx`
   - `/app/frontend/src/pages/BookingPage.jsx`

2. **Replace with API calls** using axios:
   ```javascript
   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
   const API = `${BACKEND_URL}/api`;
   ```

3. **Add loading states** and error handling for all API calls

4. **Update form submissions** to use real API endpoints instead of mock toast messages

## Data Migration
1. Insert mock data into MongoDB collections during backend setup
2. Ensure all image URLs are accessible and valid
3. Set up proper indexes for search and filtering functionality

## Key Features to Maintain
1. **Package Filtering**: Category, price range, search functionality
2. **Blog Filtering**: Category, search, pagination
3. **Booking Flow**: Multi-step form with validation
4. **Responsive Design**: All pages work on mobile/desktop
5. **Interactive Elements**: Accordion itineraries, image galleries, rating displays

## Testing Requirements
1. Test all CRUD operations for packages and blog posts
2. Test booking form submission and confirmation
3. Test search and filtering functionality
4. Verify responsive design on different screen sizes
5. Test form validation and error handling

## Performance Considerations
1. Implement pagination for packages and blog posts
2. Add image optimization for package galleries
3. Cache frequently accessed data (featured packages, etc.)
4. Add search indexing for better performance

This contracts file serves as the complete guide for seamless backend integration while preserving all the beautiful frontend functionality currently working with mock data.