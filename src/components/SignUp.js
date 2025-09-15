import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appImg from '../assets/appImg.jpg';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Sign-up successful! (Simulated)');
  };

  return (
    <section id="signup" className="py-16 md:py-24 bg-secondary-light text-secondary-contrast">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <img
            src={appImg}
            alt="Survey Pesa app interface preview"
            className="w-full max-w-lg mx-auto rounded-lg shadow-md mb-8"
          />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-main tracking-tight">
            Join Survey Pesa
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Sign up for free and start earning rewards by participating in surveys tailored to your interests.
          </p>
          <div className="max-w-md mx-auto bg-primary-contrast rounded-lg shadow-md p-6 sm:p-8">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Full Name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Email"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="M-Pesa Phone Number (e.g., +2547XXXXXXXX)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="M-Pesa Phone Number"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Password"
                required
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-accent-main text-primary-contrast px-6 py-3 rounded-lg hover:bg-accent-light focus:ring-2 focus:ring-accent-main focus:outline-none shadow-md transition-all duration-200 transform hover:scale-105"
                aria-label="Sign Up"
              >
                Sign Up
              </button>
            </div>
            <p className="mt-6 text-base">
              Already have an account?{' '}
              <Link
                to="/login"
                className="underline hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
                aria-label="Log In"
              >
                Log in
              </Link>
            </p>
            <p className="mt-2 text-base">Free and easy to join</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;