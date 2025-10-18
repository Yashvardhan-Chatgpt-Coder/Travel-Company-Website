from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection - use local MongoDB or create one if not exists
try:
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'travel_company_db')]
    # Test connection
    client.admin.command('ping')
    logger.info("✅ Connected to MongoDB")
except Exception as e:
    logger.warning(f"⚠️ MongoDB connection failed: {e}")
    logger.info("🔄 Using in-memory storage for development")
    # Fallback to in-memory storage
    db = None

# MongoDB connection status
if db:
    logger.info("✅ Using MongoDB for persistent storage")
else:
    logger.warning("⚠️ Using in-memory storage (data will not persist)")

# Create the main app without a prefix
app = FastAPI(title="Travel Company API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== DATA MODELS ====================

class HeroSection(BaseModel):
    title: str
    subtitle: str
    backgroundImage: str
    ctaText: str
    ctaLink: str

class Feature(BaseModel):
    title: str
    description: str

class WhyChooseUs(BaseModel):
    title: str
    description: str
    features: List[Feature]

class Testimonial(BaseModel):
    name: str
    role: str
    content: str
    rating: int
    image: Optional[str] = None

class Testimonials(BaseModel):
    title: str
    description: str
    testimonials: List[Testimonial]

class CTASection(BaseModel):
    title: str
    description: str
    primaryButton: str
    secondaryButton: str

class HomePageData(BaseModel):
    hero: HeroSection
    featuredPackages: dict
    latestBlogs: dict
    whyChooseUs: WhyChooseUs
    testimonials: Testimonials
    cta: CTASection

class Package(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    price: float
    originalPrice: float = None
    duration: str
    destination: str
    image: str
    highlights: List[str]
    included: List[str]
    excluded: List[str]
    category: str
    rating: float = 4.5
    reviews: int = 0
    featured: bool = False
    featuredOrder: int = 0

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: str
    author: str
    image: str
    category: str
    tags: List[str]
    publishedAt: datetime = Field(default_factory=datetime.utcnow)
    readTime: int = 5

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class Destination(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    country: str
    packages: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class DestinationCreate(BaseModel):
    name: str
    country: str

class DestinationUpdate(BaseModel):
    name: Optional[str] = None
    country: Optional[str] = None

# ==================== IN-MEMORY STORAGE (Fallback) ====================

# Default homepage data
default_homepage_data = {
    "hero": {
        "title": "Discover Your Next Adventure",
        "subtitle": "Embark on extraordinary journeys to breathtaking destinations around the world. Create memories that last a lifetime with our expertly crafted travel experiences.",
        "backgroundImage": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
        "ctaText": "Explore Packages",
        "ctaLink": "/packages",
        "watchVideoText": "Watch Video",
        "watchVideoLink": "#",
        "stats": [
            {"label": "Happy Travelers", "value": "50,000+", "icon": "Users"},
            {"label": "Destinations", "value": "100+", "icon": "Globe"},
            {"label": "Years Experience", "value": "10+", "icon": "Award"},
            {"label": "Success Rate", "value": "99.9%", "icon": "Shield"}
        ]
    },
    "featuredPackages": {
        "title": "Popular Destinations",
        "description": "Discover our most sought-after travel experiences, carefully curated for unforgettable adventures",
        "packageIds": ["bali-paradise-escape", "japan-cherry-blossom-tour", "swiss-alps-adventure"]
    },
    "latestBlogs": {
        "title": "Latest Travel Stories",
        "description": "Discover inspiring travel stories, expert tips, and hidden gems from around the world",
        "postsToShow": 3
    },
    "whyChooseUs": {
        "title": "Your Trusted Travel Partner",
        "description": "With years of experience and thousands of satisfied customers, we make your travel dreams come true",
        "features": [
            {"title": "100% Safe & Secure", "description": "Your safety is our priority. We ensure all destinations meet the highest safety standards with 24/7 support."},
            {"title": "Award Winning Service", "description": "Recognized globally for excellence in travel services and customer satisfaction ratings."},
            {"title": "Global Network", "description": "Access to exclusive destinations and local experiences through our worldwide partner network."}
        ]
    },
    "testimonials": {
        "title": "What Our Travelers Say",
        "description": "Real experiences from real travelers who have explored the world with us",
        "testimonials": [
            {"name": "Sarah Johnson", "role": "Adventure Traveler", "content": "Amazing experience! The team made everything perfect.", "rating": 5, "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80"},
            {"name": "Mike Chen", "role": "Business Traveler", "content": "Professional service and unforgettable memories.", "rating": 5, "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"},
            {"name": "Emma Davis", "role": "Family Traveler", "content": "Perfect for family trips. Kids loved every moment!", "rating": 5, "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"}
        ]
    },
    "cta": {
        "title": "Ready for Your Next Adventure?",
        "description": "Join thousands of travelers who have discovered the world with us. Your perfect journey starts here.",
        "primaryButton": "Browse Packages",
        "secondaryButton": "Contact Us"
    }
}

# Sample destinations data
sample_destinations = [
    {
        "id": "1",
        "name": "Bali",
        "country": "Indonesia",
        "packages": 8
    },
    {
        "id": "2",
        "name": "Tokyo",
        "country": "Japan",
        "packages": 12
    },
    {
        "id": "3",
        "name": "Paris",
        "country": "France",
        "packages": 15
    },
    {
        "id": "4",
        "name": "Interlaken",
        "country": "Switzerland",
        "packages": 6
    },
    {
        "id": "5",
        "name": "Serengeti",
        "country": "Tanzania",
        "packages": 4
    },
    {
        "id": "6",
        "name": "Maldives",
        "country": "Maldives",
        "packages": 10
    },
    {
        "id": "7",
        "name": "Mumbai",
        "country": "India",
        "packages": 5
    },
    {
        "id": "8",
        "name": "Delhi",
        "country": "India",
        "packages": 7
    }
]

# Sample packages data
sample_packages = [
    {
        "id": "bali-paradise-escape",
        "title": "Bali Paradise Escape",
        "description": "Experience the perfect blend of culture and relaxation in beautiful Bali. Visit ancient temples, pristine beaches, and lush rice terraces.",
        "price": 1299.99,
        "originalPrice": 1599.99,
        "duration": "7 Days / 6 Nights",
        "destination": "Bali, Indonesia",
        "image": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
        "highlights": ["Sacred Monkey Forest", "Rice Terraces", "Beach Relaxation", "Cultural Shows"],
        "included": ["Accommodation", "Daily Breakfast", "Airport Transfers", "Guided Tours"],
        "excluded": ["International Flights", "Lunch & Dinner", "Personal Expenses"],
        "category": "Beach & Relaxation",
        "rating": 4.8,
        "reviews": 127,
        "featured": True,
        "featuredOrder": 1
    },
    {
        "id": "japan-cherry-blossom-tour",
        "title": "Japan Cherry Blossom Tour",
        "description": "Witness the magical cherry blossom season in Japan. Explore Tokyo's modern wonders and Kyoto's ancient traditions.",
        "price": 2499.99,
        "originalPrice": 2899.99,
        "duration": "10 Days / 9 Nights",
        "destination": "Tokyo & Kyoto, Japan",
        "image": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
        "highlights": ["Cherry Blossom Viewing", "Mount Fuji", "Traditional Temples", "Bullet Train Experience"],
        "included": ["Accommodation", "Daily Meals", "JR Pass", "Cultural Experiences"],
        "excluded": ["International Flights", "Personal Expenses", "Optional Activities"],
        "category": "Cultural & Historical",
        "rating": 4.9,
        "reviews": 89,
        "featured": True,
        "featuredOrder": 2
    },
    {
        "id": "swiss-alps-adventure",
        "title": "Swiss Alps Adventure",
        "description": "Adventure through the stunning Swiss Alps. Experience breathtaking mountain views, charming villages, and thrilling outdoor activities.",
        "price": 1899.99,
        "originalPrice": 2199.99,
        "duration": "8 Days / 7 Nights",
        "destination": "Interlaken, Switzerland",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "highlights": ["Mountain Hiking", "Lake Views", "Cable Car Rides", "Alpine Villages"],
        "included": ["Mountain Lodge", "Daily Breakfast", "Guided Hikes", "Transport Pass"],
        "excluded": ["International Flights", "Lunch & Dinner", "Equipment Rental"],
        "category": "Adventure & Nature",
        "rating": 4.7,
        "reviews": 156,
        "featured": True,
        "featuredOrder": 3
    }
]

# In-memory storage
in_memory_data = {
    "homepage": default_homepage_data.copy(),
    "packages": sample_packages.copy(),
    "blog_posts": [],
    "destinations": sample_destinations.copy()
}

# ==================== HELPER FUNCTIONS ====================

async def get_collection_or_memory(collection_name: str):
    """Get data from MongoDB or fallback to in-memory storage"""
    if db is not None:
        try:
            collection = db[collection_name]
            return collection
        except:
            return None
    return None

async def get_data_or_memory(collection_name: str, default_data=None):
    """Get data from MongoDB or fallback to in-memory storage"""
    if db is not None:
        try:
            collection = db[collection_name]
            if collection_name == "homepage":
                data = await collection.find_one({})
                if data:
                    return data
                # If no data in MongoDB, check in-memory storage
                return in_memory_data.get(collection_name, default_data)
            else:
                cursor = collection.find({})
                data = await cursor.to_list(1000)
                if data:
                    return data
                # If no data in MongoDB, check in-memory storage
                return in_memory_data.get(collection_name, default_data)
        except:
            # If MongoDB fails, check in-memory storage
            return in_memory_data.get(collection_name, default_data)
    return in_memory_data.get(collection_name, default_data)

async def save_data_or_memory(collection_name: str, data, is_update=False):
    """Save data to MongoDB or fallback to in-memory storage"""
    if db is not None:
        try:
            collection = db[collection_name]
            if collection_name == "homepage":
                if is_update:
                    # For homepage, replace the entire document
                    await collection.replace_one({}, data, upsert=True)
                else:
                    await collection.insert_one(data)
            else:
                if is_update:
                    await collection.replace_one({"_id": data.get("id")}, data, upsert=True)
                else:
                    await collection.insert_one(data)
            return True
        except Exception as e:
            logger.error(f"Database error in save_data_or_memory: {e}")
            # Fall back to in-memory storage if MongoDB fails
            logger.info("Falling back to in-memory storage...")
            return await save_data_or_memory_internal(collection_name, data, is_update)
    else:
        # In-memory storage
        return await save_data_or_memory_internal(collection_name, data, is_update)

async def save_data_or_memory_internal(collection_name: str, data, is_update=False):
    """Internal function for in-memory storage"""
    try:
        if collection_name == "homepage":
            in_memory_data[collection_name] = data
        else:
            if is_update:
                # Update existing item
                for i, item in enumerate(in_memory_data[collection_name]):
                    if item.get("id") == data.get("id"):
                        in_memory_data[collection_name][i] = data
                        break
            else:
                # Add new item
                in_memory_data[collection_name].append(data)
        logger.info(f"✅ Data saved to in-memory storage: {collection_name}")
        return True
    except Exception as e:
        logger.error(f"❌ Error saving to in-memory storage: {e}")
        return False

# ==================== API ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Travel Company API", "status": "running", "db_status": "connected" if db is not None else "in_memory"}

@api_router.get("/health")
async def health_check():
    if db is not None:
        try:
            # Test MongoDB connection
            await db.command("ping")
            return {"status": "healthy", "database": "connected"}
        except Exception as e:
            logger.error(f"MongoDB connection test failed: {e}")
            return {"status": "healthy", "database": "in-memory (MongoDB failed)"}
    else:
        return {"status": "healthy", "database": "in-memory"}

# ==================== ADMIN ROUTES ====================

@api_router.get("/admin/homepage")
async def get_homepage_data():
    """Get current homepage data"""
    data = await get_data_or_memory("homepage", default_homepage_data)
    return data

@api_router.put("/admin/homepage")
async def update_homepage_data(data: dict):
    """Update homepage data"""
    try:
        success = await save_data_or_memory("homepage", data, is_update=True)
        if success:
            return {"message": "Homepage updated successfully", "data": data}
        else:
            raise HTTPException(status_code=500, detail="Failed to save data")
    except Exception as e:
        logger.error(f"Error updating homepage: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update homepage: {str(e)}")

@api_router.get("/admin/packages")
async def get_all_packages():
    """Get all travel packages"""
    packages = await get_data_or_memory("packages", [])
    return packages

@api_router.post("/admin/packages")
async def create_package(package: Package):
    """Create a new travel package"""
    success = await save_data_or_memory("packages", package.dict())
    if success:
        return {"message": "Package created successfully", "package": package}
    raise HTTPException(status_code=500, detail="Failed to create package")

@api_router.put("/admin/packages/{package_id}")
async def update_package(package_id: str, package: Package):
    """Update an existing travel package"""
    package_dict = package.dict()
    package_dict["id"] = package_id
    success = await save_data_or_memory("packages", package_dict, is_update=True)
    if success:
        return {"message": "Package updated successfully", "package": package_dict}
    raise HTTPException(status_code=500, detail="Failed to update package")

@api_router.delete("/admin/packages/{package_id}")
async def delete_package(package_id: str):
    """Delete a travel package"""
    if db is not None:
        try:
            collection = db["packages"]
            result = await collection.delete_one({"_id": package_id})
            if result.deleted_count > 0:
                return {"message": "Package deleted successfully"}
        except:
            pass
    
    # In-memory deletion
    for i, package in enumerate(in_memory_data["packages"]):
        if package.get("id") == package_id:
            del in_memory_data["packages"][i]
            return {"message": "Package deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Package not found")

# ==================== FEATURED PACKAGES MANAGEMENT ====================

@api_router.get("/admin/featured-packages")
async def get_featured_packages():
    """Get featured packages configuration"""
    homepage_data = await get_data_or_memory("homepage", default_homepage_data)
    return homepage_data.get("featuredPackages", {})

@api_router.put("/admin/featured-packages")
async def update_featured_packages(featured_data: dict):
    """Update featured packages configuration"""
    try:
        homepage_data = await get_data_or_memory("homepage", default_homepage_data)
        homepage_data["featuredPackages"] = featured_data
        
        success = await save_data_or_memory("homepage", homepage_data, is_update=True)
        if success:
            return {"message": "Featured packages updated successfully", "data": featured_data}
        else:
            raise HTTPException(status_code=500, detail="Failed to save data")
    except Exception as e:
        logger.error(f"Error updating featured packages: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update featured packages: {str(e)}")

@api_router.post("/admin/featured-packages/add")
async def add_featured_package(package_id: str, order: int = None):
    """Add a package to featured packages"""
    try:
        # Check if package exists
        packages = await get_data_or_memory("packages", [])
        package_exists = any(pkg.get("id") == package_id for pkg in packages)
        if not package_exists:
            raise HTTPException(status_code=404, detail="Package not found")
        
        homepage_data = await get_data_or_memory("homepage", default_homepage_data)
        featured_packages = homepage_data.get("featuredPackages", {})
        package_ids = featured_packages.get("packageIds", [])
        
        # Add package if not already featured
        if package_id not in package_ids:
            if order is None:
                order = len(package_ids) + 1
            package_ids.append(package_id)
            featured_packages["packageIds"] = package_ids
            homepage_data["featuredPackages"] = featured_packages
            
            success = await save_data_or_memory("homepage", homepage_data, is_update=True)
            if success:
                return {"message": "Package added to featured successfully", "package_id": package_id}
            else:
                raise HTTPException(status_code=500, detail="Failed to save data")
        else:
            return {"message": "Package is already featured", "package_id": package_id}
    except Exception as e:
        logger.error(f"Error adding featured package: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to add featured package: {str(e)}")

@api_router.delete("/admin/featured-packages/remove/{package_id}")
async def remove_featured_package(package_id: str):
    """Remove a package from featured packages"""
    try:
        homepage_data = await get_data_or_memory("homepage", default_homepage_data)
        featured_packages = homepage_data.get("featuredPackages", {})
        package_ids = featured_packages.get("packageIds", [])
        
        if package_id in package_ids:
            package_ids.remove(package_id)
            featured_packages["packageIds"] = package_ids
            homepage_data["featuredPackages"] = featured_packages
            
            success = await save_data_or_memory("homepage", homepage_data, is_update=True)
            if success:
                return {"message": "Package removed from featured successfully", "package_id": package_id}
            else:
                raise HTTPException(status_code=500, detail="Failed to save data")
        else:
            return {"message": "Package is not featured", "package_id": package_id}
    except Exception as e:
        logger.error(f"Error removing featured package: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to remove featured package: {str(e)}")

@api_router.put("/admin/featured-packages/reorder")
async def reorder_featured_packages(package_ids: List[str]):
    """Reorder featured packages"""
    try:
        homepage_data = await get_data_or_memory("homepage", default_homepage_data)
        featured_packages = homepage_data.get("featuredPackages", {})
        featured_packages["packageIds"] = package_ids
        homepage_data["featuredPackages"] = featured_packages
        
        success = await save_data_or_memory("homepage", homepage_data, is_update=True)
        if success:
            return {"message": "Featured packages reordered successfully", "package_ids": package_ids}
        else:
            raise HTTPException(status_code=500, detail="Failed to save data")
    except Exception as e:
        logger.error(f"Error reordering featured packages: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to reorder featured packages: {str(e)}")

@api_router.get("/admin/blog")
async def get_all_blog_posts():
    """Get all blog posts"""
    posts = await get_data_or_memory("blog_posts", [])
    return posts

@api_router.post("/admin/blog")
async def create_blog_post(post: BlogPost):
    """Create a new blog post"""
    success = await save_data_or_memory("blog_posts", post.dict())
    if success:
        return {"message": "Blog post created successfully", "post": post}
    raise HTTPException(status_code=500, detail="Failed to create blog post")

@api_router.put("/admin/blog/{post_id}")
async def update_blog_post(post_id: str, post: BlogPost):
    """Update an existing blog post"""
    post_dict = post.dict()
    post_dict["id"] = post_id
    success = await save_data_or_memory("blog_posts", post_dict, is_update=True)
    if success:
        return {"message": "Blog post updated successfully", "post": post_dict}
    raise HTTPException(status_code=500, detail="Failed to update blog post")

@api_router.delete("/admin/blog/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post"""
    if db is not None:
        try:
            collection = db["blog_posts"]
            result = await collection.delete_one({"_id": post_id})
            if result.deleted_count > 0:
                return {"message": "Blog post deleted successfully"}
        except:
            pass
    
    # In-memory deletion
    for i, post in enumerate(in_memory_data["blog_posts"]):
        if post.get("id") == post_id:
            del in_memory_data["blog_posts"][i]
            return {"message": "Blog post deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Blog post not found")

# ==================== PUBLIC ROUTES ====================

@api_router.get("/homepage")
async def get_public_homepage():
    """Get public homepage data"""
    data = await get_data_or_memory("homepage", default_homepage_data)
    return data

@api_router.get("/packages")
async def get_public_packages():
    """Get public packages"""
    packages = await get_data_or_memory("packages", [])
    return packages

@api_router.get("/featured-packages")
async def get_featured_packages_with_details():
    """Get featured packages with full package details"""
    try:
        homepage_data = await get_data_or_memory("homepage", default_homepage_data)
        featured_packages = homepage_data.get("featuredPackages", {})
        package_ids = featured_packages.get("packageIds", [])
        
        # Get all packages
        all_packages = await get_data_or_memory("packages", [])
        
        # Filter and sort featured packages
        featured_packages_list = []
        for package_id in package_ids:
            package = next((pkg for pkg in all_packages if pkg.get("id") == package_id), None)
            if package:
                featured_packages_list.append(package)
        
        return {
            "title": featured_packages.get("title", "Popular Destinations"),
            "description": featured_packages.get("description", ""),
            "packages": featured_packages_list
        }
    except Exception as e:
        logger.error(f"Error getting featured packages: {e}")
        return {
            "title": "Popular Destinations",
            "description": "Discover our most sought-after travel experiences",
            "packages": []
        }

@api_router.get("/blog")
async def get_public_blog_posts():
    """Get public blog posts"""
    posts = await get_data_or_memory("blog_posts", [])
    return posts

# ==================== LEGACY ROUTES ====================

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    if db is not None:
        try:
            collection = db["status_checks"]
            await collection.insert_one(status_obj.dict())
        except:
            pass
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is not None:
        try:
            collection = db["status_checks"]
            status_checks = await collection.find().to_list(1000)
            return [StatusCheck(**status_check) for status_check in status_checks]
        except:
            return []
    return []

# ==================== DESTINATIONS API ENDPOINTS ====================

@api_router.get("/destinations", response_model=List[Destination])
async def get_destinations():
    """Get all destinations"""
    
    if db is not None:
        try:
            collection = db["destinations"]
            destinations = await collection.find().to_list(1000)
            return [Destination(**destination) for destination in destinations]
        except Exception as e:
            logger.error(f"Error fetching destinations from database: {e}")
            return []
    else:
        # Return in-memory destinations
        destinations_data = in_memory_data.get("destinations", [])
        
        # Try to create Destination objects
        try:
            result = [Destination(**dest) for dest in destinations_data]
            return result
        except Exception as e:
            logger.error(f"Error creating Destination objects: {e}")
            return []

@api_router.post("/destinations", response_model=Destination)
async def create_destination(destination: DestinationCreate):
    """Create a new destination"""
    new_destination = Destination(
        name=destination.name,
        country=destination.country
    )
    
    if db is not None:
        try:
            collection = db["destinations"]
            await collection.insert_one(new_destination.dict())
        except Exception as e:
            logger.error(f"Error creating destination in database: {e}")
            raise HTTPException(status_code=500, detail="Failed to create destination")
    else:
        # Add to in-memory storage
        in_memory_data["destinations"].append(new_destination.dict())
    
    return new_destination

@api_router.get("/destinations/{destination_id}", response_model=Destination)
async def get_destination(destination_id: str):
    """Get a specific destination by ID"""
    if db is not None:
        try:
            collection = db["destinations"]
            destination = await collection.find_one({"id": destination_id})
            if destination:
                return Destination(**destination)
            else:
                raise HTTPException(status_code=404, detail="Destination not found")
        except Exception as e:
            logger.error(f"Error fetching destination from database: {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch destination")
    else:
        # Search in-memory destinations
        destination = next((dest for dest in in_memory_data.get("destinations", []) if dest["id"] == destination_id), None)
        if destination:
            return Destination(**destination)
        else:
            raise HTTPException(status_code=404, detail="Destination not found")

@api_router.put("/destinations/{destination_id}", response_model=Destination)
async def update_destination(destination_id: str, destination_update: DestinationUpdate):
    """Update a destination"""
    if db is not None:
        try:
            collection = db["destinations"]
            update_data = destination_update.dict(exclude_unset=True)
            update_data["updated_at"] = datetime.utcnow()
            
            result = await collection.update_one(
                {"id": destination_id},
                {"$set": update_data}
            )
            
            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="Destination not found")
            
            # Return updated destination
            updated_destination = await collection.find_one({"id": destination_id})
            return Destination(**updated_destination)
        except Exception as e:
            logger.error(f"Error updating destination in database: {e}")
            raise HTTPException(status_code=500, detail="Failed to update destination")
    else:
        # Update in-memory destination
        destinations_list = in_memory_data.get("destinations", [])
        destination_index = next((i for i, dest in enumerate(destinations_list) if dest["id"] == destination_id), None)
        if destination_index is not None:
            update_data = destination_update.dict(exclude_unset=True)
            update_data["updated_at"] = datetime.utcnow()
            destinations_list[destination_index].update(update_data)
            return Destination(**destinations_list[destination_index])
        else:
            raise HTTPException(status_code=404, detail="Destination not found")

@api_router.delete("/destinations/{destination_id}")
async def delete_destination(destination_id: str):
    """Delete a destination"""
    if db is not None:
        try:
            collection = db["destinations"]
            result = await collection.delete_one({"id": destination_id})
            
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Destination not found")
            
            return {"message": "Destination deleted successfully"}
        except Exception as e:
            logger.error(f"Error deleting destination from database: {e}")
            raise HTTPException(status_code=500, detail="Failed to delete destination")
    else:
        # Delete from in-memory storage
        destinations_list = in_memory_data.get("destinations", [])
        destination_index = next((i for i, dest in enumerate(destinations_list) if dest["id"] == destination_id), None)
        if destination_index is not None:
            deleted_destination = destinations_list.pop(destination_index)
            return {"message": "Destination deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Destination not found")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(','),
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize default data on startup"""
    if db is None:
        logger.info("Using in-memory storage - initializing default data")
        # Initialize with some sample packages and blog posts
        sample_packages = [
            {
                "id": str(uuid.uuid4()),
                "title": "Bali Adventure",
                "description": "Explore the beautiful island of Bali with its stunning beaches and rich culture",
                "price": 1299.99,
                "duration": "7 days",
                "destination": "Bali, Indonesia",
                "image": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
                "highlights": ["Beach hopping", "Cultural tours", "Water sports"],
                "included": ["Flights", "Hotel", "Meals", "Transfers"],
                "excluded": ["Personal expenses", "Optional tours"],
                "category": "Adventure",
                "rating": 4.8,
                "reviews": 127
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Paris Explorer",
                "description": "Discover the magic of Paris with guided tours of iconic landmarks",
                "price": 2199.99,
                "duration": "5 days",
                "destination": "Paris, France",
                "image": "https://images.unsplash.com/photo-1502602898534-7d973c7a0b56?w=800&q=80",
                "highlights": ["Eiffel Tower", "Louvre Museum", "Seine River cruise"],
                "included": ["Flights", "Hotel", "Breakfast", "City tours"],
                "excluded": ["Lunch & dinner", "Museum tickets"],
                "category": "Cultural",
                "rating": 4.9,
                "reviews": 203
            }
        ]
        
        sample_blog_posts = [
            {
                "id": str(uuid.uuid4()),
                "title": "Top 10 Hidden Gems in Bali",
                "content": "Discover the lesser-known attractions that make Bali truly special...",
                "excerpt": "Explore the secret spots that most tourists miss in this paradise island",
                "author": "Travel Expert",
                "image": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
                "category": "Destinations",
                "tags": ["Bali", "Hidden Gems", "Travel Tips"],
                "publishedAt": datetime.utcnow(),
                "readTime": 8
            }
        ]
        
        in_memory_data["packages"] = sample_packages
        in_memory_data["blog_posts"] = sample_blog_posts
        in_memory_data["destinations"] = sample_destinations
    else:
        logger.info("Connected to MongoDB - initializing default data")
        try:
            # Initialize destinations collection
            destinations_collection = db["destinations"]
            existing_destinations = await destinations_collection.count_documents({})
            
            if existing_destinations == 0:
                logger.info("Initializing destinations collection with sample data")
                for dest in sample_destinations:
                    await destinations_collection.insert_one(dest)
                logger.info(f"✅ Initialized {len(sample_destinations)} destinations")
            else:
                logger.info(f"✅ Destinations collection already has {existing_destinations} documents")
                
        except Exception as e:
            logger.error(f"Error initializing destinations in database: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
