import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import Hero2Page from "./pages/Hero2Page";
import Hero3Page from "./pages/Hero3Page";
import Hero4Page from "./pages/Hero4Page";
import PackagesPage from "./pages/PackagesPage";
import CategoryPage from "./pages/CategoryPage";
import Category2Page from "./pages/Category2Page";
import PackageDetailPage from "./pages/PackageDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminPanel from "./pages/AdminPanel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { HomePageProvider } from "./context/HomePageContext";
import { DestinationsProvider } from "./context/DestinationsContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const helloWorldApi = async () => {
    try {
      await axios.get(`${API}/`);
      // API health check successful
    } catch (e) {
      // Silent fail for health check - don't spam console in production
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="App min-h-screen bg-white">
      <HomePageProvider>
        <DestinationsProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </DestinationsProvider>
      </HomePageProvider>
    </div>
  );
}

function AppContent() {
  // Use the scroll to top hook
  useScrollToTop();

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hero2" element={<Hero2Page />} />
          <Route path="/hero3" element={<Hero3Page />} />
          <Route path="/hero4" element={<Hero4Page />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category2" element={<Category2Page />} />
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/book/:packageId" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
      <SonnerToaster />
      <Toaster />
    </>
  );
}

export default App;