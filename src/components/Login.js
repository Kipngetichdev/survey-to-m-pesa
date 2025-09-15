import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../services/firebase';
import appImg from '../assets/appImg.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ loginInput: '', password: '' });
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const toggleLoginMethod = () => {
    setIsPhoneLogin(!isPhoneLogin);
    setFormData({ ...formData, loginInput: '' });
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.loginInput || !formData.password) {
      setError('Please fill in all required fields.');
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      let email = formData.loginInput;
      if (isPhoneLogin) {
        if (!/^0[17]\d{8}$/.test(formData.loginInput)) {
          setError('Please enter a valid phone number (e.g., 0712345678 or 0101234567).');
          toast.error('Please enter a valid phone number (e.g., 0712345678 or 0101234567).');
          return;
        }
        const q = query(collection(db, 'users'), where('phone', '==', formData.loginInput));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError('No account found with this phone number.');
          toast.error('No account found with this phone number.');
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
                type={isPhoneLogin ? 'tel' : 'email'}
                name="loginInput"
                placeholder={isPhoneLogin ? 'Phone Number (e.g., 0712345678)' : 'Email'}
                value={formData.loginInput}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label={isPhoneLogin ? 'Phone Number' : 'Email'}
                required
              />
              <button
                type="button"
                onClick={toggleLoginMethod}
                className="text-base text-accent-main hover:text-accent-light transition-colors duration-200 underline focus:outline-none focus:ring-2 focus:ring-accent-light"
                aria-label={isPhoneLogin ? 'Switch to Email Login' : 'Switch to Phone Login'}
              >
                {isPhoneLogin ? 'Use Email Instead' : 'Use Phone Number Instead'}
              </button>
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
                aria-label="Log In"
              >
                Log In
              </button>
            </div>
            <p className="mt-6 text-base">
              Forgot your password?{' '}
              <Link
                to="/reset-password"
                className="underline hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
                aria-label="Reset Password"
              >
                Reset it
              </Link>
            </p>
            <p className="mt-2 text-base">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="underline hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
                aria-label="Create Account"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;