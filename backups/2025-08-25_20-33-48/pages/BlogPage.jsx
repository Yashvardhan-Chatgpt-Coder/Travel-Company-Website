import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Search, ArrowRight, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { blogPosts } from '../data/mock';

export const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishDate) - new Date(b.publishDate);
      case 'title':
        return a.title.localeCompare(b.title);
      default: // 'latest'
        return new Date(b.publishDate) - new Date(a.publishDate);
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPost = blogPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Travel Stories & Tips
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Discover inspiring travel stories, expert tips, and hidden gems from around the world
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Story</h2>
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-500 text-white">
                    {featuredPost.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-slate-500 text-sm mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(featuredPost.publishDate)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={featuredPost.authorImage} 
                      alt={featuredPost.author}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{featuredPost.author}</p>
                      <p className="text-sm text-slate-500">Travel Writer</p>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                  >
                    <Link to={`/blog/${featuredPost.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Latest Articles ({filteredPosts.length})
              </h2>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-slate-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
                <p className="text-slate-600">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className="space-y-8">
                {otherPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-emerald-500 text-white text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="md:col-span-2 p-6">
                        <div className="flex items-center text-slate-500 text-sm mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.publishDate)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={post.authorImage} 
                              alt={post.author}
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <span className="text-sm font-medium text-slate-700">{post.author}</span>
                          </div>
                          <Button 
                            asChild
                            variant="outline"
                            size="sm"
                            className="hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600"
                          >
                            <Link to={`/blog/${post.id}`}>
                              Read More
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* View More Posts Button */}
            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8"
              >
                <Link to="/blog">
                  View More Posts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Tags */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.slice(1).map((category) => {
                  const count = blogPosts.filter(post => post.category === category).length;
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-slate-600">
                        {category}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Travel Newsletter</h3>
              <p className="text-slate-600 mb-4">
                Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox.
              </p>
              <div className="space-y-3">
                <Input placeholder="Your email address" />
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                  Subscribe
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;