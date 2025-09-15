import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/Hero.jpg';

const Hero = () => (
  <section
    id="home"
    className="bg-primary-main text-primary-contrast py-24 md:py-32 text-center relative"
    style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary-dark/90"></div>
    <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 animate-fade-in">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-primary-contrast drop-shadow-md">
        Earn From Your Valuable Opinions
      </h2>
      <p className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-3xl mx-auto font-medium text-primary-contrast drop-shadow-sm">
        Get up to Ksh 300 per survey
      </p>
      <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-secondary-light drop-shadow-sm">
        Trusted by 10,000+ users
      </p>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center">
        <Link
          to="/signup"
          className="bg-accent-main text-primary-contrast px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-light hover:scale-105 shadow-xl transition duration-300 focus:ring-2 focus:ring-accent-light w-full md:w-auto"
          aria-label="Start Earning Now"
        >
          Start Earning Now
        </Link>
        <Link
          to="/#how-it-works"
          className="border-2 border-primary-contrast px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-light hover:text-primary-contrast shadow-xl transition duration-300 focus:ring-2 focus:ring-primary-light w-full md:w-auto"
          aria-label="Learn More"
        >
          Learn More
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;