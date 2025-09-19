import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Surveys from './pages/Surveys';
import Insights from './pages/Insights';
import Writer from './pages/Writer';
import Wallet from './pages/Wallet';
import TaskingPage from './pages/TaskingPage';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

const Home = () => (
  <>
    <Hero />
    <Stats />
    <HowItWorks />
    <Features />
    <Testimonials />
    <FAQ />
    <Contact />
  </>
);

const App = () => {
  const location = useLocation();
  
  // Updated route matching for dashboard routes
  const dashboardRoutes = [
    '/surveys', 
    '/surveys/:category', 
    '/insights', 
    '/writer', 
    '/wallet', 
    '/tasks/:category'
  ];
  
  const showBottomNav = dashboardRoutes.some((route) => {
    if (route.includes(':')) {
      // For parameterized routes, match the pattern
      const pattern = route.replace(/\/:category$/, '/(.*)');
      return location.pathname.match(new RegExp(`^${pattern}$`));
    }
    return location.pathname === route;
  });
  
  const showNavAndFooter = !showBottomNav;

  return (
    <div className="min-h-screen flex flex-col">
      {showNavAndFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Surveys routes - FIXED: Added parameterized route */}
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/surveys/:category" element={<Surveys />} />
          
          <Route path="/insights" element={<Insights />} />
          <Route path="/writer" element={<Writer />} />
          <Route path="/wallet" element={<Wallet />} />
          
          {/* Tasks route */}
          <Route path="/tasks/:category" element={<TaskingPage />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-secondary-light">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-primary-main mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-secondary-contrast mb-6">The page you're looking for doesn't exist.</p>
                <a 
                  href="/" 
                  className="bg-accent-main text-primary-contrast px-6 py-2 rounded-lg hover:bg-accent-light transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      {showNavAndFooter && <Footer />}
      {showBottomNav && <BottomNav />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;