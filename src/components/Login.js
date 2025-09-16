import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../services/firebase';
import appImg from '../assets/appImg.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ loginInput: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.loginInput || !formData.password) {
      setError('Please fill in all required fields.');
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      let email = formData.loginInput;
      if (/^0[17]\d{8}$/.test(formData.loginInput)) {
        const q = query(collection(db, 'users'), where('phone', '==', formData.loginInput));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError('No account found with this phone number.');
          toast.error('No account found with this phone number.');
          setIsLoading(false);
          return;
        }
        const userData = querySnapshot.docs[0].data();
        email = userData.email;
      }
      await signInWithEmailAndPassword(auth, email, formData.password);
      toast.success('Login successful! Welcome back!');
      navigate('/surveys');
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="login" className="py-16 md:py-24 bg-primary-main text-primary-contrast">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <img
            src={appImg}
            alt="Survey Pesa app interface preview"
            className="w-full max-w-lg mx-auto rounded-lg shadow-md mb-8"
          />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Welcome Back</h2>
          <p className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Log in to access your Survey Pesa account and start earning rewards by participating in exciting surveys.
          </p>
          <div className="max-w-md mx-auto bg-primary-contrast rounded-lg shadow-md p-6 sm:p-8">
            <div className="space-y-4">
              {error && <p className="text-red-500 text-base">{error}</p>}
              <input
                type="text"
                name="loginInput"
                placeholder="Phone number or email"
                value={formData.loginInput}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Phone number or email"
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
                aria-label="Log In"
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
                    Logging In...
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </div>
            
            <p className="mt-2 text-base">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="underline hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
                aria-label="Create Account"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;