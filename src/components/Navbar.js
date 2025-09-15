import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary-main text-primary-contrast p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Survey Pesa</h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <FaTimes className="w-6 h-6" aria-label="Close menu" />
            ) : (
              <FaBars className="w-6 h-6" aria-label="Open menu" />
            )}
          </button>
        </div>
        <div className="hidden md:flex md:space-x-6">
          <Link to="/" className="hover:text-accent-light transition duration-200" aria-label="Home">
            Home
          </Link>
          <Link to="/#features" className="hover:text-accent-light transition duration-200" aria-label="Features">
            Features
          </Link>
          <Link to="/#how-it-works" className="hover:text-accent-light transition duration-200" aria-label="How It Works">
            How It Works
          </Link>
          <Link to="/#testimonials" className="hover:text-accent-light transition duration-200" aria-label="Testimonials">
            Testimonials
          </Link>
          <Link to="/#faq" className="hover:text-accent-light transition duration-200" aria-label="FAQ">
            FAQ
          </Link>
          <Link to="/#contact" className="hover:text-accent-light transition duration-200" aria-label="Contact">
            Contact
          </Link>
          <Link to="/login" className="hover:text-accent-light transition duration-200" aria-label="Login">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-accent-main text-primary-contrast px-4 py-2 rounded-lg hover:bg-accent-light shadow transition duration-200"
            aria-label="Sign Up"
          >
            Sign Up
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-primary-main text-primary-contrast absolute top-full left-0 w-full shadow-lg animate-slide-in">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              to="/"
              className="hover:text-accent-light transition duration-200 w-full text-center py-2"
              onClick={toggleMenu}
              aria-label="Home"
            >
              Home
            </Link>
            <Link
              to="/#features"
              className="hover:text-accent-light transition duration-200 w-full text-center py-2"
              onClick={toggleMenu}
              aria-label="Features"
            >
              Features
            </Link>
            <Link
              to="/#how-it-works"
              className="hover:text-accent-light transition duration-200 w-full text-center py-2"
              onClick={toggleMenu}
              aria-label="How It Works"
            >
              How It Works
            </Link>
            <Link
              to="/#testimonials"
              className="hover:text-accent-light transition duration-200 w-full text-center py-2"
              onClick={toggleMenu}
              aria-label="Testimonials"
            >
              Testimonials
            </Link>
            <Link
              to="/#faq"
              className="hover:text-accent-light transition duration-200 w-full text-center py-2"
              onClick={toggleMenu}
              aria-label="FAQ"
            >
              FAQ
            </Link>
            <Link
              to="/#contact"
              className="hover:text-accent-light transition duration-200 w-full text-center py-2"
              onClick={toggleMenu}
              aria-label="Contact"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="hover:text-accent-light transition duration-200 w-full text-center py-2"
              onClick={toggleMenu}
              aria-label="Login"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-accent-main text-primary-contrast px-6 py-3 rounded-lg hover:bg-accent-light shadow w-full text-center"
              onClick={toggleMenu}
              aria-label="Sign Up"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;