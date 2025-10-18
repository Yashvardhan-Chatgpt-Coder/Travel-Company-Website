import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Heart, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { blogPosts } from '../data/mock';

export const BlogPostPage = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const relatedPosts = blogPosts.filter(p => 
    p.id !== parseInt(id) && p.category === post?.category
  ).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button asChild variant="outline" className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge className="bg-emerald-500 text-white">
              {post.category}
            </Badge>
            <div className="flex items-center text-slate-500 text-sm space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishDate)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between pb-8 border-b">
            <div className="flex items-center">
              <img 
                src={post.authorImage} 
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-slate-900">{post.author}</h3>
                <p className="text-sm text-slate-500">Travel Writer & Photographer</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-slate-700 leading-relaxed mb-6">
            Travel is more than just visiting new places—it's about immersing yourself in different cultures, 
            meeting new people, and creating memories that last a lifetime. In this comprehensive guide, 
            we'll explore some of the most incredible destinations that should be on every traveler's bucket list.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Magic of Exploration</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            There's something truly magical about stepping off a plane in a foreign country, breathing in 
            the unfamiliar air, and hearing the sounds of a new language. Each destination offers its own 
            unique blend of history, culture, and natural beauty that can't be replicated anywhere else.
          </p>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            Whether you're seeking adventure in the mountains, relaxation on pristine beaches, or 
            cultural immersion in ancient cities, the world offers endless possibilities for discovery. 
            The key is to approach each journey with an open mind and a willingness to embrace the unexpected.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Planning Your Adventure</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Successful travel begins long before you pack your bags. Research is crucial—understanding 
            local customs, weather patterns, and must-see attractions will help you make the most of your time. 
            However, don't over-plan every moment; some of the best travel experiences come from spontaneous discoveries.
          </p>
          
          <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-8 bg-emerald-50 rounded-r-lg">
            <p className="text-slate-700 italic text-lg">
              "The world is a book, and those who do not travel read only one page." - Saint Augustine
            </p>
          </blockquote>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            Remember that travel is also about stepping out of your comfort zone. Try local cuisines, 
            engage with locals, and participate in cultural activities. These experiences will enrich 
            your journey far more than simply checking off tourist attractions from a list.
          </p>
        </div>

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
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
        </div>

        {/* Author Bio */}
        <Card className="p-6 mb-12 bg-slate-50">
          <CardContent className="p-0">
            <div className="flex items-start space-x-4">
              <img 
                src={post.authorImage} 
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{post.author}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {post.author} is a seasoned travel writer and photographer with over 10 years of experience 
                  exploring the world's most incredible destinations. Through vivid storytelling and stunning 
                  photography, they inspire others to embark on their own adventures.
                </p>
                <div className="flex space-x-4 text-sm">
                  <a href="#" className="text-emerald-600 hover:text-emerald-700">Follow on Twitter</a>
                  <a href="#" className="text-emerald-600 hover:text-emerald-700">View Profile</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-emerald-500 text-white text-xs">
                        {relatedPost.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center text-slate-500 text-xs mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(relatedPost.publishDate)}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      <Link to={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link to={`/blog/${relatedPost.id}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <Card className="p-8 bg-gradient-to-r from-emerald-50 to-teal-50 text-center mb-20">
          <CardContent className="p-0">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Stay Updated</h2>
            <p className="text-slate-600 mb-6">
              Get the latest travel stories and tips delivered straight to your inbox
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
};

export default BlogPostPage;