// Mock data for travel packages and blog posts
export const travelPackages = [
  {
    id: 1,
    title: "Bali Paradise Escape",
    destination: "Bali, Indonesia",
    duration: "7 Days, 6 Nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
      "https://images.unsplash.com/photo-1570789210967-2cac133a0893?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    ],
    category: "Beach & Relaxation",
    highlights: [
      "Private villa accommodation",
      "Traditional Balinese spa treatments",
      "Guided temple tours",
      "Sunset dinner at Jimbaran Bay"
    ],
    included: [
      "Accommodation in 5-star resort",
      "Daily breakfast",
      "Airport transfers",
      "All tours and activities",
      "Professional tour guide"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        activities: [
          "Airport pickup and transfer to resort",
          "Welcome drink and check-in",
          "Sunset viewing at Tanah Lot Temple",
          "Welcome dinner at resort"
        ]
      },
      {
        day: 2,
        title: "Ubud Cultural Experience",
        activities: [
          "Morning yoga session",
          "Visit to Sacred Monkey Forest",
          "Traditional cooking class",
          "Ubud Rice Terrace exploration",
          "Shopping at Ubud Traditional Market"
        ]
      },
      {
        day: 3,
        title: "Beach Day & Water Sports",
        activities: [
          "Snorkeling at Blue Lagoon",
          "Beach relaxation at Sanur",
          "Traditional Balinese massage",
          "Seafood dinner by the beach"
        ]
      },
      {
        day: 4,
        title: "Temple & Culture Tour",
        activities: [
          "Besakih Temple (Mother Temple) visit",
          "Traditional village exploration",
          "Local craft workshop",
          "Cultural dance performance"
        ]
      },
      {
        day: 5,
        title: "Adventure Day",
        activities: [
          "Early morning Mount Batur sunrise trek",
          "Hot springs relaxation",
          "Coffee plantation tour",
          "ATV riding adventure"
        ]
      },
      {
        day: 6,
        title: "Leisure & Shopping",
        activities: [
          "Spa and wellness treatments",
          "Shopping at Seminyak boutiques",
          "Beach club experience",
          "Farewell dinner with cultural show"
        ]
      },
      {
        day: 7,
        title: "Departure",
        activities: [
          "Final breakfast at resort",
          "Last-minute souvenir shopping",
          "Airport transfer and departure"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Japan Cherry Blossom Tour",
    destination: "Tokyo & Kyoto, Japan",
    duration: "10 Days, 9 Nights",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
    ],
    category: "Cultural & Historical",
    highlights: [
      "Cherry blossom season experience",
      "Traditional ryokan stay",
      "Bullet train journey",
      "Tea ceremony participation"
    ],
    included: [
      "Luxury hotel accommodation",
      "Daily breakfast and 5 dinners",
      "All transportation including bullet train",
      "Guided tours with English-speaking guide",
      "Cultural activities and workshops"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tokyo",
        activities: [
          "Airport pickup and hotel check-in",
          "Welcome orientation",
          "Shibuya and Harajuku exploration",
          "Welcome dinner in traditional restaurant"
        ]
      },
      {
        day: 2,
        title: "Tokyo City Highlights",
        activities: [
          "Senso-ji Temple visit",
          "Tokyo National Museum",
          "Ueno Park cherry blossom viewing",
          "Sumida River cruise"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Swiss Alps Adventure",
    destination: "Interlaken, Switzerland",
    duration: "8 Days, 7 Nights",
    price: 1899,
    originalPrice: 2299,
    rating: 4.7,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
    ],
    category: "Adventure & Nature",
    highlights: [
      "Jungfraujoch - Top of Europe",
      "Scenic train journeys",
      "Paragliding experience",
      "Alpine hiking trails"
    ],
    included: [
      "Mountain lodge accommodation",
      "All meals included",
      "Swiss Travel Pass",
      "Adventure activities",
      "Mountain guide services"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Interlaken",
        activities: [
          "Airport transfer from Zurich",
          "Check-in to mountain lodge",
          "Interlaken town exploration",
          "Traditional Swiss dinner"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Maldives Luxury Retreat",
    destination: "Maldives",
    duration: "6 Days, 5 Nights",
    price: 3299,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80"
    ],
    category: "Luxury & Romance",
    highlights: [
      "Overwater villa accommodation",
      "Private beach access",
      "Couples spa treatments",
      "Underwater restaurant dining"
    ],
    included: [
      "Luxury overwater villa",
      "All meals and premium drinks",
      "Seaplane transfers",
      "Water sports equipment",
      "Personal butler service"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paradise",
        activities: [
          "Seaplane transfer to resort",
          "Overwater villa check-in",
          "Welcome champagne service",
          "Sunset dolphin watching"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Thailand Beach Paradise",
    destination: "Phuket, Thailand",
    duration: "5 Days, 4 Nights",
    price: 899,
    originalPrice: 1199,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1570789210967-2cac133a0893?w=800&q=80"
    ],
    category: "Beach & Relaxation",
    highlights: [
      "Crystal clear waters",
      "Island hopping tours",
      "Traditional Thai massage",
      "Fresh seafood dining"
    ],
    included: [
      "Beachfront resort accommodation",
      "Daily breakfast",
      "Island hopping tours",
      "Airport transfers",
      "Traditional Thai cooking class"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Phuket",
        activities: [
          "Airport pickup and transfer",
          "Resort check-in",
          "Beach relaxation",
          "Welcome dinner"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "European Grand Tour",
    destination: "Paris, Rome & Barcelona",
    duration: "12 Days, 11 Nights",
    price: 2899,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=800&q=80"
    ],
    category: "Cultural & Historical",
    highlights: [
      "Eiffel Tower visit",
      "Colosseum tour",
      "Sagrada Familia exploration",
      "Wine tasting sessions"
    ],
    included: [
      "4-star hotel accommodation",
      "Daily breakfast",
      "City tours with guides",
      "Train tickets between cities",
      "Museum entrance fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paris",
        activities: [
          "Airport transfer",
          "Hotel check-in",
          "Seine River cruise",
          "Welcome dinner"
        ]
      }
    ]
  },
  {
    id: 7,
    title: "African Safari Adventure",
    destination: "Serengeti, Tanzania",
    duration: "9 Days, 8 Nights",
    price: 3999,
    originalPrice: 4599,
    rating: 4.9,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80"
    ],
    category: "Adventure & Nature",
    highlights: [
      "Big Five wildlife viewing",
      "Hot air balloon safari",
      "Maasai village visit",
      "Sunrise game drives"
    ],
    included: [
      "Luxury safari lodge",
      "All meals included",
      "Professional safari guide",
      "Game drive vehicles",
      "Park entrance fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tanzania",
        activities: [
          "Airport pickup",
          "Lodge check-in",
          "Safari briefing",
          "Evening game drive"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Dubai Luxury Experience",
    destination: "Dubai, UAE",
    duration: "6 Days, 5 Nights",
    price: 2199,
    originalPrice: 2699,
    rating: 4.7,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1512453979798-5ea2fbec9b90?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea2fbec9b90?w=800&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=800&q=80",
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80"
    ],
    category: "Luxury & Romance",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari adventure",
      "Luxury shopping malls",
      "Traditional dhow cruise"
    ],
    included: [
      "5-star hotel accommodation",
      "Daily breakfast",
      "Desert safari with dinner",
      "City tour with guide",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Dubai Mall visit",
          "Burj Khalifa visit"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Caribbean Island Hopping",
    destination: "Barbados & St. Lucia",
    duration: "8 Days, 7 Nights",
    price: 1799,
    originalPrice: 2199,
    rating: 4.5,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80"
    ],
    category: "Beach & Relaxation",
    highlights: [
      "Crystal clear turquoise waters",
      "Island hopping adventures",
      "Snorkeling and diving",
      "Tropical beach relaxation"
    ],
    included: [
      "Beachfront resort accommodation",
      "Daily breakfast",
      "Island hopping tours",
      "Snorkeling equipment",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Barbados",
        activities: [
          "Airport pickup",
          "Resort check-in",
          "Beach relaxation",
          "Welcome dinner"
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Iceland Northern Lights",
    destination: "Reykjavik, Iceland",
    duration: "6 Days, 5 Nights",
    price: 1599,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    ],
    category: "Adventure & Nature",
    highlights: [
      "Northern Lights viewing",
      "Blue Lagoon experience",
      "Glacier hiking",
      "Geyser and waterfall tours"
    ],
    included: [
      "Hotel accommodation",
      "Daily breakfast",
      "Northern Lights tour",
      "Blue Lagoon entry",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Reykjavik",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "City tour",
          "Blue Lagoon visit"
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Greek Islands Discovery",
    destination: "Santorini & Mykonos, Greece",
    duration: "7 Days, 6 Nights",
    price: 1399,
    originalPrice: 1699,
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80"
    ],
    category: "Cultural & Historical",
    highlights: [
      "Santorini sunset views",
      "Mykonos windmills",
      "Ancient Greek history",
      "Mediterranean cuisine"
    ],
    included: [
      "Hotel accommodation",
      "Daily breakfast",
      "Ferry transfers between islands",
      "Guided tours",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Santorini",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Oia sunset viewing",
          "Welcome dinner"
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Moroccan Desert Adventure",
    destination: "Marrakech & Sahara, Morocco",
    duration: "8 Days, 7 Nights",
    price: 1199,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=800&q=80",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    ],
    category: "Adventure & Nature",
    highlights: [
      "Sahara Desert camping",
      "Camel trekking",
      "Atlas Mountains hiking",
      "Traditional Berber culture"
    ],
    included: [
      "Desert camp accommodation",
      "All meals included",
      "Camel trekking experience",
      "Professional guide",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Marrakech",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Jemaa el-Fnaa square",
          "Traditional dinner"
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Hawaiian Paradise Retreat",
    destination: "Maui, Hawaii",
    duration: "6 Days, 5 Nights",
    price: 1999,
    originalPrice: 2399,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    ],
    category: "Beach & Relaxation",
    highlights: [
      "Volcanic black sand beaches",
      "Road to Hana adventure",
      "Traditional luau experience",
      "Snorkeling at Molokini"
    ],
    included: [
      "Beachfront resort accommodation",
      "Daily breakfast",
      "Road to Hana tour",
      "Snorkeling equipment",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Maui",
        activities: [
          "Airport pickup",
          "Resort check-in",
          "Beach relaxation",
          "Welcome luau dinner"
        ]
      }
    ]
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    excerpt: "Discover the most breathtaking hidden destinations that only locals know about, from secret beaches to mystical temples.",
    content: "Southeast Asia is filled with incredible destinations that remain off the beaten path...",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "Destinations",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=800&q=80",
    tags: ["Southeast Asia", "Hidden Gems", "Travel Tips"]
  },
  {
    id: 2,
    title: "The Ultimate Guide to Cherry Blossom Season in Japan",
    excerpt: "Everything you need to know about experiencing Japan's magical sakura season, including the best spots and timing.",
    content: "Cherry blossom season in Japan is one of the most spectacular natural phenomena in the world...",
    author: "Michael Chen",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    publishDate: "2024-01-10",
    readTime: "12 min read",
    category: "Seasonal Travel",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80",
    tags: ["Japan", "Cherry Blossom", "Spring Travel"]
  },
  {
    id: 3,
    title: "Sustainable Travel: How to Explore the World Responsibly",
    excerpt: "Learn practical tips for reducing your environmental impact while still enjoying incredible travel experiences.",
    content: "Sustainable travel is becoming increasingly important as we become more aware of our environmental impact...",
    author: "Emma Wilson",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    publishDate: "2024-01-05",
    readTime: "10 min read",
    category: "Sustainable Travel",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    tags: ["Sustainability", "Eco Travel", "Responsible Tourism"]
  },
  {
    id: 4,
    title: "Luxury Travel on a Budget: Pro Tips and Tricks",
    excerpt: "Discover how to experience luxury travel without breaking the bank with these insider secrets and strategies.",
    content: "Luxury travel doesn't always have to come with a luxury price tag...",
    author: "David Rodriguez",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    publishDate: "2023-12-28",
    readTime: "7 min read",
    category: "Budget Travel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    tags: ["Budget Travel", "Luxury", "Travel Hacks"]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Jennifer Martinez",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
    rating: 5,
    text: "The Bali Paradise Escape exceeded all my expectations! Every detail was perfectly planned, and the experiences were truly magical. I can't wait to book my next adventure!",
    packageId: 1
  },
  {
    id: 2,
    name: "Robert Thompson",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
    text: "The Japan Cherry Blossom Tour was absolutely phenomenal. The attention to cultural details and the seamless organization made this trip unforgettable. Highly recommended!",
    packageId: 2
  },
  {
    id: 3,
    name: "Maria Garcia",
    location: "Madrid, Spain",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
    rating: 5,
    text: "Our Swiss Alps Adventure was the perfect blend of excitement and relaxation. The scenic beauty and adventure activities created memories that will last a lifetime.",
    packageId: 3
  }
];

export const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&q=80",
    packagesCount: 15
  },
  {
    id: 2,
    name: "Japan",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80",
    packagesCount: 8
  },
  {
    id: 3,
    name: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    packagesCount: 12
  },
  {
    id: 4,
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    packagesCount: 6
  }
];