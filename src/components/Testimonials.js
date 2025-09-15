import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-secondary-light text-secondary-contrast">
    <div className="container mx-auto px-4 md:px-8 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-primary-main">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in">
          <FaQuoteLeft className="w-10 h-10 mx-auto mb-4 text-primary-main" aria-label="Testimonial Quote" />
          <p className="mb-4 text-lg">"The platform keeps getting better. New features are regularly added, and the earning opportunities have increased."</p>
          <p className="font-extrabold text-xl text-primary-main">Samuel Maina</p>
          <p className="text-base">Entrepreneur</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in">
          <FaQuoteLeft className="w-10 h-10 mx-auto mb-4 text-primary-main" aria-label="Testimonial Quote" />
          <p className="mb-4 text-lg">"Perfect for earning extra income while studying. The surveys are interesting and payments are always on time."</p>
          <p className="font-extrabold text-xl text-primary-main">Grace Wanjiku</p>
          <p className="text-base">Student</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 animate-fade-in">
          <FaQuoteLeft className="w-10 h-10 mx-auto mb-4 text-primary-main" aria-label="Testimonial Quote" />
          <p className="mb-4 text-lg">"I've been using Survey Pesa for 6 months now. The M-Pesa integration makes withdrawals super convenient."</p>
          <p className="font-extrabold text-xl text-primary-main">David Kimani</p>
          <p className="text-base">Teacher</p>
        </div>
      </div>
      <Link
        to="/signup"
        className="mt-12 bg-accent-main text-primary-contrast px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-light hover:scale-105 shadow-xl transition duration-300 focus:ring-2 focus:ring-accent-light"
        aria-label="Join Our Community"
      >
        Join Our Community
      </Link>
    </div>
  </section>
);

export default Testimonials;