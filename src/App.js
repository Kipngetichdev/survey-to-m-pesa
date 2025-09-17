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
  const dashboardRoutes = ['/surveys', '/insights', '/writer', '/wallet', '/tasks/*'];
  const showBottomNav = dashboardRoutes.some((route) =>
    route.endsWith('*') ? location.pathname.startsWith(route.slice(0, -2)) : location.pathname === route
  );
  const showNavAndFooter = !showBottomNav;

  return (
    <div className="min-h-screen flex flex-col">
      {showNavAndFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/writer" element={<Writer />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/tasks/:category" element={<TaskingPage />} />
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