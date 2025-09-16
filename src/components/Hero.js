import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import heroImage from '../assets/Hero.jpg';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Open modal after 2 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Focus trapping within modal
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        id="home"
        className="bg-primary-main text-primary-contrast py-24 md:py-32 text-center relative"
        style={{
          backgroundImage: `url(${heroImage || 'https://via.placeholder.com/1200x600'})`,
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

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label="Testimonials Modal"
        >
          <div
            ref={modalRef}
            className="bg-primary-contrast text-secondary-contrast max-w-md sm:max-w-lg w-full mx-4 p-6 sm:p-8 rounded-lg shadow-xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            tabIndex="-1"
          >
            <button
              className="absolute top-4 right-4 text-secondary-contrast hover:text-accent-main focus:ring-2 focus:ring-accent-main rounded-full p-1 transition duration-200"
              onClick={handleCloseModal}
              aria-label="Close Testimonials Modal"
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-main mb-6 text-center">
              What Our Users Say
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-accent-main pl-4">
                <p className="text-base sm:text-lg italic">
                  "Survey Pesa has been a game-changer! I earned Ksh 500 in my first week just by sharing my opinions."
                </p>
                <p className="text-sm sm:text-base font-semibold mt-2 text-secondary-contrast">
                  — Jane M., Nairobi
                </p>
              </div>
              <div className="border-l-4 border-accent-main pl-4">
                <p className="text-base sm:text-lg italic">
                  "The surveys are quick and fun, and the M-Pesa rewards are real. Highly recommend!"
                </p>
                <p className="text-sm sm:text-base font-semibold mt-2 text-secondary-contrast">
                  — Peter K., Mombasa
                </p>
              </div>
            </div>
            <Link
              to="/signup"
              className="mt-8 block bg-accent-main text-primary-contrast px-6 py-3 rounded-full font-semibold text-lg hover:bg-accent-light hover:scale-105 shadow-xl transition duration-300 focus:ring-2 focus:ring-accent-light w-full text-center"
              aria-label="Start Earning"
            >
              Start Earning
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;