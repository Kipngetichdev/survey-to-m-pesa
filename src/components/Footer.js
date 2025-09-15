import React from 'react';

const Footer = () => (
  <footer className="bg-primary-main text-primary-contrast py-16 md:py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
      <div>
        <h3 className="text-xl font-bold mb-4 tracking-tight">Survey Pesa</h3>
        <p className="text-base leading-relaxed">
          Earn money by participating in interesting surveys from our partners. Fast payments, user-friendly platform.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 tracking-tight">Quick Links</h3>
        <ul className="space-y-3 text-base">
          <li>
            <a
              href="#home"
              className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
              aria-label="Home"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
              aria-label="About Us"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#surveys"
              className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
              aria-label="Surveys"
            >
              Surveys
            </a>
          </li>
          <li>
            <a
              href="#dashboard"
              className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
              aria-label="Dashboard"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#referrals"
              className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
              aria-label="Referrals"
            >
              Referrals
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
              aria-label="Support"
            >
              Support
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 tracking-tight">Newsletter</h3>
        <p className="mb-4 text-base leading-relaxed">
          Subscribe to get notifications about new surveys and offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-4 bg-primary-contrast border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
            aria-label="Email for newsletter"
          />
          <button
            className="bg-accent-main text-primary-contrast px-6 py-3 rounded-lg hover:bg-accent-light focus:ring-2 focus:ring-accent-main focus:outline-none shadow-md transition-all duration-200 transform hover:scale-105"
            aria-label="Subscribe to newsletter"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-base">© 2025 Survey Pesa. All rights reserved.</p>
      <div className="space-x-6 mt-4">
        <a
          href="#privacy"
          className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
          aria-label="Privacy Policy"
        >
          Privacy Policy
        </a>
        <a
          href="#terms"
          className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
          aria-label="Terms of Service"
        >
          Terms of Service
        </a>
        <a
          href="#contact"
          className="hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
          aria-label="Support"
        >
          Support
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;