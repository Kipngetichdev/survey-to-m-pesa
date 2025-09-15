import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaPoll, FaWallet } from 'react-icons/fa';

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-secondary-main text-secondary-contrast">
    <div className="container mx-auto px-4 md:px-8 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-primary-main">
        How to Earn Money with Survey Pesa
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in">
          <FaUserPlus className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Sign Up for Free" />
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-primary-main">Sign Up for Free</h3>
          <p className="text-lg">Registration takes less than 2 minutes and you can start taking surveys right away.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in">
          <FaPoll className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Answer Surveys" />
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-primary-main">Answer Surveys</h3>
          <p className="text-lg">Complete surveys from our partners and earn money for each completed survey.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in">
          <FaWallet className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Withdraw Money" />
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-primary-main">Withdraw Money</h3>
          <p className="text-lg">Cash out your earnings through M-Pesa, PayPal, or bank transfer when you reach the threshold.</p>
        </div>
      </div>
      <Link
        to="/signup"
        className="mt-12 bg-accent-main text-primary-contrast px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-light hover:scale-105 shadow-xl transition duration-300 focus:ring-2 focus:ring-accent-light"
        aria-label="Start Earning Now"
      >
        Start Earning Now
      </Link>
    </div>
  </section>
);

export default HowItWorks;