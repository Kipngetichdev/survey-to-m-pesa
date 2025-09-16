import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../services/firebase';
import appImg from '../assets/appImg.jpg';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('Please fill in all required fields.');
      toast.error('Please fill in all required fields.');
      return;
    }
    if (!/^0[17]\d{8}$/.test(formData.phone)) {
      setError('Please enter a valid phone number (e.g., 0712345678 or 0101234567).');
      toast.error('Please enter a valid phone number (e.g., 0712345678 or 0101234567).');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date(),
      });
      toast.success('Sign-up successful! Welcome to Survey Pesa!');
      navigate('/surveys');
    } catch (error) {
      const errorMessage = error.message || 'Sign-up failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
              {error && <p className="text-red-500 text-base">{error}</p>}
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
                placeholder="Phone Number (e.g., 0712345678)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Phone Number"
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
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg focus:outline-none shadow-md transition-all duration-200 transform hover:scale-105 ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent-main text-primary-contrast hover:bg-accent-light focus:ring-2 focus:ring-accent-main'
                }`}
                aria-label="Sign Up"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-primary-contrast"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
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