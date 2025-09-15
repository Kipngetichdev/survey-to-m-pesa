import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaBell, FaCompass, FaGift } from 'react-icons/fa';

const Features = () => (
  <section id="features" className="py-20 bg-primary-main text-primary-contrast">
    <div className="container mx-auto px-4 md:px-8 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-primary-contrast">
        What Makes Survey Pesa Stand Out
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in text-secondary-contrast">
          <FaClock className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Fast Processing" />
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-primary-main">Fast Processing</h3>
          <p className="text-lg">Get payments within 24-48 hours of withdrawal request, no long waiting times.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in text-secondary-contrast">
          <FaBell className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Regular Updates" />
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-primary-main">Regular Updates</h3>
          <p className="text-lg">Get notified when new surveys that match your profile are available.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in text-secondary-contrast">
          <FaCompass className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Easy Navigation" />
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-primary-main">Easy Navigation</h3>
          <p className="text-lg">User-friendly interface makes it simple to find and complete surveys.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in text-secondary-contrast">
          <FaGift className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Earn More" />
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-primary-main">Earn More</h3>
          <p className="text-lg">Refer friends to earn additional income through our referral program.</p>
        </div>
      </div>
      <Link
        to="/signup"
        className="mt-12 bg-accent-main text-primary-contrast px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-light hover:scale-105 shadow-xl transition duration-300 focus:ring-2 focus:ring-accent-light"
        aria-label="Get Started Now"
      >
        Get Started Now
      </Link>
    </div>
  </section>
);

export default Features;